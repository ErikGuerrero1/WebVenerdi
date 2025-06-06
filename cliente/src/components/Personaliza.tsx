import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Image as KonvaImage } from 'react-konva';
import { useDrop } from 'react-dnd';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  type CartItem,
  type PizzaIngredient,
  type PizzaSize,
  PIZZA_BASE_PRICES,
  INGREDIENT_PRICE,
  CUSTOM_PIZZA_ID
} from '../types';

interface PizzaCustomizerProps {
  onAddToCart: (item: CartItem) => void;
  addingToCart: number | null;
}

const INGREDIENT_IMAGES: PizzaIngredient[] = [
  { id: 'camarones', name: 'Camarones', src: '/ingredientes/camarones.png', type: 'regular' },
  { id: 'cebolla', name: 'Cebolla', src: '/ingredientes/cebolla.png', type: 'regular' },
  { id: 'champinon', name: 'Champiñón', src: '/ingredientes/champinon.png', type: 'regular' },
  { id: 'chile', name: 'Chile Verde', src: '/ingredientes/chile.png', type: 'regular' },
  { id: 'jamon', name: 'Jamón', src: '/ingredientes/jamon.png', type: 'regular' },
  { id: 'oregano', name: 'Orégano', src: '/ingredientes/oregano.png', type: 'herb' },
  { id: 'jitomate', name: 'Jitomate', src: '/ingredientes/jitomate.png', type: 'regular' },
  { id: 'peperoni', name: 'Peperoni', src: '/ingredientes/peperoni.png', type: 'regular' },
  { id: 'pimenton_aceitunas', name: 'Pimentón y Aceitunas', src: '/ingredientes/pimenton_aceitunas.png', type: 'regular' },
  { id: 'pina', name: 'Piña', src: '/ingredientes/pina.png', type: 'regular' },
  { id: 'queso_gouda', name: 'Queso Gouda', src: '/ingredientes/queso_gouda.png', type: 'cheese' },
  { id: 'queso_mozzarella', name: 'Queso Mozzarella', src: '/ingredientes/queso_mozzarella.png', type: 'cheese' },
  { id: 'queso_parmesano', name: 'Queso Parmesano', src: '/ingredientes/queso_parmesano.png', type: 'cheese' },
  { id: 'queso_ricotta', name: 'Queso Ricotta', src: '/ingredientes/queso_ricotta.png', type: 'cheese' },
  { id: 'salsa_tomate', name: 'Salsa de Tomate', src: '/ingredientes/salsa_tomate.png', type: 'regular' },
  { id: 'salsa_bbq', name: 'Salsa BBQ', src: '/ingredientes/salsa_bbq.png', type: 'regular' },
  { id: 'salsa_bufalo', name: 'Salsa Búfalo', src: '/ingredientes/salsa_bufalo.png', type: 'regular' }
];

// Hook para detectar si es móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Componente para renderizar ingredientes en la pizza
const IngredientOnPizza = ({ ingredient, onClick, pizzaRadius }: {
  ingredient: PizzaIngredient;
  onClick: () => void;
  pizzaRadius: number;
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImage(img);
    img.src = ingredient.src;
  }, [ingredient.src]);

  if (!image || !ingredient.x || !ingredient.y) return null;

  if (ingredient.type === 'cheese' || ingredient.type === 'herb') return null;

  // Determinar el tamaño según el tipo de ingrediente y el tamaño de la pizza
  const getSize = () => {
    const scaleFactor = pizzaRadius / 120;

    if (ingredient.type === 'cheese') {
      return { width: 0, height: 0 };
    } else {
      const baseSize = 260;
      return {
        width: baseSize * scaleFactor,
        height: baseSize * scaleFactor
      };
    }
  };

  const size = getSize();

  return (
    <KonvaImage
      image={image}
      x={ingredient.x - size.width / 2}
      y={ingredient.y - size.height / 2}
      width={size.width}
      height={size.height}
      onClick={onClick}
      onTap={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
};

// Componente para el canvas de la pizza
const PizzaCanvas = ({
  ingredients,
  onDrop,
  onRemove,
  size,
  isMobile,
}: {
  ingredients: PizzaIngredient[];
  onDrop: (item: PizzaIngredient) => void;
  onRemove: (id: string) => void;
  size: PizzaSize;
  isMobile: boolean;
}) => {
  const sizeRadius = {
    mediana: isMobile ? 80 : 120,
    grande: isMobile ? 100 : 160,
    familiar: isMobile ? 120 : 200,
  }[size];

  const canvasSize = isMobile ? 280 : 460;
  const centerPos = canvasSize / 2;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: PizzaIngredient) => {
      const randomOffset = isMobile ? 15 : 20;
      const x = centerPos + (Math.random() - 0.5) * randomOffset;
      const y = centerPos + (Math.random() - 0.5) * randomOffset;

      onDrop({
        ...item,
        x: x,
        y: y,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`relative mx-auto border-4 border-orange-300 rounded-lg overflow-hidden bg-white shadow-lg ${isMobile ? 'w-[280px] h-[280px]' : 'w-[460px] h-[460px]'
        }`}
    >
      <Stage width={canvasSize} height={canvasSize} id="konva-stage">
        <Layer>
          <Circle
            x={centerPos}
            y={centerPos}
            radius={sizeRadius}
            fill="#fcd34d"
            stroke="orange"
            strokeWidth={isMobile ? 6 : 10}
          />
          {ingredients.map((ingredient, index) => (
            <IngredientOnPizza
              key={`${ingredient.id}-${index}`}
              ingredient={ingredient}
              onClick={() => onRemove(ingredient.id)}
              pizzaRadius={sizeRadius}
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
const DraggableIngredient: React.FC<{
  ingredient: PizzaIngredient;
  disabled?: boolean;
  isMobile?: boolean;
}> = ({
  ingredient,
  disabled = false,
  isMobile = false
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'ingredient',
      item: ingredient,
      canDrag: !disabled,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const imageSize = isMobile ? 'w-10 h-10' : 'w-12 h-12';
    const textSize = isMobile ? 'text-xs' : 'text-xs';
    const maxWidth = isMobile ? 'max-w-[70px]' : 'max-w-[80px]';

    return (
      <div className={`flex flex-col items-center space-y-1 ${isMobile ? 'p-1' : 'p-2'}`}>
        <div className="relative">
          <img
            ref={drag as any}
            src={ingredient.src}
            alt={ingredient.name}
            title={ingredient.name}
            className={`${imageSize} object-contain transition-all ${disabled
              ? 'opacity-30 cursor-not-allowed'
              : isDragging
                ? 'opacity-30 cursor-grabbing'
                : 'cursor-grab hover:scale-110'
              }`}
          />
          {disabled && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded flex items-center justify-center">
              <div className="text-white text-xs font-bold">✕</div>
            </div>
          )}
        </div>
        <span className={`${textSize} text-center leading-tight ${maxWidth} ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {ingredient.name}
        </span>
      </div>
    );
  };

const IngredientsCarousel = ({
  ingredients,
  isAtLimit,
  ingredientsOnPizza,
  isMobile
}: {
  ingredients: PizzaIngredient[];
  isAtLimit: boolean;
  ingredientsOnPizza: PizzaIngredient[];
  isMobile: boolean;
}) => {
  return (
    <div className="w-full bg-white border-2 border-orange-200 rounded-xl shadow-lg p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-orange-600">Ingredientes disponibles</h3>
        {isAtLimit && (
          <div className="text-xs text-red-600 font-medium">
            ¡Límite alcanzado!
          </div>
        )}
      </div>

      <div className="relative">
        {/* Gradientes de fade en los bordes */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Contenedor deslizante */}
        <div className="overflow-x-auto scrollbar-hide">
          <div
            className={`flex ${isMobile ? 'gap-3' : 'gap-4'} pb-2 px-4`}
            style={{ width: 'max-content' }}
          >
            {ingredients.map((ingredient) => {
              const isDisabled = isAtLimit ||
                (ingredient.type !== 'cheese' && ingredientsOnPizza.some((i) => i.id === ingredient.id));

              return (
                <div key={ingredient.id} className="flex-shrink-0">
                  <DraggableIngredient
                    ingredient={ingredient}
                    disabled={isDisabled}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 text-center mt-3`}>
        {isMobile ? 'Desliza horizontalmente' : 'Desliza horizontalmente para ver más ingredientes'}
      </div>
    </div>
  );
};

// Componente principal de personalización de pizza
const PizzaCustomizer = ({
  onAddToCart,
  addingToCart
}: PizzaCustomizerProps) => {
  const [size, setSize] = useState<PizzaSize>('mediana');
  const [ingredientsOnPizza, setIngredientsOnPizza] = useState<PizzaIngredient[]>([]);
  const [pizzaPrice, setPizzaPrice] = useState(PIZZA_BASE_PRICES.mediana);
  const isMobile = useIsMobile();

  const maxIngredients = {
    mediana: 4,
    grande: 5,
    familiar: 6,
  }[size];

  // Función para calcular el precio
  const calculatePrice = (currentSize: PizzaSize, ingredientsCount: number) => {
    const basePrice = PIZZA_BASE_PRICES[currentSize];
    const ingredientCost = ingredientsCount * INGREDIENT_PRICE;
    return basePrice + ingredientCost;
  };

  // Actualizar precio cuando cambie el tamaño o ingredientes
  useEffect(() => {
    const newPrice = calculatePrice(size, ingredientsOnPizza.length);
    setPizzaPrice(newPrice);
  }, [size, ingredientsOnPizza]);

  // Función para agregar al carrito
  // Función corregida para agregar pizza personalizada al carrito
const handleAddToCart = () => {
  try {
    // Crear descripción detallada de la pizza
    const ingredientsList = ingredientsOnPizza.map(ing => ing.name);
    const customPizzaName = `Pizza Personalizada (${size.charAt(0).toUpperCase() + size.slice(1)})`;

    const cartItem: CartItem = {
      productId: CUSTOM_PIZZA_ID,
      name: customPizzaName,
      price: pizzaPrice,
      size: size,
      sizeId: size === 'mediana' ? 1 : size === 'grande' ? 2 : 3,
      imageUrl: "http://localhost:3000/images/products/pizza_esp.png",
      quantity: 1,
      id: `${CUSTOM_PIZZA_ID}-${size}-${Date.now()}`,
      customIngredients: ingredientsList,
      isCustomPizza: true
    };

    console.log('Agregando pizza personalizada al carrito:', cartItem);
    
    // Llamar directamente a onAddToCart sin usar generateCustomPizzaFromCartItem
    // ya que el CartItem ya está completo
    onAddToCart(cartItem);
    
    // Opcional: Mostrar mensaje de éxito o limpiar la pizza
    // alert('¡Pizza agregada al carrito exitosamente!');
    
  } catch (error) {
    console.error('Error al agregar pizza al carrito:', error);
    // Opcional: Mostrar mensaje de error al usuario
  }
};

  const handleDrop = (ingredient: PizzaIngredient) => {
    if (ingredientsOnPizza.length >= maxIngredients) {
      return;
    }

    if (ingredient.type !== 'cheese' && ingredientsOnPizza.some((i) => i.id === ingredient.id)) {
      return;
    }

    setIngredientsOnPizza((prev) => [...prev, ingredient]);
  };

  const handleRemove = (id: string) => {
    const index = ingredientsOnPizza.findIndex((i) => i.id === id);
    if (index !== -1) {
      setIngredientsOnPizza((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSizeChange = (newSize: PizzaSize) => {
    const newMaxIngredients = {
      mediana: 4,
      grande: 5,
      familiar: 6,
    }[newSize];

    if (ingredientsOnPizza.length > newMaxIngredients) {
      setIngredientsOnPizza((prev) => prev.slice(0, newMaxIngredients));
    }

    setSize(newSize);
  };

  const isAtLimit = ingredientsOnPizza.length >= maxIngredients;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 md:pt-24">
        <div className="p-4 md:p-12 max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center text-orange-600">
            Personaliza tu Pizza
          </h1>

          <div className="flex justify-center gap-4">
            {(['mediana', 'grande', 'familiar'] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleSizeChange(t)}
                className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                  } rounded-full font-semibold transition-colors ${size === t
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Carrusel de ingredientes unificado */}
          <IngredientsCarousel
            ingredients={INGREDIENT_IMAGES}
            isAtLimit={isAtLimit}
            ingredientsOnPizza={ingredientsOnPizza}
            isMobile={isMobile}
          />

          {isMobile ? (
            // Layout móvil
            <div className="flex flex-col items-center space-y-4">
              {/* Canvas de la pizza */}
              <div className="flex justify-center">
                <PizzaCanvas
                  ingredients={ingredientsOnPizza}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  size={size}
                  isMobile={isMobile}
                />
              </div>

              {/* Panel de información para móvil */}
              <div className="w-full bg-white border border-orange-200 rounded-xl shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-orange-600">
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </h3>
                  <div className="text-sm text-orange-700">
                    {ingredientsOnPizza.length} / {maxIngredients}
                  </div>
                </div>

                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(ingredientsOnPizza.length / maxIngredients) * 100}%` }}
                  ></div>
                </div>

                {isAtLimit && (
                  <div className="text-xs text-red-600 font-medium text-center">
                    ¡Has alcanzado el límite!
                  </div>
                )}

                {ingredientsOnPizza.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-orange-600">Ingredientes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredientsOnPizza.map((ingredient, index) => (
                        <button
                          key={`${ingredient.id}-${index}`}
                          onClick={() => handleRemove(ingredient.id)}
                          className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {ingredient.name} ✕
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mostrar precio */}
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-orange-600 text-center">
                    Total: ${pizzaPrice}
                  </div>
                </div>

                {/* Botón para agregar al carrito */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart === CUSTOM_PIZZA_ID}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart === CUSTOM_PIZZA_ID ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Añadiendo...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Añadir al carrito - ${pizzaPrice}</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : (
            // Layout desktop
            <div className="flex gap-6 justify-center flex-wrap lg:flex-nowrap">
              <PizzaCanvas
                ingredients={ingredientsOnPizza}
                onDrop={handleDrop}
                onRemove={handleRemove}
                size={size}
                isMobile={isMobile}
              />

              {/* Panel lateral con información */}
              <div className="w-full max-w-sm bg-white border border-orange-200 rounded-xl shadow-md p-4 space-y-4">
                <h3 className="text-lg font-semibold text-orange-600">Tamaño seleccionado</h3>
                <div className="text-gray-800 capitalize font-medium">{size}</div>

                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-sm text-orange-700">
                    Ingredientes: {ingredientsOnPizza.length} / {maxIngredients}
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(ingredientsOnPizza.length / maxIngredients) * 100}%` }}
                    ></div>
                  </div>
                  {isAtLimit && (
                    <div className="text-xs text-red-600 mt-1 font-medium">
                      ¡Has alcanzado el límite!
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-orange-600">Ingredientes añadidos</h3>
                {ingredientsOnPizza.length === 0 ? (
                  <p className="text-sm text-gray-500">Aún no has agregado ingredientes.</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {ingredientsOnPizza.map((ingredient, index) => (
                      <li
                        key={`${ingredient.id}-${index}`}
                        className="flex items-center justify-between bg-orange-50 rounded-md px-3 py-2"
                      >
                        <span className="text-sm text-gray-800">{ingredient.name}</span>
                        <button
                          onClick={() => handleRemove(ingredient.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                          Quitar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Mostrar precio */}
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-xl font-bold text-orange-600 text-center">
                    Total: ${pizzaPrice}
                  </div>
                </div>

                <div className="text-center pt-6">
                  {/* Botón para agregar al carrito */}
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart === CUSTOM_PIZZA_ID}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart === CUSTOM_PIZZA_ID ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Añadiendo...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Añadir al carrito - ${pizzaPrice}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default PizzaCustomizer;