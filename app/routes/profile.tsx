import { useEffect, useState } from "react";
import ProfileConfiguration from "../components/Profile/ProfileConfiguration";
import ProfileCalendar from "~/components/Profile/ProfileCalendar";
import ProfileCalculator from "~/components/Profile/ProfileCalculator";

const Profile = () => {
  const [user, setUser] = useState<{ username: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500 text-xl">
        No se ha iniciado sesión.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-2xl border-4 border-black border-t-0 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000]">
          <ProfileConfiguration />
        </div>
        <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-2xl border-4 border-black border-t-0 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000]">
          <ProfileCalculator />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center p-6 bg-gray-800 rounded-2xl border-4 border-black border-t-0 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000]">
          <ProfileCalendar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
