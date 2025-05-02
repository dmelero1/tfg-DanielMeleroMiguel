import imgFondo from "../Dashboard/ImgDashboard/imgFondoGym.jpg";

const DashboardImg = () => {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      Bienvenido a DMSPORT
    </div>
  );
};

export default DashboardImg;