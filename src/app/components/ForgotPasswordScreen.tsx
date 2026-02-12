import { useState, useRef } from "react";
import {
  ArrowLeft,
  Mail,
  Sun,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Battery,
  Signal,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPasswordScreen({
  onBack,
}: ForgotPasswordProps) {
  // Ahora tenemos 4 pasos: email -> code -> new-password -> success
  const [step, setStep] = useState<
    "email" | "code" | "new-password" | "success"
  >("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para la nueva contraseña
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  // --- PASO 1: ENVIAR CORREO ---
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
      toast.success("Código enviado", {
        description: `Revisa tu bandeja de entrada en ${email}`,
      });
    }, 1500);
  };

  // --- PASO 2: VERIFICAR CÓDIGO ---
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length < 4) {
      toast.error("Completa el código de 4 dígitos");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("new-password"); // AHORA VAMOS A LA PANTALLA DE NUEVA CONTRASEÑA
      toast.success("Código correcto");
    }, 1500);
  };

  // --- PASO 3: GUARDAR NUEVA CONTRASEÑA ---
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error(
        "La contraseña debe tener al menos 6 caracteres",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success"); // FINALMENTE AL ÉXITO
      toast.success("Contraseña actualizada correctamente");
    }, 1500);
  };

  // --- UTILIDADES ---
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#E0E0E0] flex items-center justify-center overflow-hidden font-sans text-gray-800">
      <div className="transform scale-[0.85] md:scale-90 transition-transform duration-300">
        {/* --- MARCO DE ANDROID --- */}
        <div className="relative">
          <div className="relative bg-[#1A1A1A] rounded-[3rem] p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] ring-4 ring-gray-300/50">
            <div className="bg-black rounded-[2.8rem] p-1.5 relative overflow-hidden">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 ring-2 ring-[#222]"></div>

              <div className="relative bg-gradient-to-b from-[#FFF8E7] via-[#FFE4C4] to-[#FFF8F0] rounded-[2.3rem] overflow-hidden w-[360px] h-[800px] flex flex-col shadow-inner">
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

                <div className="flex-1 flex flex-col px-8 pt-16 w-full relative">
                  {/* Botón Atrás (Solo si no estamos en éxito) */}
                  {step !== "success" && (
                    <button
                      onClick={
                        step === "email"
                          ? onBack
                          : () =>
                              setStep(
                                step === "new-password"
                                  ? "code"
                                  : "email",
                              )
                      }
                      className="absolute top-16 left-6 p-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 z-10"
                    >
                      <ArrowLeft size={28} />
                    </button>
                  )}

                  {/* Icono del Sol (Solo en los primeros pasos) */}
                  {step !== "success" && (
                    <div className="mt-16 mb-6 flex justify-center animate-fade-in-down">
                      <div className="bg-orange-400/20 p-4 rounded-full backdrop-blur-sm">
                        <Sun
                          className="text-orange-500 w-16 h-16 drop-shadow-md"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  )}

                  {/* --- VISTA 1: EMAIL --- */}
                  {step === "email" && (
                    <div className="animate-fade-in flex flex-col items-center text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Recuperar contraseña
                      </h2>
                      <p className="text-gray-600 text-sm mb-10 px-4 leading-relaxed">
                        Ingresa el correo electrónico asociado a
                        tu cuenta.
                      </p>
                      <form
                        onSubmit={handleSendEmail}
                        className="w-full space-y-6"
                      >
                        <div className="space-y-2 text-left">
                          <label className="text-xs font-bold text-gray-500 uppercase ml-4">
                            Correo electrónico
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="hola@ejemplo.com"
                              value={email}
                              onChange={(e) =>
                                setEmail(e.target.value)
                              }
                              className="w-full bg-white/80 backdrop-blur-md rounded-3xl px-6 py-4 text-gray-800 shadow-sm border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium pl-12"
                            />
                            <Mail
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading || !email}
                          className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#FF4D4D] text-white py-4 rounded-3xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                          {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Enviar código"
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* --- VISTA 2: CÓDIGO --- */}
                  {step === "code" && (
                    <div className="animate-fade-in flex flex-col items-center text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Verificar código
                      </h2>
                      <p className="text-gray-600 text-sm mb-8 px-2">
                        Ingresa el código de 4 dígitos enviado a{" "}
                        <br />{" "}
                        <span className="font-bold text-gray-800">
                          {email}
                        </span>
                      </p>
                      <form
                        onSubmit={handleVerifyCode}
                        className="w-full space-y-8"
                      >
                        <div className="flex justify-center gap-3">
                          {code.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) =>
                                (codeInputs.current[index] = el)
                              }
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleCodeChange(
                                  index,
                                  e.target.value,
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(index, e)
                              }
                              className="w-14 h-16 bg-white rounded-2xl text-center text-2xl font-bold text-gray-800 border-2 border-orange-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm"
                            />
                          ))}
                        </div>
                        <button
                          type="submit"
                          disabled={
                            isLoading || code.some((d) => !d)
                          }
                          className="w-full bg-gray-900 text-white py-4 rounded-3xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Verificar"
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* --- VISTA 3: NUEVA CONTRASEÑA (NUEVO) --- */}
                  {step === "new-password" && (
                    <div className="animate-fade-in flex flex-col items-center text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Crear contraseña
                      </h2>
                      <p className="text-gray-600 text-sm mb-8 px-2">
                        Tu nueva contraseña debe ser diferente a
                        las utilizadas anteriormente.
                      </p>

                      <form
                        onSubmit={handleResetPassword}
                        className="w-full space-y-5"
                      >
                        {/* Input Nueva */}
                        <div className="space-y-2 text-left">
                          <label className="text-xs font-bold text-gray-500 uppercase ml-4">
                            Nueva contraseña
                          </label>
                          <div className="relative">
                            <input
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Mínimo 6 caracteres"
                              value={newPassword}
                              onChange={(e) =>
                                setNewPassword(e.target.value)
                              }
                              className="w-full bg-white/80 backdrop-blur-md rounded-3xl px-6 py-4 text-gray-800 shadow-sm border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium pl-12"
                            />
                            <Lock
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword(!showPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Input Confirmar */}
                        <div className="space-y-2 text-left">
                          <label className="text-xs font-bold text-gray-500 uppercase ml-4">
                            Confirmar Contraseña
                          </label>
                          <div className="relative">
                            <input
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Repite la contraseña"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white/80 backdrop-blur-md rounded-3xl px-6 py-4 text-gray-800 shadow-sm border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium pl-12"
                            />
                            <Lock
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={
                            isLoading ||
                            !newPassword ||
                            !confirmPassword
                          }
                          className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#FF4D4D] text-white py-4 rounded-3xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                          {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Restablecer"
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* --- VISTA 4: ÉXITO --- */}
                  {step === "success" && (
                    <div className="animate-fade-in flex flex-col items-center text-center pt-24">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-sm animate-bounce-short border-4 border-white">
                        <CheckCircle
                          size={48}
                          strokeWidth={2.5}
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Todo listo!
                      </h2>
                      <p className="text-gray-600 text-sm mb-12 px-6">
                        Tu contraseña ha sido restablecida
                        exitosamente. Ya puedes acceder a tu
                        cuenta.
                      </p>

                      <button
                        onClick={onBack}
                        className="w-full bg-gray-900 text-white py-4 rounded-3xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.02] transition-all"
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botones Físicos */}
            <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#2A2A2A] rounded-r-md"></div>
            <div className="absolute -right-[3px] top-52 w-[3px] h-9 bg-[#2A2A2A] rounded-r-md"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 blur-[50px] -z-10 scale-95 translate-y-10"></div>
        </div>
      </div>

      <style>{`
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-bounce-short { animation: bounceShort 1s infinite; }
        @keyframes bounceShort { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}