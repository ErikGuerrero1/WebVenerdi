function Contact() {
  const handleCallClick = () => {
    window.open("", "_self");
  };

  const handleWhatsAppClick = () => {
    window.open("", "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Desktop Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Pendant Lights */}
          <div className="absolute top-20 right-1/4 z-30">
            <div className="w-32 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-90 blur-sm"></div>
            <div className="w-24 h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full opacity-70 blur-sm mt-2"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 text-center max-w-4xl mx-auto px-8">
            <h1 className="text-6xl font-serif mb-8 text-yellow-400">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              Estamos aquí para servirte. Haz tu reservación o consulta
              cualquier información sobre nuestros platillos.
            </p>

            {/* Phone Number Display */}
            <div className="bg-zinc-900 bg-opacity-80 rounded-2xl p-12 backdrop-blur-sm border border-yellow-400/20">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Llámanos
                  </p>
                  <a
                    href=""
                    className="text-3xl font-bold text-white hover:text-yellow-400 transition-colors"
                  >
                    +52 (953) 134 5799
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={handleCallClick}
                  className="flex items-center justify-center px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Llamar Ahora
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.347" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Mobile pendant lights */}
          <div className="absolute top-20 left-1/4 z-20">
            <div className="w-12 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-80 blur-sm"></div>
          </div>
          <div className="absolute top-16 right-1/3 z-20">
            <div className="w-16 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-60 blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 w-full">
            <h1 className="text-4xl font-serif mb-6 text-yellow-400">
              Contáctanos
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Estamos aquí para servirte. Haz tu reservación o consulta sobre
              nuestros platillos.
            </p>

            {/* Phone Number Display */}
            <div className="bg-zinc-900 bg-opacity-90 rounded-xl p-8 backdrop-blur-sm border border-yellow-400/20 mx-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Llámanos
                  </p>
                  <a
                    href=""
                    className="text-xl font-bold text-white hover:text-yellow-400 transition-colors"
                  >
                    +52 (953) 134 5799
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCallClick}
                  className="w-full flex items-center justify-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Llamar Ahora
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.347" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
