import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  User,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

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

interface ContactData {
  name: string;
  address: string;
  email: string;
  phone: string;
  isPickup: boolean;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onGoBack: () => void;
  onProceedToCheckout?: () => void;
}

const CartPage = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoBack,
  onProceedToCheckout,
}: CartPageProps) => {
  const { isAuthenticated, user } = useAuthContext();
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    address: "",
    email: "",
    phone: "",
    isPickup: false,
  });

  // Calcular el total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItem(itemId);
    try {
      await onUpdateQuantity(itemId, newQuantity);
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItem(itemId);
    try {
      await onRemoveItem(itemId);
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleContactDataChange = (
    field: keyof ContactData,
    value: string | boolean
  ) => {
    setContactData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("Datos de contacto actualizados:", {
      ...contactData,
      [field]: value,
    });
  };

  const handlePickupToggle = (isPickup: boolean) => {
    const defaultStoreAddress =
      "Pizzería Bella Vista - Av. Principal #123, Centro, Ciudad";

    setContactData((prev) => ({
      ...prev,
      isPickup: isPickup,
      address: isPickup ? defaultStoreAddress : "",
    }));

    console.log("Datos de contacto actualizados:", {
      ...contactData,
      isPickup: isPickup,
      address: isPickup ? defaultStoreAddress : "",
    });
  };

  const handleProceedToCheckout = async () => {
    try {
      // Preparar el pedido
      const pedido = {
        // Incluir el ID del usuario si está logueado
        ...(isAuthenticated && user && { idUser: user.id }),

        // Si está logueado, usar los datos del usuario, sino usar los del formulario
        nombre: isAuthenticated && user ? user.name : contactData.name,
        phone: isAuthenticated && user ? user.phone : contactData.phone,
        address: isAuthenticated && user ? user.address : contactData.address,
        isPickup: contactData.isPickup,
        carrito: cartItems,
        precioTotal: subtotal,
      };

      console.log("Enviando pedido:", pedido);

      const response = await fetch(
        "http://localhost:3000/api/order-items/compra",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Compra procesada exitosamente:", result);

        alert(`¡Pedido procesado exitosamente! 
        Número de pedido: ${result.data.order.OrderID}
        ${
          result.data.whatsappSent
            ? "Se ha enviado confirmación por WhatsApp."
            : ""
        }`);

        // Limpiar el carrito después de la compra exitosa
         onClearCart(); 
      } else {
        console.error("Error en la compra:", result);
        alert(`Error al procesar el pedido: ${result.message}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión. Por favor intenta nuevamente.");
    }
  };

  // Validar si los datos están completos
  const isContactDataValid = isAuthenticated
    ? true // Si está logueado, los datos son válidos automáticamente
    : contactData.name.trim() !== "" &&
      contactData.address.trim() !== "" &&
      contactData.email.trim() !== "" &&
      contactData.phone.trim() !== "";

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8">
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button
              onClick={onGoBack}
              className="bg-gray-600 hover:bg-gray-200 text-gray-700 rounded-full p-2 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tu Carrito
            </h1>
          </div>

          <Card className="text-center py-8 sm:py-16">
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 mx-auto" />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
                  Tu carrito está vacío
                </h2>
                <p className="text-sm sm:text-base text-gray-500 px-4">
                  Agrega algunos productos deliciosos de nuestro menú
                </p>
                <Link to="/menu">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-6 w-full sm:w-auto">
                    Ver Menú
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={onGoBack}
              className="bg-gray-600 hover:bg-gray-200 text-gray-700 rounded-full p-2 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tu Carrito
            </h1>
            <span className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "producto" : "productos"}
            </span>
          </div>

          {cartItems.length > 0 && (
            <Button
              onClick={onClearCart}
              className="bg-red-500 hover:bg-red-200 text-red-700 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto"
            >
              Vaciar Carrito
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Lista de productos */}
          <div className="xl:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate">
                            {item.name}
                          </h3>
                          {item.size && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              Tamaño: {item.size}
                            </p>
                          )}
                          <p className="text-orange-600 font-bold text-sm sm:text-base">
                            ${item.price.toFixed(2)} c/u
                          </p>
                        </div>

                        <Button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updatingItem === item.id}
                          className="bg-red-500 hover:bg-red-200 text-red-600 p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-1 text-black">
                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={
                              item.quantity <= 1 || updatingItem === item.id
                            }
                            className="bg-white hover:bg-gray-50 text-slate-950 w-6 h-6 sm:w-8 sm:h-8 rounded-md p-0 flex items-center justify-center font-bold text-lg"
                          >
                            -
                          </Button>

                          <span className="font-semibold text-teal-950 min-w-[1.5rem] sm:min-w-[2rem] text-center text-sm sm:text-base">
                            {updatingItem === item.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-orange-500 mx-auto"></div>
                            ) : (
                              item.quantity
                            )}
                          </span>

                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={updatingItem === item.id}
                            className="bg-white hover:bg-gray-50 text-slate-950 w-6 h-6 sm:w-8 sm:h-8 rounded-md p-0 flex items-center justify-center font-bold text-lg"
                          >
                            +
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg sm:text-xl font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar con resumen y datos de contacto */}
          <div className="xl:col-span-1 order-first xl:order-last space-y-4 sm:space-y-6">
            {/* Datos de contacto */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos de Contacto
                  {isAuthenticated && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </h2>

                {/* Mostrar datos del usuario logueado */}
                {isAuthenticated && user ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-semibold text-green-700">
                          Sesión iniciada como:
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{user.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Solo mostrar opción de pickup */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Opciones de entrega:
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handlePickupToggle(false)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            !contactData.isPickup
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          Entrega a domicilio
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePickupToggle(true)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            contactData.isPickup
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          Recoger en tienda
                        </button>
                      </div>
                    </div>

                    {contactData.isPickup && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-700 font-medium">
                          📍 Dirección de la tienda:
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Pizzería Bella Vista - Av. Principal #123, Centro,
                          Ciudad
                        </p>
                        <p className="text-xs text-green-500 mt-2">
                          Tu pedido estará listo en 15-20 minutos
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Formulario para usuarios no logueados */
                  <div className="space-y-4">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={contactData.name}
                        onChange={(e) =>
                          handleContactDataChange("name", e.target.value)
                        }
                        placeholder="Ingresa tu nombre completo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {contactData.isPickup
                          ? "Dirección de la tienda"
                          : "Dirección de entrega"}
                      </label>

                      <div className="flex items-center gap-3 mb-3">
                        <button
                          type="button"
                          onClick={() => handlePickupToggle(false)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            !contactData.isPickup
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          Entrega a domicilio
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePickupToggle(true)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            contactData.isPickup
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          Recoger en tienda
                        </button>
                      </div>

                      {contactData.isPickup ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-700 font-medium">
                            📍 Dirección de la tienda:
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Pizzería Bella Vista - Av. Principal #123, Centro,
                            Ciudad
                          </p>
                          <p className="text-xs text-green-500 mt-2">
                            Tu pedido estará listo en 15-20 minutos
                          </p>
                        </div>
                      ) : (
                        <textarea
                          value={contactData.address}
                          onChange={(e) =>
                            handleContactDataChange("address", e.target.value)
                          }
                          placeholder="Calle, número, colonia, referencias..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm resize-none"
                        />
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) =>
                          handleContactDataChange("email", e.target.value)
                        }
                        placeholder="tu.email@ejemplo.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Número de teléfono
                      </label>
                      <input
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) =>
                          handleContactDataChange("phone", e.target.value)
                        }
                        placeholder="(123) 456-7890"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      />
                    </div>

                    {!isContactDataValid && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-sm text-orange-700">
                          Por favor completa todos los campos para continuar
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumen del pedido */}
            <Card className="bg-white shadow-lg xl:sticky xl:top-24">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Resumen del Pedido
                </h2>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 sm:pt-3">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                      <span>Total:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {onProceedToCheckout && (
                    <Button
                      onClick={handleProceedToCheckout}
                      disabled={!isContactDataValid}
                      className={`w-full font-semibold py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
                        isContactDataValid
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">
                          Enviar Pedido
                        </span>
                      </div>
                    </Button>
                  )}
                  <Link to="/menu">
                    <Button className="w-full bg-red-400 hover:bg-red-600 text-gray-700 font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200">
                      <span className="text-sm sm:text-base">
                        Continuar Comprando
                      </span>
                    </Button>
                  </Link>
                </div>

                {/* Información adicional */}
                <div className="text-xs sm:text-sm text-gray-500 space-y-2 pt-3 sm:pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>Tiempo estimado: 15-20 min</span>
                  </div>
                  {!contactData.isPickup && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>Envío gratis en pedidos +$500</span>
                    </div>
                  )}
                  {contactData.isPickup && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span>Sin costo de envío - Recoge en tienda</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
