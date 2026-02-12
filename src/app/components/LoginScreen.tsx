import { useState } from "react";
import {
  Eye,
  EyeOff,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
// Asegúrate de que esta ruta siga siendo válida
import logoImage from "figma:asset/d62e886bb5e70a7825fca6a4a8e1be2cf4a5e051.png";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void; // <--- 1. NUEVA PROP
}

export function LoginScreen({
  onLogin,
  onForgotPassword,
  onCreateAccount,
}: LoginScreenProps) {
  // <--- 2. RECIBIRLA
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(username);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#E0E0E0] flex items-center justify-center overflow-hidden font-sans text-gray-800">
      <div className="transform scale-[0.85] md:scale-90 transition-transform duration-300">
        <div className="relative">
          <div className="relative bg-[#1A1A1A] rounded-[3rem] p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] ring-4 ring-gray-300/50">
            <div className="bg-black rounded-[2.8rem] p-1.5 relative overflow-hidden">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 ring-2 ring-[#222]"></div>

              <div className="relative bg-gradient-to-b from-[#FFE8B6] via-[#FFF5E1] to-white rounded-[2.3rem] overflow-hidden w-[360px] h-[800px] flex flex-col shadow-inner">
                {/* Barra de Estado */}
                <div className="absolute top-0 left-0 right-0 h-14 z-40 flex items-center justify-between px-6 pt-4 pointer-events-none text-gray-800">
                  <span className="text-sm font-semibold ml-2">
                    10:00
                  </span>
                  <div className="flex items-center gap-2 mr-2">
                    <Signal size={16} strokeWidth={2.5} />
                    <Wifi size={16} strokeWidth={2.5} />
                    <Battery
                      size={20}
                      className="rotate-0"
                      fill="currentColor"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-8 pt-20 pb-10 w-full">
                  <div className="flex flex-col items-center mb-12 animate-fade-in">
                    <div className="relative mb-6 filter drop-shadow-xl">
                      <img
                        src={logoImage}
                        alt="Heli-Band Logo"
                        className="w-58 h-58 object-contain"
                      />
                    </div>
                    <p className="text-gray-500 text-sm mt-2 font-medium">
                      Tu protección solar inteligente
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-5"
                  >
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value)
                        }
                        className="w-full bg-white/80 hover:bg-white focus:bg-white backdrop-blur-md rounded-2xl px-6 py-4 text-center text-gray-800 placeholder-gray-400 font-medium shadow-sm border border-orange-100/50 focus:border-orange-300 focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 outline-none"
                      />
                    </div>

                    <div className="relative group">
                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        className="w-full bg-white/80 hover:bg-white focus:bg-white backdrop-blur-md rounded-2xl px-6 py-4 text-center text-gray-800 placeholder-gray-400 font-medium shadow-sm border border-orange-100/50 focus:border-orange-300 focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors p-2 active:scale-90"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        !username.trim() ||
                        !password.trim()
                      }
                      className="w-full mt-6 bg-gradient-to-r from-[#FF6B4A] to-[#FF4D4D] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </button>
                  </form>

                  <div className="mt-10 flex flex-col items-center space-y-6">
                    <button
                      onClick={onForgotPassword}
                      className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>

                    {/* 3. CONECTAR EL BOTÓN */}
                    <button
                      onClick={onCreateAccount}
                      className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors active:scale-95"
                    >
                      Crear una cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#2A2A2A] rounded-r-md"></div>
            <div className="absolute -right-[3px] top-52 w-[3px] h-9 bg-[#2A2A2A] rounded-r-md"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 blur-[50px] -z-10 scale-95 translate-y-10"></div>
        </div>
      </div>
    </div>
  );
}