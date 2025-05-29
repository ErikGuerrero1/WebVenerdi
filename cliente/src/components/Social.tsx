function Social() {
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
              alt="Mesa con comida italiana y dispositivos móviles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>

          {/* Pendant Light */}
          <div className="absolute top-20 right-1/3 z-30">
            <div className="w-24 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-80 blur-sm"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 text-center max-w-4xl mx-auto px-8">
            <h1 className="text-6xl font-serif mb-6 text-yellow-400">
              Síguenos
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Mantente al día con nuestras últimas creaciones culinarias,
              eventos especiales y promociones exclusivas
            </p>

            {/* Facebook Card */}
            <div className="bg-zinc-900 bg-opacity-90 rounded-2xl p-12 shadow-2xl backdrop-blur-sm max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mr-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-serif text-white mb-2">
                    Facebook
                  </h2>
                  <p className="text-gray-300">@venerdihuajuapan</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Descubre nuestros platos del día, comparte tus momentos
                favoritos en Venerdi y entérate de nuestros eventos especiales
                antes que nadie.
              </p>

              <a
                href="https://www.facebook.com/venerdihuajuapan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Visitar nuestra página
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="../assets/vene.jpg"
              alt="Mesa con comida italiana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>

          {/* Mobile pendant light */}
          <div className="absolute top-20 right-1/4 z-20">
            <div className="w-12 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-70 blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center w-full max-w-md mx-auto">
            <h1 className="text-4xl font-serif mb-4 text-yellow-400">
              Síguenos
            </h1>
            <p className="text-gray-300 mb-8 text-base">
              Mantente al día con nuestras creaciones culinarias y promociones
              exclusivas
            </p>

            {/* Facebook Card */}
            <div className="bg-zinc-900 bg-opacity-95 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-serif text-white mb-1">
                    Facebook
                  </h2>
                  <p className="text-gray-300 text-sm">@venerdihuajuapan</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Descubre nuestros platos del día y entérate de eventos
                especiales antes que nadie.
              </p>

              <a
                href="https://www.facebook.com/venerdihuajuapan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Visitar página
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Social;
