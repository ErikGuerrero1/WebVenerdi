import { useState } from "react";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext"; // Importar el contexto de autenticación

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

interface HeaderProps {
  currentPath?: string;
  cart: CartItem[];
  onCartClick?: () => void;
}

// Rutas base que siempre se muestran
const baseNavItems = [
  { href: "/", label: "INICIO" },
  { href: "/menu", label: "MENÚ" },
  { href: "/ubicacion", label: "LOCALIZACIÓN" },
  { href: "/redes", label: "REDES" },
  { href: "/contacto", label: "CONTÁCTANOS" },
  { href: "/admin", label: "ADMINISTRADOR" },
];

//  { href: "/admin", label: "ADMINISTRADOR" },

const Header = ({ currentPath = "/", cart = [], onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(currentPath);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isHomePage = currentPath === "/";

  // Obtener datos del contexto de autenticación
  const { isAuthenticated, user, logout } = useAuthContext();

  console.log(user);

  // Crear el array de navegación dinámicamente
  const navItems = [
    ...baseNavItems.filter(
      (item) =>
        // Si no es admin (ID !== 0), filtrar el enlace de administrador
        !(item.href === "/admin" && (!isAuthenticated || user?.id !== 0))
    ),
    ...(isAuthenticated
      ? [] // Si está autenticado, no mostrar login
      : [{ href: "/login", label: "INICIAR SESIÓN" }]), // Si no está autenticado, mostrar login
  ];

  // Calcular total de items en el carrito (sumando cantidades)
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleClick = (href: string) => {
    setActiveHref(href);
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <nav
          className={`absolute top-0 left-0 right-0 z-50 ${
            !isHomePage
              ? "bg-black bg-opacity-100 backdrop-blur-sm"
              : "bg-black"
          }`}
        >
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-3xl font-serif italic text-white">
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Venerdi
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`text-sm font-medium tracking-wider transition-colors px-3 py-1 rounded cursor-pointer
                                            ${
                                              activeHref === item.href
                                                ? "bg-black text-yellow-400"
                                                : "text-white hover:text-yellow-400"
                                            }
                                        `}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* User Menu (solo si está autenticado) */}
                {isAuthenticated && user && (
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors px-3 py-1 rounded"
                    >
                      <User size={18} />
                      <span className="text-sm font-medium tracking-wider">
                        {user.name}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Cart Button */}
                <button
                  onClick={handleCartClick}
                  className="relative text-white hover:text-yellow-400 transition-colors"
                  aria-label="Abrir carrito"
                >
                  <ShoppingBag size={24} />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {totalCartItems > 99 ? "99+" : totalCartItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <nav
          className={`absolute top-0 left-0 right-0 z-50 ${
            isHomePage ? "bg-black bg-opacity-100 backdrop-blur-sm" : "bg-black"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-2xl font-serif italic text-white">
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Venerdi
                </Link>
              </div>

              {/* Mobile buttons */}
              <div className="flex items-center gap-4">
                {/* User button for mobile (solo si está autenticado) */}
                {isAuthenticated && user && (
                  <button
                    onClick={toggleUserMenu}
                    className="text-white hover:text-yellow-400 transition-colors"
                    aria-label="Menú de usuario"
                  >
                    <User size={20} />
                  </button>
                )}

                {/* Cart button */}
                <button
                  onClick={handleCartClick}
                  className="relative text-white hover:text-yellow-400 transition-colors"
                  aria-label="Abrir carrito"
                >
                  <ShoppingBag size={20} />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold text-[10px]">
                      {totalCartItems > 99 ? "99+" : totalCartItems}
                    </span>
                  )}
                </button>

                {/* Menu button */}
                <button
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Abrir menú"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="mt-4 space-y-2 pb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`block px-3 py-2 rounded cursor-pointer transition-colors text-sm ${
                      activeHref === item.href
                        ? "bg-yellow-400 bg-opacity-20 text-yellow-400"
                        : "text-white hover:text-yellow-400 hover:bg-white hover:bg-opacity-10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* User Menu Mobile (solo si está autenticado) */}
                {isAuthenticated && user && (
                  <>
                    <div className="border-t border-gray-600 my-2"></div>
                    <div className="px-3 py-2 text-yellow-400 text-sm font-medium">
                      Hola, {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded cursor-pointer transition-colors text-sm text-red-400 hover:bg-white hover:bg-opacity-10 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                )}

                {/* Cart option in mobile menu */}
                <button
                  onClick={handleCartClick}
                  className="w-full text-left px-3 py-2 rounded cursor-pointer transition-colors text-sm text-white hover:text-yellow-400 hover:bg-white hover:bg-opacity-10 flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>CARRITO</span>
                  {totalCartItems > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold ml-auto">
                      {totalCartItems > 99 ? "99+" : totalCartItems}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* User Menu Mobile Dropdown (fuera del menú principal) */}
            {showUserMenu && isAuthenticated && user && (
              <div className="absolute right-4 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
