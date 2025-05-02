const LegalSection = () => {
    return (
      <section className="bg-gray-800 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">  
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="/terminos" className="hover:text-gray-400">Términos y Condiciones</a>
            <a href="/privacidad" className="hover:text-gray-400">Política de Privacidad</a>
            <a href="/cookies" className="hover:text-gray-400">Política de Cookies</a>
          </div>
          
          <p className="text-center sm:text-left">© 2025 DMSport. Todos los derechos reservados.</p>
        </div>
      </section>
    );
  };
  
  export default LegalSection;  