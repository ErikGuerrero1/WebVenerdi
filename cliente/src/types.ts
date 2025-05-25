export interface Category {
    id: number
    name: string
}

export interface Product {
    imageUrl: string | undefined
    id: number
    name: string
    description: string
    price: number
    categoryId: number
}
