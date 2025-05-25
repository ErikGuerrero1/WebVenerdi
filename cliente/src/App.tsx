import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home';
import MenuPage from './components/menu';
import Header from './components/Header';
import Footer from './components/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}

// Componente interno que tiene acceso a useLocation
const AppContent = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const location = useLocation();

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id);
    // Simular delay de la API
    await new Promise(resolve => setTimeout(resolve, 500));
    setCart(prevCart => [...prevCart, product]);
    setAddingToCart(null);
  };

  const handleCartClick = () => {
    // Aquí puedes implementar la lógica para abrir el carrito
    // Por ejemplo, abrir un modal o navegar a una página del carrito
    console.log('Carrito clickeado:', cart);
    // Ejemplo: podrías mostrar un alert con el contenido del carrito
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
    } else {
      const cartItems = cart.map(item => `${item.name} - $${item.price}`).join('\n');
      alert(`Carrito (${cart.length} items):\n${cartItems}`);
    }
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
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;