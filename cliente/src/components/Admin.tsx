import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Pencil, Trash2, Plus } from 'lucide-react'

interface Product {
    ProductID: number
    Name: string
    Description: string
    BasePrice: number
    Available: number
    CategoryName: string
    ImageURL: string
}

interface Category {
    CategoryID: number
    Name: string
}

const Admin = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:3000/api/products')
                const json = await res.json()
                if (json.success) setProducts(json.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        async function fetchCategories() {
            try {
                const res = await fetch('http://localhost:3000/api/categories')
                const json = await res.json()
                if (json.success) setCategories(json.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchProducts()
        fetchCategories()
    }, [])

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setShowModal(true)
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const updatedProduct = {
            Name: formData.get('Name'),
            Description: formData.get('Description'),
            BasePrice: Number(formData.get('BasePrice')),
            Available: Number(formData.get('Available')),
            CategoryID: categories.find(c => c.Name === formData.get('CategoryName'))?.CategoryID,
            ImageURL: formData.get('ImageURL'),
        }

        const method = editingProduct ? 'PUT' : 'POST'
        const endpoint = editingProduct
            ? `http://localhost:3000/api/products/${editingProduct.ProductID}`
            : `http://localhost:3000/api/products`

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            })
            const data = await res.json()

            if (data.success) {
                if (editingProduct) {
                    setProducts((prev) =>
                        prev.map(p => p.ProductID === editingProduct.ProductID ? data.data : p)
                    )
                } else {
                    setProducts((prev) => [...prev, data.data])
                }
                setShowModal(false)
                setEditingProduct(null)
            } else {
                console.error('Error al guardar producto:', data.message)
            }
        } catch (err) {
            console.error('Error al enviar:', err)
        }
    }

    const handleDelete = async (productId: number) => {
        const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este producto?')
        if (!confirmed) return

        try {
            const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'DELETE',
            })
            const data = await res.json()

            if (data.success) {
                setProducts(prev => prev.filter(p => p.ProductID !== productId))
            } else {
                console.error('Error al eliminar producto:', data.message)
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error)
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-lg text-gray-600">Cargando</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto pt-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Administrar Productos</h2>
                <Button
                    onClick={() => {
                        setEditingProduct(null)
                        setShowModal(true)
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Agregar producto
                </Button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                        <button onClick={() => { setShowModal(false); setEditingProduct(null) }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
                        <h3 className="text-xl font-semibold mb-4">
                            {editingProduct ? 'Editar producto' : 'Agregar nuevo producto'}
                        </h3>

                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <input name="Name" defaultValue={editingProduct?.Name} placeholder="Nombre" required className="w-full p-2 border rounded" />
                            <textarea name="Description" defaultValue={editingProduct?.Description} placeholder="Descripción" required className="w-full p-2 border rounded" />
                            <input name="BasePrice" defaultValue={editingProduct?.BasePrice} placeholder="Precio base" type="number" required className="w-full p-2 border rounded" />
                            <input name="Available" defaultValue={editingProduct?.Available} placeholder="Disponibles" type="number" required className="w-full p-2 border rounded" />
                            <select name="CategoryName" defaultValue={editingProduct?.CategoryName} required className="w-full p-2 border rounded">
                                <option value="">Seleccionar categoría</option>
                                {categories.map((category) => (
                                    <option key={category.CategoryID} value={category.Name}>{category.Name}</option>
                                ))}
                            </select>
                            <input name="ImageURL" defaultValue={editingProduct?.ImageURL.replace("http://localhost:3000/images/", "")} placeholder="URL de imagen" required className="w-full p-2 border rounded" />
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-xl shadow">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-orange-50 text-gray-700 text-sm font-semibold">
                        <tr>
                            <th className="px-4 py-3 text-left">Imagen</th>
                            <th className="px-4 py-3 text-left">Nombre</th>
                            <th className="px-4 py-3 text-left">Descripción</th>
                            <th className="px-4 py-3 text-left">Precio</th>
                            <th className="px-4 py-3 text-left">Disponibles</th>
                            <th className="px-4 py-3 text-left">Categoría</th>
                            <th className="px-4 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {products.map((product) => (
                            <tr key={product.ProductID} className="border-t hover:bg-orange-50/30">
                                <td className="px-4 py-3"><img src={product.ImageURL} alt={product.Name} className="w-10 h-10 rounded object-cover" /></td>
                                <td className="px-4 py-3 font-medium">{product.Name}</td>
                                <td className="px-4 py-3">{product.Description}</td>
                                <td className="px-4 py-3">${product.BasePrice}</td>
                                <td className="px-4 py-3">{product.Available}</td>
                                <td className="px-4 py-3">{product.CategoryName}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button
                                        onClick={() => handleEdit(product)}
                                        className="bg-orange-500 hover:bg-orange-600 rounded-lg"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <Pencil className="w-4 h-4 text-white" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(product.ProductID)}
                                        className="hover:bg-red-100"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Admin
