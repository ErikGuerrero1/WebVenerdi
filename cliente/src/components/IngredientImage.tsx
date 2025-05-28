import { Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'

type Ingredient = {
  name: string
  x: number
  y: number
  src: string
}

export const IngredientImage = ({ ingredient }: { ingredient: Ingredient }) => {
  const [image] = useImage(ingredient.src) // ✅ Uso correcto aquí, no dentro de un map
  if (!image) return null

  return (
    <KonvaImage
      image={image}
      x={ingredient.x}
      y={ingredient.y}
      width={40}
      height={40}
    />
  )
}
