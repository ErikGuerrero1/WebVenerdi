import type { CartItem, Product, ProductSize } from "../types";

// Función para generar un CartItem desde un Product
export const generateCartItem = (
    product: Product,
    size?: ProductSize
): CartItem => {
    return {
        productId: product.ProductID,
        name: product.Name,
        price: size ? parseFloat(size.Price) : parseFloat(product.BasePrice),
        size: size?.Size,
        sizeId: size?.ProductSizeID,
        imageUrl: product.ImageURL,
        quantity: 1,
        id: `${product.ProductID}-${size?.ProductSizeID || "default"}-${Date.now()}`
    }
}

// Hook para manejar la adición al carrito
export const useCartAdder = (onAddToCart: (item: CartItem) => void) => {
    return (product: Product, size?: ProductSize) => {
        const item = generateCartItem(product, size)
        onAddToCart(item)
    }
}

// Función auxiliar para crear CartItem de pizza personalizada
export const generateCustomPizzaCartItem = (
    size: 'mediana' | 'grande' | 'familiar',
    ingredients: string[],
    totalPrice: number
): CartItem => {
    const CUSTOM_PIZZA_ID = 9999;
    const sizeName = size.charAt(0).toUpperCase() + size.slice(1);

    return {
        productId: CUSTOM_PIZZA_ID,
        name: `Pizza Personalizada (${sizeName})`,
        price: totalPrice,
        size: size,
        sizeId: size === 'mediana' ? 1 : size === 'grande' ? 2 : 3,
        imageUrl: '/images/custom-pizza.jpg', // Imagen por defecto para pizzas personalizadas
        quantity: 1,
        id: `custom-pizza-${size}-${Date.now()}`,
        customIngredients: ingredients // Campo adicional para ingredientes personalizados
    }
}

// Nueva función para procesar CartItem de pizza personalizada (la que necesitas)
export const generateCustomPizzaFromCartItem = (cartItem: CartItem): CartItem => {
    // Si ya es un CartItem válido, simplemente lo retornamos
    // Esta función puede ser útil para validar o procesar el CartItem antes de enviarlo
    return {
        ...cartItem,
        // Asegurar que tenga todos los campos necesarios
        quantity: cartItem.quantity || 1,
        customIngredients: cartItem.customIngredients || [],
        isCustomPizza: true
    };
}

// Función para calcular el total del carrito
export const calculateCartTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Función para actualizar la cantidad de un item en el carrito
export const updateCartItemQuantity = (
    items: CartItem[],
    itemId: string,
    newQuantity: number
): CartItem[] => {
    if (newQuantity <= 0) {
        return items.filter(item => item.id !== itemId);
    }

    return items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
}

// Función para remover un item del carrito
export const removeCartItem = (items: CartItem[], itemId: string): CartItem[] => {
    return items.filter(item => item.id !== itemId);
}

// Función para limpiar el carrito
export const clearCart = (): CartItem[] => {
    return [];
}

// Función para obtener el número total de items en el carrito
export const getCartItemsCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
}

// Función para verificar si un producto ya está en el carrito
export const isProductInCart = (items: CartItem[], productId: number, sizeId?: number): boolean => {
    return items.some(item =>
        item.productId === productId &&
        (sizeId ? item.sizeId === sizeId : !item.sizeId)
    );
}

// Función para formatear precio como moneda
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
}