# Servidor Back para la Pizzeria Venerdi

## Instalación y ejecución

Para poner a chambear el proyecto, sigue estos pasos:

1. Instala las dependencias:

```bash
npm install
```

2. Configura tu archivo .env, si no lo tienes crealo o utiliza el template del .env incluido en este repositorio

3. Ejecuta el proyecto

```bash
npm run dev
```

## Pruebas de imágenes

Puedes probar la funcionalidad de subida de imágenes utilizando el formulario HTML que se incluye junto con este proyecto.

## Subir un producto

1. Subir imagen

```bash
    post /api/images
```

2. Crear la pizza

```bash
   POST /api/products
   {
   "Name": "Pizza Suprema",
   "Description": "Pizza con todos los ingredientes",
   "BasePrice": 250.00,
   "ImageUrl": "products/pizza_default.jpg"
   "Available": 10,
   "CategoryID": 1
   }
```

3. Asignar ingredientes todos juntos

```bash
   POST /api/product-ingredients/product/2/assign
   {
   "ingredientIds": [1, 2, 3, 4]
   }
```

4. Agregar tamaños

```bash
   POST /api/productsizes
   {
   "ProductID": 2,
   "Size": "Chica",
   "Price": 200.00
   }
```
