import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Battery,
  Signal,
  Wifi,
} from "lucide-react"; // Eliminé Clock de aquí
import { toast } from "sonner";

interface CreateAccountProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function CreateAccountScreen({
  onBack,
  onRegisterSuccess,
}: CreateAccountProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (!acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("¡Cuenta creada exitosamente!", {
        description: "Ahora puedes iniciar sesión.",
      });
      onRegisterSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#E0E0E0] flex items-center justify-center overflow-hidden font-sans text-gray-800">
      <div className="transform scale-[0.85] md:scale-90 transition-transform duration-300">
        <div className="relative">
          <div className="relative bg-[#1A1A1A] rounded-[3rem] p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] ring-4 ring-gray-300/50">
            <div className="bg-black rounded-[2.8rem] p-1.5 relative overflow-hidden">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 ring-2 ring-[#222]"></div>

              <div className="relative bg-gradient-to-b from-[#FFE8B6] via-[#FFF5E1] to-white rounded-[2.3rem] overflow-hidden w-[360px] h-[800px] flex flex-col shadow-inner">
                {/* --- Barra de Estado (RESTITUIDA LA HORA 10:00) --- */}
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

                {/* --- CONTENIDO --- */}
                <div className="flex-1 flex flex-col px-8 pt-24 w-full relative overflow-y-auto hide-scroll">
                  {/* Botón Atrás (Bajado) */}
                  <div className="mb-4 -ml-2 self-start animate-fade-in">
                    <button
                      onClick={onBack}
                      className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700"
                    >
                      <ArrowLeft size={28} />
                    </button>
                  </div>

                  {/* Título (SIN EL RELOJ AL LADO) */}
                  <div className="mt-0 mb-8 flex items-center justify-center animate-fade-in-down">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                      Crear cuenta nueva
                    </h1>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-5 animate-fade-in"
                  >
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 font-medium shadow-sm border border-transparent focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 font-medium shadow-sm border border-transparent focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="w-full bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 font-medium shadow-sm border border-transparent focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 font-medium shadow-sm border border-transparent focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all outline-none pr-12"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 px-1 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setAcceptTerms(!acceptTerms)
                        }
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          acceptTerms
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "border-gray-400 bg-transparent"
                        }`}
                      >
                        {acceptTerms && (
                          <Check size={16} strokeWidth={3} />
                        )}
                      </button>
                      <span className="text-sm text-gray-600 font-medium">
                        Acepto los{" "}
                        <span className="font-bold text-gray-800">
                          Términos y Condiciones
                        </span>
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-6 bg-gradient-to-r from-[#FF9A6C] to-[#FF5E62] text-white py-4 rounded-3xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        "Crear cuenta"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#2A2A2A] rounded-r-md"></div>
            <div className="absolute -right-[3px] top-52 w-[3px] h-9 bg-[#2A2A2A] rounded-r-md"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 blur-[50px] -z-10 scale-95 translate-y-10"></div>
        </div>
      </div>

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}