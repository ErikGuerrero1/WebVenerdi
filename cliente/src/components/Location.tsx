function Location() {
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
              alt="Vista exterior del restaurante"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Pendant Lights */}
          <div className="absolute top-20 right-1/4 z-30">
            <div className="w-32 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full opacity-90 blur-sm"></div>
            <div className="w-24 h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full opacity-70 blur-sm mt-2"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-20 text-center">
            <h1 className="text-6xl font-serif mb-4 text-yellow-400">
              Encuéntranos
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Tu destino gastronómico te espera
            </p>

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

        {/* Desktop Location Details Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Location Info */}
                <div>
                  <h2 className="text-4xl font-serif mb-8 text-yellow-400">
                    Nuestra Ubicación
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Dirección
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Pedro Moreno 32
                          <br />
                          La Merced
                          <br />
                          Huajuapan de León, Oaxaca
                          <br />
                          C.P. 69006
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Horarios
                        </h3>
                        <div className="text-gray-300 text-lg space-y-1">
                          <p>Lunes a Jueves: 1:00 PM - 11:00 PM</p>
                          <p>Viernes y Sábado: 1:00 PM - 11:00 PM</p>
                          <p>Domingo: 1:00 PM - 11:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Contacto
                        </h3>
                        <div className="text-gray-300 text-lg space-y-1">
                          <p>Teléfono: +52 (953) 134 5799</p>
                          <p>WhatsApp: +52 (953) 134 5799</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 space-y-4">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors mr-4"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      Ver en Google Maps
                    </a>
                    <a
                      href=""
                      className="inline-flex items-center px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Llamar Ahora
                    </a>
                  </div>
                </div>

                {/* Map Section */}
                <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-12">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d399.27372653836903!2d-97.78113469382896!3d17.812681308272136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1748483218701!5m2!1ses!2smx"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
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
              src="../assets/vene.jpg"
              alt="Vista exterior del restaurante"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl font-serif mb-4 text-yellow-400">
              Encuéntranos
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Tu destino gastronómico te espera
            </p>

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

        {/* Mobile Location Details Section */}
        <section className="py-16 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif mb-8 text-yellow-400 text-center">
                Nuestra Ubicación
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="bg-zinc-800 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Dirección
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        Pedro Moreno #32
                        <br />
                        La Merced
                        <br />
                        Huajuapan de León, Oaxaca
                        <br />
                        C.P. 69006
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-zinc-800 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Horarios
                      </h3>
                      <div className="text-gray-300 space-y-1 text-sm">
                        <p>Lunes a Jueves: 1:00 PM - 11:00 PM</p>
                        <p>Viernes y Sábado: 1:00 PM - 11:00 PM</p>
                        <p>Domingo: 1:00 PM - 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-zinc-800 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Contacto
                      </h3>
                      <div className="text-gray-300 space-y-1 text-sm">
                        <p>Teléfono: +52 (953) 134 5799</p>
                        <p>WhatsApp: +52 (953) 134 5799</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-zinc-800 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d399.27372653836903!2d-97.78113469382896!3d17.812681308272136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1748483218701!5m2!1ses!2smx"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    Ver en Google Maps
                  </a>
                  <a
                    href=""
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Llamar Ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Location;
