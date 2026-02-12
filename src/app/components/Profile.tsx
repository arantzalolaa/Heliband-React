import { useState } from "react";
import {
  User,
  Bell,
  Droplets,
  Settings,
  LogOut,
  Edit3,
  Shield,
  ChevronRight,
  X,
  ChevronDown,
  ScanLine,
  ChevronLeft,
} from "lucide-react";

interface ProfileProps {
  username: string;
  onLogout: () => void;
}

export function Profile({ username, onLogout }: ProfileProps) {
  const skinTypes = [
    {
      type: "Tipo I (Muy Clara)",
      description: "Siempre se quema, nunca se broncea",
    },
    {
      type: "Tipo II (Clara)",
      description: "Se quema fácilmente, bronceado mínimo",
    },
    {
      type: "Tipo III (Trigueña)",
      description: "Se broncea moderadamente, puede quemarse",
    },
    {
      type: "Tipo IV (Morena Clara)",
      description: "Se broncea bien, rara vez se quema",
    },
    {
      type: "Tipo V (Morena)",
      description:
        "Se broncea con facilidad, muy rara vez se quema",
    },
    {
      type: "Tipo VI (Muy Oscura)",
      description: "Nunca se quema, siempre se broncea",
    },
  ];

  const [profile, setProfile] = useState({
    skinTypeIndex: 2,
    spf: 50,
    notifications: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // --- LÓGICA DE SIMULACIÓN ---
  const startCamera = () => {
    setShowCamera(true);
  };

  const stopCamera = () => {
    setShowCamera(false);
    setIsScanning(false);
  };

  const handleScanSkin = () => {
    setIsScanning(true);
    setTimeout(() => {
      const detectedIndex = Math.floor(Math.random() * 3) + 1;
      setProfile((prev) => ({
        ...prev,
        skinTypeIndex: detectedIndex,
      }));
      setIsScanning(false);
      stopCamera();
      // Análisis completado sin notificación
    }, 3000);
  };

  // --- HANDLERS ---
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newIndex = parseInt(e.target.value);
    setProfile({ ...profile, skinTypeIndex: newIndex });
  };

  const spfOptions = [15, 30, 50, 70, 100];

  const handleIncreaseSPF = () => {
    const currentIndex = spfOptions.indexOf(profile.spf);
    const nextIndex =
      currentIndex < spfOptions.length - 1 ? currentIndex + 1 : currentIndex;
    setProfile({ ...profile, spf: spfOptions[nextIndex] });
  };

  const handleDecreaseSPF = () => {
    const currentIndex = spfOptions.indexOf(profile.spf);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setProfile({ ...profile, spf: spfOptions[prevIndex] });
  };

  const handleToggleNotifications = () => {
    setProfile({
      ...profile,
      notifications: !profile.notifications,
    });
  };

  const handleLogoutClick = () => {
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  return (
    // CAMBIO: Padding ajustado (px-6 pt-10 pb-32) para coincidir con Inicio/Historial
    <div className="flex-1 flex flex-col px-6 pt-10 pb-32 animate-fade-in relative">
      {/* HEADER: Estilo unificado (Izquierda) */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <User
              className="text-orange-500 fill-orange-500/20"
              size={26}
            />
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Perfil
            </h1>
          </div>
          <p className="text-xs text-gray-500 font-medium pl-1">
            Cuenta y configuración
          </p>
        </div>

        {/* Botón Editar con el estilo de los botones de acción */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2.5 rounded-xl bg-white shadow-sm border border-orange-100 hover:bg-orange-50 transition-all active:scale-95 ${isEditing ? "bg-orange-50 border-orange-200 text-orange-600" : "text-gray-400"}`}
        >
          <Edit3 size={18} />
        </button>
      </div>

      {/* TARJETA USUARIO: Estilo "Premium" (shadow-xl, rounded-[2rem]) */}
      <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-gray-200/60 mb-5 border border-white relative overflow-hidden transition-all duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md text-white text-2xl font-medium shrink-0">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl text-gray-800 font-bold truncate">
              {username}
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Cuenta activa
            </p>
          </div>
        </div>

        {/* Selector de Piel */}
        <div className="mb-2">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 block ml-1">
            TU TIPO DE PIEL
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                <Droplets size={18} />
              </div>
              <select
                value={profile.skinTypeIndex}
                onChange={handleSelectChange}
                className="w-full appearance-none bg-gray-50 border border-gray-100 text-gray-700 py-3 pl-10 pr-8 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all font-bold text-sm"
              >
                {skinTypes.map((skin, index) => (
                  <option key={index} value={index}>
                    {skin.type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
            <button
              onClick={startCamera}
              className="bg-orange-500 text-white p-3 rounded-2xl shadow-md hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center aspect-square"
            >
              <ScanLine size={20} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 ml-1 italic truncate">
            {skinTypes[profile.skinTypeIndex].description}
          </p>
        </div>
      </div>

      {/* OTRAS OPCIONES */}
      <div className="space-y-3 mb-6">
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="bg-green-50 p-2.5 rounded-full">
            <Shield className="text-green-500" size={18} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
              FPS ACTUAL
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={handleDecreaseSPF}
                disabled={spfOptions.indexOf(profile.spf) === 0}
                className={`p-2 rounded-xl transition-all ${
                  spfOptions.indexOf(profile.spf) === 0
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl text-gray-800 font-bold">
                  {profile.spf}+
                </p>
              </div>
              <button
                onClick={handleIncreaseSPF}
                disabled={spfOptions.indexOf(profile.spf) === spfOptions.length - 1}
                className={`p-2 rounded-xl transition-all ${
                  spfOptions.indexOf(profile.spf) === spfOptions.length - 1
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 p-2.5 rounded-full">
              <Bell className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="text-gray-800 font-bold text-sm">
                Notificaciones
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                Alertas activas
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleNotifications}
            className={`w-11 h-6 rounded-full flex items-center transition-all p-1 ${profile.notifications ? "bg-orange-500" : "bg-gray-200"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${profile.notifications ? "translate-x-5" : "translate-x-0"}`}
            ></div>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => console.log("Configuración de pulsera")}
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-between group active:bg-gray-50 transition-colors shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <Settings className="text-gray-400" size={18} />
            <span className="text-sm text-gray-600 font-medium">
              Configuración de pulsera
            </span>
          </div>
          <ChevronRight className="text-gray-300" size={18} />
        </button>

        {/* Botón Cerrar Sesión */}
        <button
          onClick={handleLogoutClick}
          className="w-full bg-red-50 rounded-2xl p-4 flex items-center justify-between group active:bg-red-100 transition-colors border border-red-100"
        >
          <div className="flex items-center gap-3">
            <LogOut className="text-red-500" size={18} />
            <span className="text-sm text-red-600 font-bold">
              Cerrar sesión
            </span>
          </div>
        </button>
      </div>

      {/* --- MODAL SIMULACIÓN CÁMARA --- */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="absolute top-4 left-0 right-0 p-4 flex justify-between items-center z-20">
            <button
              onClick={stopCamera}
              className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/60"
            >
              <X size={24} />
            </button>
            <span className="text-white font-medium bg-black/40 px-3 py-1 rounded-full text-sm backdrop-blur-md">
              Escáner IA
            </span>
            <div className="w-10"></div>
          </div>
          <div className="w-full h-full relative flex items-center justify-center bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <User
                size={300}
                className="text-white"
                strokeWidth={0.5}
              />
            </div>
            <div className="relative w-64 h-80 border-2 border-white/40 rounded-[2rem] z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-xl"></div>
              {isScanning && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)] animate-scan z-20"></div>
              )}
            </div>
            <p className="absolute bottom-32 text-white/90 text-sm font-medium z-10 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
              {isScanning
                ? "Analizando pigmentación..."
                : "Alinea tu rostro en el marco"}
            </p>
          </div>
          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center z-20">
            <button
              onClick={handleScanSkin}
              disabled={isScanning}
              className={`w-20 h-20 p-1.5 rounded-full border-[5px] border-white flex items-center justify-center transition-all active:scale-95 ${isScanning ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:scale-105 hover:bg-white/10"}`}
            >
              <div className="w-full h-full bg-white rounded-full shadow-lg"></div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}