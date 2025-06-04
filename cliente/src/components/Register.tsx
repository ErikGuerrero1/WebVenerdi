import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Contraseñas iguales.");
      return;
    }

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.telefono,
        formData.direccion,
        formData.nombre
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al registrar usuario"
      );
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-8 px-4 overflow-y-auto">
      {/* Background decorativo */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"></div>
      </div>

      {/* Luces decorativas */}
      <div className="fixed top-20 left-1/4 z-10">
        <div className="w-16 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-60 blur-sm"></div>
      </div>
      <div className="fixed top-32 right-1/3 z-10">
        <div className="w-20 h-14 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full opacity-50 blur-sm"></div>
      </div>

      <div className="relative z-20 w-full max-w-md mx-auto">
        <div className="bg-zinc-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-yellow-400 mb-2">
              Registro
            </h1>
            <p className="text-gray-300">Únete a la familia Venerdi</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="953-123-4567"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dirección
              </label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none"
                placeholder="Tu dirección completa"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900 mt-6"
            >
              Crear Cuenta
            </button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-300 transition-colors underline hover:no-underline"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
