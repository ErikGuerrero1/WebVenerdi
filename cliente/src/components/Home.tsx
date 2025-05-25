function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Desktop Layout */}
            <div className="hidden md:block">
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
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
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

                {/* Mobile Reviews Section */}
                <section className="py-16 bg-zinc-800">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-serif text-center mb-8 text-yellow-400">Lo que dicen nuestros clientes</h2>

                            <div className="space-y-6">
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
                            
                            {/* Google Reviews Link - Mobile */}
                            <div className="text-center mt-8">
                                <a
                                    href="https://www.google.com/search?sca_esv=086262122deab5e8&rlz=1C1UEAD_esMX1087MX1088&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzcqpPW_V81r1GWy2kPaP2u6iizPpMrCp00EQc3-xsaOVUo3DWgB3Uafy5gWGqMuCxJq9otIE_2l-_hGK7DMHft3SsMBEiLyixqfWIueDAUZiy3zR2RTMVPlqw8E5hwDuihl-i5w%3D&q=%22VENERDI%22+RESTAURANTE+BAR+Y+PIZZERIA.+Opiniones&sa=X&ved=2ahUKEwifkZSFkbeNAxXlJ0QIHcSHN6wQ0bkNegQIMxAE&biw=1163&bih=517&dpr=1.65"
                                    className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-sm"
                                >
                                    Ver más reseñas en Google
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home