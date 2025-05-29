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

// Componente para el canvas de la pizza
const PizzaCanvas = ({
  ingredients,
  onDrop,
  onRemove,
  size,
}: {
  ingredients: Ingredient[];
  onDrop: (item: Ingredient) => void;
  onRemove: (id: string) => void;
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
      className="relative w-[460px] h-[460px] mx-auto border-4 border-orange-300 rounded-lg overflow-hidden bg-white shadow-lg"
    >
      <Stage width={460} height={460} id="konva-stage">
        <Layer>
          <Circle
            x={230}
            y={230}
            radius={sizeRadius}
            fill="#fcd34d"
            stroke="orange"
            strokeWidth={10}
          />
          {ingredients.map((ingredient) => (
            <IngredientImage
              key={ingredient.id}
              ingredient={ingredient}
              onClick={() => onRemove(ingredient.id)}
            />
          ))}
        </Layer>
      </Stage>
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-orange-500 pointer-events-none rounded-lg" />
      )}
    </div>
  );
};



// Componente para ingredientes arrastrables
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

// Componente principal de personalización de pizza
const PizzaCustomizer = () => {
  const [size, setSize] = useState<'mediana' | 'grande' | 'familiar'>('mediana');
  const [ingredientsOnPizza, setIngredientsOnPizza] = useState<Ingredient[]>([]);

  const handleDrop = (ingredient: Ingredient) => {
    // No repetir ingredientes
    if (ingredientsOnPizza.some((i) => i.id === ingredient.id)) return;

    setIngredientsOnPizza((prev) => [...prev, ingredient]);
  };

  const handleRemove = (id: string) => {
    setIngredientsOnPizza((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-12 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mt-16">
  Personaliza tu Pizza
</h1>



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

        <div className="flex gap-6 justify-center flex-wrap lg:flex-nowrap">
        <PizzaCanvas
          ingredients={ingredientsOnPizza}
          onDrop={handleDrop}
          onRemove={handleRemove}
          size={size}
        />

        {/* Panel lateral con tamaño e ingredientes */}
          <div className="w-full max-w-sm bg-white border border-orange-200 rounded-xl shadow-md p-4 space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">Tamaño seleccionado</h3>
            <div className="text-gray-800 capitalize">{size}</div>

            <h3 className="text-lg font-semibold text-orange-600 mt-4">Ingredientes añadidos</h3>
            {ingredientsOnPizza.length === 0 ? (
              <p className="text-sm text-gray-500">Aún no has agregado ingredientes.</p>
            ) : (
              <ul className="space-y-2">
                {ingredientsOnPizza.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center justify-between bg-orange-50 rounded-md px-3 py-2"
                  >
                    <span className="text-sm text-gray-800">{ingredient.name}</span>
                    <button
                      onClick={() => handleRemove(ingredient.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          <div className="text-center pt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg">
              Añadir al carrito
            </button>
          </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-8">Ingredientes</h2>
        <div className="flex gap-3 flex-wrap">
          {INGREDIENT_IMAGES.filter(
            (ingredient) => !ingredientsOnPizza.some((i) => i.id === ingredient.id)
          ).map((ingredient) => (
            <DraggableIngredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};


export default PizzaCustomizer;
