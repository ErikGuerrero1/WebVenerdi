import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    categoryName: string;
}

interface HeaderProps {
    currentPath?: string;
    cart: Product[];
    onCartClick?: () => void;
}

const navItems = [
    { href: '/', label: 'INICIO' },
    { href: '/menu', label: 'MENÚ' },
    { href: '#ubicacion', label: 'LOCALIZACIÓN' },
    { href: '#redes', label: 'REDES' },
    { href: '#contacto', label: 'CONTÁCTANOS' },
];

const Header = ({ currentPath = '/', cart = [], onCartClick }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHref, setActiveHref] = useState(currentPath);
    const isHomePage = currentPath === '/';

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

    return (
        <>
            {/* Desktop Header */}
            <div className="hidden md:block">
                <nav className={`absolute top-0 left-0 right-0 z-50 ${!isHomePage ? 'bg-black bg-opacity-100 backdrop-blur-sm' : 'bg-black'}`}>
                    <div className="container mx-auto px-8 py-6">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="text-3xl font-serif italic text-white">
                                <a href="/" className="hover:text-yellow-400 transition-colors">
                                    Venerdi
                                </a>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => handleClick(item.href)}
                                        className={`text-sm font-medium tracking-wider transition-colors px-3 py-1 rounded cursor-pointer
                                            ${activeHref === item.href
                                                ? 'bg-black text-yellow-400'
                                                : 'text-white hover:text-yellow-400'
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button 
                                    onClick={handleCartClick}
                                    className="relative text-white hover:text-yellow-400 transition-colors" 
                                    aria-label="Abrir carrito"
                                >
                                    <ShoppingBag size={24} />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                            {cart.length}
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
                <nav className={`absolute top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-black bg-opacity-100 backdrop-blur-sm' : 'bg-black'}`}>
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="text-2xl font-serif italic text-white">
                                <a href="/" className="hover:text-yellow-400 transition-colors">
                                    Venerdi
                                </a>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                className="text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Abrir menú"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="mt-4 space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => handleClick(item.href)}
                                        className={`block px-3 py-1 rounded cursor-pointer transition-colors ${activeHref === item.href
                                                ? 'bg-black text-yellow-400'
                                                : 'text-white hover:text-yellow-400'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button 
                                    onClick={handleCartClick}
                                    className="relative text-white hover:text-yellow-400 transition-colors flex items-center gap-2" 
                                    aria-label="Abrir carrito"
                                >
                                    <ShoppingBag size={24} />
                                    <span>Carrito</span>
                                    {cart.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                            {cart.length}
                                        </span>
                                    )}
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