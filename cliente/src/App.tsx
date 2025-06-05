import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/Home";
import MenuPage from "./components/menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Location from "./components/Location";
import Social from "./components/Social";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import CartPage from "./components/CartPage";
import PersonalizaPage from "./components/Personaliza";
import AdminPage from "./components/Admin";
import ProtectedRoute from "./components/protected-route"; // Importar el componente de protección

import { AuthProvider } from "./components/context/AuthContext";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  size?: string;
  sizeId?: number;
  imageUrl: string;
  quantity: number;
  id: string;
}

const AppContent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const generateCartItemId = (productId: number, sizeId?: number) => {
    return `${productId}-${sizeId || "default"}-${Date.now()}`;
  };

  const handleAddToCart = async (item: CartItem) => {
    setAddingToCart(item.productId);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newCartItem: CartItem = {
      ...item,
      quantity: 1,
      id: generateCartItemId(item.productId, item.sizeId),
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    setAddingToCart(null);
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    setCart([]);
    /*const phoneNumber = "9531720143";
    let message =
      "¡Hola! Quiero hacer una compra. Estos son los productos:\n\n";

    cart.forEach((item) => {
      message += ` ${item.name} (cantidad: ${item.quantity}) - Precio($${
        item.price
      }c/u): $${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    message += `\nTotal: $${total}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirigir a WhatsApp
    window.open(whatsappUrl, "_blank");*/
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <Header
        currentPath={location.pathname}
        cart={cart}
        onCartClick={handleCartClick}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menu"
          element={
            <MenuPage
              onAddToCart={handleAddToCart}
              addingToCart={addingToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onGoBack={() => navigate(-1)}
              onProceedToCheckout={handleProceedToCheckout}
            />
          }
        />
        <Route path="/ubicacion" element={<Location />} />
        <Route path="/Redes" element={<Social />} />
        <Route path="/Contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/personaliza" element={<PersonalizaPage />} />

        {/* Ruta protegida solo para administradores */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
