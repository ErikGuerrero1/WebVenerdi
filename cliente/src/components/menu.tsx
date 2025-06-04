import { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Plus, Star, Clock, X } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProductSize {
    ProductSizeID: number
    Size: string
    Price: string
}

interface Product {
    ProductID: number
    Name: string
    Description: string
    BasePrice: string
    Available: number
    ImageURL: string
    sizes: ProductSize[]
}

interface Category {
    CategoryID: number
    Name: string
    Description: string
    products: Product[]
}

interface CartItem {
    productId: number
    name: string
    price: number
    size?: string
    sizeId?: number
    imageUrl: string
    quantity: number
    id: string
}

interface MenuPageProps {
    onAddToCart: (item: CartItem) => void
    addingToCart: number | null
}

const MenuPage = ({ onAddToCart, addingToCart }: MenuPageProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch('http://localhost:3000/api/menu')
                const json = await res.json()

                if (json.success) {
                    const categoriesWithProducts = json.data.filter((category: Category) =>
                        category.products && category.products.length > 0
                    )
                    setCategories(categoriesWithProducts)
                    console.log('Categorías cargadas:', categoriesWithProducts)
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

    const handleAddToCart = (product: Product) => {
        if (product.sizes && product.sizes.length > 0) {
            setSelectedProduct(product)
            setShowModal(true)
        } else {
            const cartItem: CartItem = {
                productId: product.ProductID,
                name: product.Name,
                price: parseFloat(product.BasePrice),
                imageUrl: product.ImageURL,
                quantity: 1,
                id: `${product.ProductID}-default-${Date.now()}`
            }
            onAddToCart(cartItem)
        }
    }

    const handleSizeSelection = (product: Product, size: ProductSize) => {
        const cartItem: CartItem = {
            productId: product.ProductID,
            name: product.Name,
            price: parseFloat(size.Price),
            size: size.Size,
            sizeId: size.ProductSizeID,
            imageUrl: product.ImageURL,
            quantity: 1,
            id: `${product.ProductID}-${size.ProductSizeID}-${Date.now()}`
        }
        onAddToCart(cartItem)
        setShowModal(false)
        setSelectedProduct(null)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedProduct(null)
    }

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

    const filteredCategories = selectedCategory === null
        ? categories
        : categories.filter((c) => c.CategoryID === selectedCategory)

    console.log(filteredCategories)

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 md:pt-24">
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Nuestro Menú</h1>
                        <p className="text-gray-600 mt-1">Descubre nuestros platos más deliciosos</p>
                    </div>
                    <Link
                        to="/personaliza"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded inline-block"
                    >
                        ¡Crea tu propia pizza!
                    </Link>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => setSelectedCategory(null)}
                            className={`rounded-full border transition-colors ${selectedCategory === null
                                ? 'bg-slate-950 hover:bg-slate-950 text-white border-orange-500'
                                : 'bg-white text-slate-950 hover:bg-neutral-700 hover:text-white '
                                }`}
                        >
                            Todos
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.CategoryID}
                                onClick={() => setSelectedCategory(category.CategoryID)}
                                className={`rounded-full border transition-colors ${selectedCategory === category.CategoryID
                                    ? 'bg-slate-950 hover:bg-slate-950 text-white border-orange-500'
                                    : 'bg-white text-slate-950 hover:bg-neutral-700 hover:text-white '
                                    }`}
                            >
                                {category.Name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="space-y-12">
                    {filteredCategories.map((category) => (
                        <div key={category.CategoryID}>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">{category.Name}</h2>
                                <div className="flex-1 bg-gradient-to-r from-orange-200 to-transparent h-0.5"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {category.products.map((product) => (
                                    <Card
                                        key={product.ProductID}
                                        className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={product.ImageURL}
                                                alt={product.Name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-3 left-3">
                                                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {product.sizes && product.sizes.length > 0
                                                        ? `Desde $${Math.min(...product.sizes.map(s => parseFloat(s.Price))).toFixed(2)}`
                                                        : `$${parseFloat(product.BasePrice).toFixed(2)}`
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                                                    {product.Name}
                                                </h3>

                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                    {product.Description}
                                                </p>

                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Clock className="h-3 w-3" />
                                                    <span>15-20 min</span>
                                                </div>

                                                {product.sizes && product.sizes.length > 0 && (
                                                    <div className="text-xs text-gray-500">
                                                        Disponible en {product.sizes.length} tamaño{product.sizes.length > 1 ? 's' : ''}
                                                    </div>
                                                )}

                                                <Button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={addingToCart === product.ProductID}
                                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95"
                                                >
                                                    {addingToCart === product.ProductID ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                            Añadiendo...
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <Plus className="h-4 w-4" />
                                                            {product.sizes && product.sizes.length > 0
                                                                ? 'Seleccionar tamaño'
                                                                : 'Añadir al carrito'
                                                            }
                                                        </div>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para selección de tamaño */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h3 className="text-xl font-bold text-gray-800">Selecciona el tamaño</h3>
                            <Button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"

                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={selectedProduct.ImageURL}
                                    alt={selectedProduct.Name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800">{selectedProduct.Name}</h4>
                                    <p className="text-sm text-gray-600">{selectedProduct.Description}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {selectedProduct.sizes.map((size) => (
                                    <Button
                                        key={size.ProductSizeID}
                                        onClick={() => handleSizeSelection(selectedProduct, size)}
                                        className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-left transition-colors rounded-xl"

                                    >
                                        <div>
                                            <div className="font-semibold text-gray-800">{size.Size}</div>
                                        </div>
                                        <div className="text-orange-600 font-bold">
                                            ${parseFloat(size.Price).toFixed(2)}
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuPage