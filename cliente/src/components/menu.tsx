import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Plus, Star, Clock } from 'lucide-react'

interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    categoryId: number
    categoryName: string
}

interface MenuPageProps {
    onAddToCart: (product: Product) => void;
    addingToCart: number | null;
}

const MenuPage = ({ onAddToCart, addingToCart }: MenuPageProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch('http://localhost:3000/api/menu')
                const json = await res.json()

                if (json.success) {
                    // Mapeamos los productos de la API al formato que usamos
                    const fetchedProducts: Product[] = json.data.map((p: any) => ({
                        id: p.ProductID,
                        name: p.Name,
                        description: p.Description,
                        price: parseFloat(p.BasePrice),
                        imageUrl: p.ImageURL,
                        categoryId: p.CategoryID,
                        categoryName: p.Category,
                    }))

                    // Extraemos categorías únicas de los productos
                    const uniqueCategoriesMap = new Map<number, Category>()
                    fetchedProducts.forEach((product) => {
                        if (!uniqueCategoriesMap.has(product.categoryId)) {
                            uniqueCategoriesMap.set(product.categoryId, {
                                id: product.categoryId,
                                name: product.categoryName,
                            })
                        }
                    })

                    setCategories(Array.from(uniqueCategoriesMap.values()))
                    setProducts(fetchedProducts)
                } else {
                    console.error('Error en la respuesta de la API')
                }
            } catch (error) {
                console.error('Error fetching menu:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-lg text-gray-600">Cargando nuestro delicioso menú...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 md:pt-24">
            {/* Page Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Nuestro Menú</h1>
                        <p className="text-gray-600 mt-1">Descubre nuestros platos más deliciosos</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => setSelectedCategory(null)}
                            className={`rounded-full border transition-colors ${selectedCategory === null
                                    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                                    : "bg-white hover:bg-orange-50 border-orange-200 text-gray-700"
                                }`}
                        >
                            Todos
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-full border transition-colors ${selectedCategory === category.id
                                        ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                                        : "bg-white hover:bg-orange-50 border-orange-200 text-gray-700"
                                    }`}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="space-y-12">
                    {categories.map((category) => {
                        const categoryProducts = products.filter(p => p.categoryId === category.id)
                        if (selectedCategory && selectedCategory !== category.id) return null

                        return (
                            <div key={category.id}>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                                    <div className="flex-1 bg-gradient-to-r from-orange-200 to-transparent h-0.5"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {categoryProducts.map((product) => (
                                        <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-3 left-3">
                                                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        ${product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>

                                            <CardContent className="p-6">
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                                                        {product.name}
                                                    </h3>

                                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                        {product.description}
                                                    </p>

                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Clock className="h-3 w-3" />
                                                        <span>15-20 min</span>
                                                    </div>

                                                    <Button
                                                        onClick={() => onAddToCart(product)}
                                                        disabled={addingToCart === product.id}
                                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95"
                                                    >
                                                        {addingToCart === product.id ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                                Añadiendo...
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <Plus className="h-4 w-4" />
                                                                Añadir al carrito
                                                            </div>
                                                        )}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MenuPage