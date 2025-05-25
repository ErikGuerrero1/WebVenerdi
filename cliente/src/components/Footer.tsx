import { MapPin, Phone, Mail, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        <>
            {/* Desktop Footer */}
            <div className="hidden md:block">
                {/* Contact Section */}
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

                {/* Social Media Fixed Bottom */}
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

                {/* Copyright */}
                <div className="bg-zinc-900 py-4">
                    <div className="container mx-auto px-8 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 Venerdi Restaurant. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden">
                {/* Contact Section */}
                <section className="py-12 bg-black">
                    <div className="container mx-auto px-4">
                        <div className="space-y-8 text-center">
                            <div>
                                <MapPin className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                                <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
                                <p className="text-gray-400">Col. La merced</p>
                            </div>
                            <div>
                                <Phone className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                                <h3 className="text-lg font-semibold mb-2">Reservas</h3>
                                <p className="text-gray-400">+52 953 000 0000</p>
                            </div>
                            <div>
                                <Mail className="w-6 h-6 mx-auto mb-3 text-yellow-400" />
                                <h3 className="text-lg font-semibold mb-2">Email</h3>
                                <p className="text-gray-400">prueba@venerdi.com</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media Bar */}
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

                {/* Copyright */}
                <div className="bg-zinc-900 py-4 mb-20">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 Venerdi Restaurant. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer