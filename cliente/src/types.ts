export interface Category {
    CategoryID: number;
    Name: string;
    Description: string;
    products: Product[];
}

export interface ProductSize {
    ProductSizeID: number;
    Size: string;
    Price: string;
}

export interface Product {
    ProductID: number;
    Name: string;
    Description: string;
    BasePrice: string;
    ImageURL: string;
    CategoryID: number;
    sizes?: ProductSize[];
}

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    size?: string;
    sizeId?: number;
    imageUrl: string;
    quantity: number;
    id: string;
    // Campos adicionales para pizza personalizada
    customIngredients?: string[];
    isCustomPizza?: boolean;
}

// Tipo específico para ingredientes de pizza personalizada
export interface PizzaIngredient {
    id: string;
    name: string;
    src: string;
    x?: number;
    y?: number;
    type?: 'cheese' | 'herb' | 'regular';
}

// Tipo para el tamaño de pizza personalizada
export type PizzaSize = 'mediana' | 'grande' | 'familiar';

// Precios base para pizzas personalizadas
export const PIZZA_BASE_PRICES: Record<PizzaSize, number> = {
    mediana: 100,
    grande: 140,
    familiar: 160
};

// Precio por ingrediente adicional
export const INGREDIENT_PRICE = 20;

// ID especial para pizzas personalizadas
export const CUSTOM_PIZZA_ID = 9999;