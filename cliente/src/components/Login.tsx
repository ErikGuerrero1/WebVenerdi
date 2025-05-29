import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Endpoint
    console.log("Login data:", formData);
    alert("Datos de login enviados - Ver consola");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20 pb-8">
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

      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-zinc-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-yellow-400 mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-300">Inicia sesión en Venerdi</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                minLength={6}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              className="block w-full text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
            <div className="text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link
                to="/registro"
                className="text-yellow-400 hover:text-yellow-300 transition-colors underline hover:no-underline"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
