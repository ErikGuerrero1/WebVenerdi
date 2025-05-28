import React, { useState } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import { useDrop } from 'react-dnd';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IngredientImage } from './IngredientImage';

interface Ingredient {
  id: string;
  name: string;
  src: string;
  x?: number;
  y?: number;
}

const INGREDIENT_IMAGES: Ingredient[] = [
  { id: 'aceitunas', name: 'Aceitunas Negras', src: '/ingredientes/aceitunas.png' },
  { id: 'albahaca', name: 'Albahaca', src: '/ingredientes/albahaca.png' },
  { id: 'alcachofa', name: 'Alcachofas', src: '/ingredientes/alcachofa.png' },
  { id: 'durazno', name: 'Durazno', src: '/ingredientes/durazno.png' },
  { id: 'jamon_serrano', name: 'Jamón Serrano', src: '/ingredientes/jamon_serrano.png' },
  { id: 'jamon', name: 'Jamón', src: '/ingredientes/jamon.png' },
  { id: 'oregano', name: 'Orégano', src: '/ingredientes/oregano.png' },
  { id: 'portobello', name: 'Portobello', src: '/ingredientes/portobello.png' },
  { id: 'queso_gouda', name: 'Queso Gouda', src: '/ingredientes/queso_gouda.png' },
  { id: 'queso_mozzarella', name: 'Queso Mozzarella', src: '/ingredientes/queso_mozzarella.png' },
  { id: 'queso_parmesano', name: 'Queso Parmesano', src: '/ingredientes/queso_parmesano.png' },
  { id: 'queso_ricotta', name: 'Queso Ricotta', src: '/ingredientes/queso_ricotta.png' },
  { id: 'salsa_tomate', name: 'Salsa de tomate', src: '/ingredientes/salsa_tomate.png' },
];

const PizzaCanvas = ({
  ingredients,
  onDrop,
  size,
}: {
  ingredients: Ingredient[];
  onDrop: (item: Ingredient) => void;
  size: 'mediana' | 'grande' | 'familiar';
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: Ingredient, monitor) => {
      const offset = monitor.getClientOffset();
      const stage = document.getElementById('konva-stage')!.getBoundingClientRect();
      if (offset && stage) {
        onDrop({
          ...item,
          x: offset.x - stage.left,
          y: offset.y - stage.top,
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const sizeRadius = {
    mediana: 120,
    grande: 160,
    familiar: 200,
  }[size];

  return (
    <div
      ref={drop}
      className="relative w-full h-[500px] border-4 border-orange-300 rounded-lg overflow-hidden"
    >
      <Stage width={500} height={500} id="konva-stage">
        <Layer>
          <Circle
            x={250}
            y={250}
            radius={sizeRadius}
            fill="#fcd34d"
            stroke="orange"
            strokeWidth={10}
          />
          {ingredients.map((ingredient, index) => (
            <IngredientImage key={index} ingredient={ingredient} />
          ))}
        </Layer>
      </Stage>
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-orange-500 pointer-events-none" />
      )}
    </div>
  );
};

const DraggableIngredient: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={ingredient.src}
      alt={ingredient.name}
      title={ingredient.name}
      className={`w-12 h-12 object-contain cursor-grab ${
        isDragging ? 'opacity-30' : ''
      }`}
    />
  );
};

const PizzaCustomizer = () => {
  const [size, setSize] = useState<'mediana' | 'grande' | 'familiar'>('mediana');
  const [ingredientsOnPizza, setIngredientsOnPizza] = useState<Ingredient[]>([]);

  const handleDrop = (ingredient: Ingredient) => {
    setIngredientsOnPizza((prev) => [...prev, ingredient]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-orange-600">Personaliza tu Pizza</h1>

        {/* Botones de tamaño */}
        <div className="flex justify-center gap-4">
          {(['mediana', 'grande', 'familiar'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSize(t)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                size === t
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-orange-300 text-orange-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Canvas con pizza */}
        <PizzaCanvas ingredients={ingredientsOnPizza} onDrop={handleDrop} size={size} />

        {/* Lista de ingredientes */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8">Ingredientes</h2>
        <div className="flex gap-3 flex-wrap">
          {INGREDIENT_IMAGES.map((ingredient) => (
            <DraggableIngredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>

        {/* Botón para carrito */}
        <div className="text-center pt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg">
            Añadir al carrito
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default PizzaCustomizer;
