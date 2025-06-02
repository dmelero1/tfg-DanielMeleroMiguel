import imgLogoCristal from "../Dashboard/ImgDashboard/imagenLogoCromatic.png";

const DashboardImg = () => {
  return (
    <div className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white bg-black text-4xl font-bold py-16">
      Bienvenido a DMSPORT
      <img src={imgLogoCristal} alt="Logo" className="w-56 h-auto mt-6" />
    </div>
  );
};

export default DashboardImg;