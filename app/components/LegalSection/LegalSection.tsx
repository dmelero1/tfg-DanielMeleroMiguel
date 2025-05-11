const LegalSection = () => {
  return (
    <section className="bg-gray-800 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-0 text-center sm:text-left">
          <a href="/terminos" className="hover:text-gray-400 text-sm sm:text-base">
            Términos y Condiciones
          </a>
          <a href="/privacidad" className="hover:text-gray-400 text-sm sm:text-base">
            Política de Privacidad
          </a>
          <a href="/cookies" className="hover:text-gray-400 text-sm sm:text-base">
            Política de Cookies
          </a>
        </div>
        <p className="text-center sm:text-left text-xs sm:text-sm mt-8 sm:mt-0">
          © 2025 DMSPORT. Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
};

export default LegalSection;