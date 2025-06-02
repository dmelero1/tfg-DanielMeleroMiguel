import imgLogoCristal from "../Dashboard/ImgDashboard/imagenLogoCromatic.png";

const DashboardImg = () => {
  return (
    <div className="w-full bg-black text-white flex flex-col items-center justify-center text-center py-10 sm:py-16 px-4">
      <h1 className="text-2xl sm:text-4xl font-bold">Bienvenido a DMSPORT</h1>
      <img src={imgLogoCristal} alt="Logo" className="w-32 sm:w-56 h-auto mt-4 sm:mt-6" />
    </div>
  );
};

export default DashboardImg;