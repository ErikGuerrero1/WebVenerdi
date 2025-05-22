import { useState } from 'react'
import { Menu, X, MapPin, Phone, Mail, Instagram } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Layout - Ahora incluye pantallas medianas (md) */}
      <div className="hidden md:block">
        {/* Desktop Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Navigation Links */}
              <div className="responsive-space-x">
                <a href="#ubicacion" className="text-white hover:text-yellow-400 transition-colors text-sm font-medium tracking-wider">
                  LOCALIZACIÓN
                </a>
                <a href="#menu" className="text-white hover:text-yellow-400 transition-colors text-sm font-medium tracking-wider">
                  MENÚ
                </a>
                <a href="#redes" className="text-white hover:text-yellow-400 transition-colors text-sm font-medium tracking-wider">
                  REDES
                </a>
                <a href="#contacto" className="text-white hover:text-yellow-400 transition-colors text-sm font-medium tracking-wider">
                  CONTÁCTANOS
                </a>
                <button className="text-white hover:text-yellow-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="../assets/vene.jpg"
              alt="Restaurant interior with brick wall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>

          {/* Pendant Lights */}
          <div className="absolute top-20 right-1/4 z-30">
            <div className="w-32 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-90 blur-sm"></div>
            <div className="w-24 h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full opacity-70 blur-sm mt-2"></div>
          </div>

          {/* Main Content - Solo el scroll indicator */}
          <div className="relative z-20 text-center">
            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <svg
                className="w-10 h-10 mx-auto text-white opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Desktop About Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-8 text-yellow-400">Bienvenidos a Venerdi</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Sumérgete en una experiencia gastronómica única donde la tradición se encuentra con la innovación.
                En Venerdi, cada plato cuenta una historia y cada sabor despierta los sentidos.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Nuestro ambiente cálido con paredes de ladrillo y iluminación íntima crea el escenario perfecto
                para momentos inolvidables junto a tus seres queridos.
              </p>
            </div>
          </div>
        </section>
        {/* Desktop Reviews Section */}
        <section className="py-20 bg-zinc-800">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-serif text-center mb-12 text-yellow-400">Lo que dicen nuestros clientes</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review 1 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"Sobrepasó nuestras expectativas, la atención es muy amable, el lugar muy lindo, limpio, y la comida es una verdadera joya, a precio accesible y lo que pidas del menú es garantía de sabor y calidad, pasta, pizza, hamburguesa, dedos de queso, todo, es delicioso; hemos asistido en varias ocasiones, y volveremos cada que se pueda, desde la ciudad de Oaxaca ♥️"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      M
                    </div>
                    <div>
                      <p className="text-white font-semibold">María González</p>
                      <p className="text-gray-400 text-sm">Hace 2 semanas</p>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"Comida italiana con buen sazón y servicio amable. Pedí una lasaña y estaba muy buena, acompañada de panecillos artesanales. La carta no tiene IVA, si piden factura les cobrarán 16% más."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      C
                    </div>
                    <div>
                      <p className="text-white font-semibold">Carlos Mendoza</p>
                      <p className="text-gray-400 text-sm">Hace 1 semana</p>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"El lugar tiene un diseño muy agradable, muy "instagrameable", el servicio es rápido, muy amables. En el caso de la comida he llegado a pedir varios platillos y todos me han gustado, en especial por su pan de ajo."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      A
                    </div>
                    <div>
                      <p className="text-white font-semibold">Ana Rodríguez</p>
                      <p className="text-gray-400 text-sm">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Reviews Link */}
              <div className="text-center mt-12">
                <a
                  href="https://www.google.com/search?sca_esv=086262122deab5e8&rlz=1C1UEAD_esMX1087MX1088&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzcqpPW_V81r1GWy2kPaP2u6iizPpMrCp00EQc3-xsaOVUo3DWgB3Uafy5gWGqMuCxJq9otIE_2l-_hGK7DMHft3SsMBEiLyixqfWIueDAUZiy3zR2RTMVPlqw8E5hwDuihl-i5w%3D&q=%22VENERDI%22+RESTAURANTE+BAR+Y+PIZZERIA.+Opiniones&sa=X&ved=2ahUKEwifkZSFkbeNAxXlJ0QIHcSHN6wQ0bkNegQIMxAE&biw=1163&bih=517&dpr=1.65"
                  className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Ver más reseñas en Google
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Contact Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-3 gap-12 text-center">
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-3">Ubicación</h3>
                <p className="text-gray-400">Col. La merced</p>
              </div>
              <div>
                <Phone className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-3">Reservas</h3>
                <p className="text-gray-400">+52 953 000 0000</p>
              </div>
              <div>
                <Mail className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <p className="text-gray-400">prueba@venerdi.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Social Media Fixed Bottom */}
        <div className="fixed bottom-8 left-8 z-50 flex space-x-4">
          <a
            href="#"
            className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-all duration-300 hover:scale-110"
          >
            <Instagram className="w-7 h-7 text-white" />
          </a>
          <a
            href="#"
            className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Layout - Solo para pantallas pequeñas */}
      <div className="md:hidden">
        {/* Mobile Navigation */}
        <nav className="bg-black bg-opacity-80 backdrop-blur-sm relative z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-2xl font-serif italic text-white">
                Venerdi
              </div>

              {/* Mobile menu button */}
              <button
                className="text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
              <div className="mt-4 space-y-4">
                <a href="#ubicacion" className="block text-white hover:text-yellow-400 transition-colors">
                  LOCALIZACIÓN
                </a>
                <a href="#menu" className="block text-white hover:text-yellow-400 transition-colors">
                  MENÚ
                </a>
                <a href="#redes" className="block text-white hover:text-yellow-400 transition-colors">
                  REDES
                </a>
                <a href="#contacto" className="block text-white hover:text-yellow-400 transition-colors">
                  CONTÁCTANOS
                </a>
                <button className="text-white hover:text-yellow-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="../assets/vene2.webp"
              alt="Restaurant interior with brick wall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            {/* Mobile Logo */}
            <div className="mb-12">
              <div className="relative inline-block">
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <svg
                className="w-8 h-8 mx-auto text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          {/* Mobile pendant lights */}
          <div className="absolute top-20 left-1/4 z-20">
            <div className="w-12 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-80 blur-sm"></div>
          </div>
          <div className="absolute top-16 right-1/3 z-20">
            <div className="w-16 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-60 blur-sm"></div>
          </div>
        </section>

        {/* Mobile About Section */}
        <section className="py-16 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif mb-6 text-yellow-400">Bienvenidos a Venerdi</h2>
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                Sumérgete en una experiencia gastronómica única donde la tradición se encuentra con la innovación.
                En Venerdi, cada plato cuenta una historia y cada sabor despierta los sentidos.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                Nuestro ambiente cálido con paredes de ladrillo y iluminación íntima crea el escenario perfecto
                para momentos inolvidables junto a tus seres queridos.
              </p>
            </div>
          </div>
        </section>

        {/* mobile Reviews Section */}
        <section className="py-20 bg-zinc-800">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-serif text-center mb-12 text-yellow-400">Lo que dicen nuestros clientes</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review 1 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"Sobrepasó nuestras expectativas, la atención es muy amable, el lugar muy lindo, limpio, y la comida es una verdadera joya, a precio accesible y lo que pidas del menú es garantía de sabor y calidad, pasta, pizza, hamburguesa, dedos de queso, todo, es delicioso; hemos asistido en varias ocasiones, y volveremos cada que se pueda, desde la ciudad de Oaxaca ♥️"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      M
                    </div>
                    <div>
                      <p className="text-white font-semibold">María González</p>
                      <p className="text-gray-400 text-sm">Hace 2 semanas</p>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"Comida italiana con buen sazón y servicio amable. Pedí una lasaña y estaba muy buena, acompañada de panecillos artesanales. La carta no tiene IVA, si piden factura les cobrarán 16% más."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      C
                    </div>
                    <div>
                      <p className="text-white font-semibold">Carlos Mendoza</p>
                      <p className="text-gray-400 text-sm">Hace 1 semana</p>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"El lugar tiene un diseño muy agradable, muy "instagrameable", el servicio es rápido, muy amables. En el caso de la comida he llegado a pedir varios platillos y todos me han gustado, en especial por su pan de ajo."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      A
                    </div>
                    <div>
                      <p className="text-white font-semibold">Ana Rodríguez</p>
                      <p className="text-gray-400 text-sm">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Reviews Link */}
              <div className="text-center mt-12">
                <a
                  href="https://www.google.com/search?sca_esv=086262122deab5e8&rlz=1C1UEAD_esMX1087MX1088&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzcqpPW_V81r1GWy2kPaP2u6iizPpMrCp00EQc3-xsaOVUo3DWgB3Uafy5gWGqMuCxJq9otIE_2l-_hGK7DMHft3SsMBEiLyixqfWIueDAUZiy3zR2RTMVPlqw8E5hwDuihl-i5w%3D&q=%22VENERDI%22+RESTAURANTE+BAR+Y+PIZZERIA.+Opiniones&sa=X&ved=2ahUKEwifkZSFkbeNAxXlJ0QIHcSHN6wQ0bkNegQIMxAE&biw=1163&bih=517&dpr=1.65"
                  className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Ver más reseñas en Google
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Contact */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <div className="space-y-8 text-center">
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
                <p className="text-gray-400">Centro de la Ciudad</p>
              </div>
              <div>
                <Phone className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Reservas</h3>
                <p className="text-gray-400">+1 234 567 890</p>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-400">info@venerdi.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Social Media Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="flex justify-center space-x-6 py-4">
            <a
              href="#"
              className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App