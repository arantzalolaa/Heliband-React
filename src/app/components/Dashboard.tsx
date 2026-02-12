import { useState, useEffect } from "react";
import {
  Shield,
  RefreshCw,
  Home,
  Clock,
  User,
  Wifi,
  Battery,
  Signal,
  Calculator,
  Sun,
  X,
} from "lucide-react";

import { HistoricalUV } from "./HistoricalUV";
import { Profile } from "./Profile";

interface DashboardProps {
  username?: string;
  onLogout: () => void;
}

export interface Recommendation {
  id: number;
  uv: number;
  message: string;
  timestamp: string;
  level: string;
}

export function Dashboard({
  username = "Usuario",
  onLogout,
}: DashboardProps) {
  const [currentView, setCurrentView] = useState<
    "home" | "history" | "profile"
  >("home");
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Estados
  const [currentUV, setCurrentUV] = useState(7.5);
  const [exposureTime, setExposureTime] = useState(45);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConnected] = useState(true); // Ya no se puede cambiar

  // Estado para mostrar/ocultar la recomendación flotante
  const [showRecommendation, setShowRecommendation] =
    useState(false);
  const [lastRecommendation, setLastRecommendation] =
  useState<Recommendation | null>(null);

  // Historial de recomendaciones
  const [recommendations, setRecommendations] = useState<
    Recommendation[]
  >([
    {
      id: 1,
      uv: 6.2,
      message: "Usa sombrero y busca sombra.",
      timestamp: "10 Feb, 09:30",
      level: "Moderado",
    },
    {
      id: 2,
      uv: 4.5,
      message: "Nivel seguro. Disfruta el exterior.",
      timestamp: "9 Feb, 14:15",
      level: "Bajo",
    },
  ]);

  // Fecha y hora actual
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto, no cada segundo
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  const maxSafeTime = 60;
  const exposurePercentage = (exposureTime / maxSafeTime) * 100;

  // Semáforo UV
  const getUVStatus = (uv: number) => {
    if (uv <= 2.9)
      return {
        label: "Bajo",
        from: "from-green-400",
        to: "to-green-500",
        textCol: "text-green-600",
        bg: "bg-green-50",
      };
    if (uv <= 5.9)
      return {
        label: "Moderado",
        from: "from-yellow-300",
        to: "to-yellow-500",
        textCol: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    if (uv <= 7.9)
      return {
        label: "Alto",
        from: "from-orange-400",
        to: "to-red-500",
        textCol: "text-[#FF5E62]",
        bg: "bg-orange-50",
      };
    return {
      label: "Muy alto",
      from: "from-red-500",
      to: "to-rose-600",
      textCol: "text-rose-600",
      bg: "bg-red-50",
    };
  };
  const uvStatus = getUVStatus(currentUV);

  const getRecommendationText = (uv: number) => {
    if (uv < 3) return "Nivel seguro. Disfruta el exterior.";
    if (uv < 6) return "Usa sombrero y busca sombra.";
    return "¡Alerta! Aplica protector solar FPS 50+.";
  };

  // Scroll Menú
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastScrollY && currentScrollY > 20)
      setIsMenuVisible(false);
    else if (currentScrollY < lastScrollY)
      setIsMenuVisible(true);
    setLastScrollY(currentScrollY);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newUV = +(Math.random() * 10 + 1).toFixed(1);
      setCurrentUV(newUV);
      setIsRefreshing(false);

      // Mostrar recomendación flotante
      setShowRecommendation(true);

      // Agregar al historial
      const newRec: Recommendation = {
        id: Date.now(),
        uv: newUV,
        message: getRecommendationText(newUV),
        timestamp:
          formatDate(new Date()) +
          ", " +
          formatTime(new Date()),
        level: getUVStatus(newUV).label,
      };
      setRecommendations((prev) => [newRec, ...prev]);
    }, 1500);
  };

  const handleCalculateRisk = () => {
    // Simulación sin toast
    console.log("Calculando riesgo...");
  };

  // --- VISTA INICIO AJUSTADA ---
  const HomeContent = () => (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-32 animate-fade-in">
      {/* Header con fecha y hora */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <Sun
              className="text-orange-500 fill-orange-500/20"
              size={26}
            />
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Inicio
            </h1>
          </div>
          <p className="text-xs text-gray-500 font-medium pl-1">
            Hola, {username}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right mr-1">
            <p className="text-xs font-bold text-gray-700">
              {formatTime(currentTime)}
            </p>
            <p className="text-[10px] text-gray-400">
              {formatDate(currentTime)}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl bg-white shadow-sm border border-orange-100 hover:bg-orange-50 transition-all active:scale-95 ${isRefreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={18} className="text-orange-500" />
          </button>
        </div>
      </div>

      {/* Recomendación flotante (aparece al hacer refresh) */}
      {showRecommendation && (
        <div className="mb-4 animate-slide-down">
          <div
            className={`${uvStatus.bg} rounded-2xl p-4 shadow-lg border-2 border-orange-200 flex items-start gap-3 relative`}
          >
            <div className="bg-white p-2.5 rounded-full shadow-sm text-orange-500 shrink-0">
              <Shield
                size={20}
                fill="currentColor"
                className="opacity-20"
              />
              <Shield
                size={20}
                className="absolute mt-[-20px]"
              />
            </div>
            <div className="flex-1">
              <p className="text-orange-600/70 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                RECOMENDACIÓN ACTUAL
              </p>
              <p className="text-gray-800 font-semibold text-xs leading-snug">
                {getRecommendationText(currentUV)}
              </p>
              <p className="text-gray-500 text-[10px] mt-1">
                UV: {currentUV} • {uvStatus.label}
              </p>
            </div>
            <button
              onClick={() => {
                const closedRec: Recommendation = {
                  id: Date.now(),
                  uv: currentUV,
                  message: getRecommendationText(currentUV),
                  timestamp:
                    formatDate(new Date()) +
                    ", " +
                    formatTime(new Date()),
                  level: uvStatus.label,
                };

                setLastRecommendation(closedRec);
                setShowRecommendation(false);
              }}
              className="p-1 rounded-full hover:bg-white/50 transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* GAUGE UV */}
      <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-gray-200/60 mb-4 border border-white relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-100/50">
        <div className="flex flex-col items-center justify-center pt-1">
          <div
            className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${uvStatus.from} ${uvStatus.to} shadow-[0_15px_30px_-10px_rgba(255,100,50,0.3)] flex items-center justify-center mb-3 transform transition-all duration-1000 group cursor-default`}
          >
            <div className="absolute top-0 right-0 w-full h-full rounded-full bg-gradient-to-bl from-white/40 to-transparent pointer-events-none"></div>
            <div className="text-center text-black z-10 drop-shadow-md">
              <span className="text-5xl font-bold tracking-tighter leading-none">
                {currentUV}
              </span>
            </div>
          </div>

          <div className="text-center mb-4">
            <span className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
              ÍNDICE UV ACTUAL
            </span>
            <div
              className={`text-xl font-bold mt-0.5 transition-colors duration-500 ${uvStatus.textCol}`}
            >
              {uvStatus.label}
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex justify-between text-[10px] font-medium mb-1.5 px-1">
              <span className="text-gray-400">Exposición</span>
              <span className="text-gray-600">
                {exposureTime} / {maxSafeTime} min
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200/70 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${uvStatus.from} ${uvStatus.to} rounded-full shadow-sm transition-all duration-1000 ease-out`}
                style={{ width: `${exposurePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* ÚLTIMA RECOMENDACIÓN */}
      {lastRecommendation && (
        <div className="bg-white rounded-2xl p-4 shadow-lg shadow-orange-100/40 border border-orange-100 mb-4 animate-fade-in">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
              Última recomendación
            </p>
            <span className="text-[10px] text-gray-400">
              {lastRecommendation.timestamp}
            </span>
          </div>
      
          <p className="text-sm text-gray-800 font-semibold leading-snug mt-1">
            {lastRecommendation.message}
          </p>
      
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-gray-500">
              UV: {lastRecommendation.uv}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold">
              {lastRecommendation.level}
            </span>
          </div>
        </div>
      )}

      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={handleCalculateRisk}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-gray-900/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5"
        >
          <Calculator size={18} className="text-orange-400" />
          <span>Calcular riesgo personal</span>
        </button>

        {/* Pulsera conectada - SOLO INDICADOR VISUAL SIN FONDO */}
        <div className="w-full py-3 flex items-center justify-center gap-2.5">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${isConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-300"}`}
          ></div>
          <Wifi
            size={14}
            className={`transition-colors ${isConnected ? "text-green-600" : "text-gray-400"}`}
          />
          <span
            className={`text-xs font-bold transition-colors ${isConnected ? "text-gray-700" : "text-gray-400"}`}
          >
            {isConnected
              ? "Pulsera conectada"
              : "Pulsera desconectada"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#E0E0E0] flex items-center justify-center overflow-hidden font-sans text-gray-800">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
      <div className="transform scale-[0.85] md:scale-90 transition-transform duration-300">
        <div className="relative">
          <div className="relative bg-[#1A1A1A] rounded-[3rem] p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] ring-4 ring-gray-300/50">
            <div className="bg-black rounded-[2.8rem] p-1.5 relative overflow-hidden">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 ring-2 ring-[#222]"></div>

              <div className="relative bg-[#FFFBF2] rounded-[2.3rem] overflow-hidden w-[360px] h-[800px] flex flex-col shadow-inner">
                <div className="absolute top-0 left-0 right-0 h-14 z-40 flex items-center justify-between px-6 pt-4 pointer-events-none">
                  <span className="text-sm font-semibold text-gray-800 ml-2">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex items-center gap-2 text-gray-800 mr-2">
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

                <div
                  className="flex-1 overflow-y-auto pt-4 hide-scroll"
                  onScroll={handleScroll}
                >
                  {currentView === "home" && <HomeContent />}
                  {currentView === "history" && (
                    <HistoricalUV
                      recommendations={recommendations}
                    />
                  )}
                  {currentView === "profile" && (
                    <Profile
                      username={username}
                      onLogout={onLogout}
                    />
                  )}
                </div>

                <div
                  className={`absolute bottom-5 left-6 right-6 z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuVisible ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"}`}
                >
                  <div className="bg-white px-2 py-3 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-gray-50 flex justify-around items-center">
                    <button
                      onClick={() => setCurrentView("home")}
                      className="flex flex-col items-center gap-1 w-16 group"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${currentView === "home" ? "bg-[#FFEDE1] text-orange-600" : "bg-transparent text-gray-400 group-hover:bg-gray-50"}`}
                      >
                        <Home
                          size={24}
                          strokeWidth={
                            currentView === "home" ? 2.5 : 2
                          }
                        />
                      </div>
                    </button>
                    <button
                      onClick={() => setCurrentView("history")}
                      className="flex flex-col items-center gap-1 w-16 group"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${currentView === "history" ? "bg-[#FFEDE1] text-orange-600" : "bg-transparent text-gray-400 group-hover:bg-gray-50"}`}
                      >
                        <Clock
                          size={24}
                          strokeWidth={
                            currentView === "history" ? 2.5 : 2
                          }
                        />
                      </div>
                    </button>
                    <button
                      onClick={() => setCurrentView("profile")}
                      className="flex flex-col items-center gap-1 w-16 group"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${currentView === "profile" ? "bg-[#FFEDE1] text-orange-600" : "bg-transparent text-gray-400 group-hover:bg-gray-50"}`}
                      >
                        <User
                          size={24}
                          strokeWidth={
                            currentView === "profile" ? 2.5 : 2
                          }
                        />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-300/80 rounded-full z-40"></div>
              </div>
            </div>
            <div className="absolute -right-[3px] top-40 w-[3px] h-14 bg-[#2A2A2A] rounded-r-md"></div>
            <div className="absolute -right-[3px] top-60 w-[3px] h-9 bg-[#2A2A2A] rounded-r-md"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 blur-[40px] -z-10 scale-95 translate-y-8"></div>
        </div>
      </div>
    </div>
  );
}