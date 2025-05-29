import { Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'

type Ingredient = {
  name: string
  x: number
  y: number
  src: string
}

export const IngredientImage = ({
  ingredient,
  onClick,
}: {
  ingredient: Ingredient;
  onClick?: () => void;
}) => {
  return (
    <KonvaImage
      image={useImage(ingredient.src)[0]}
      x={ingredient.x}
      y={ingredient.y}
      width={40}
      height={40}
      onClick={onClick}
    />
  );
};

