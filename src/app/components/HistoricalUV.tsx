import { useState } from "react";
import {
  Clock,
  TrendingUp,
  Download,
  Calendar,
  Sun,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { Recommendation } from "./Dashboard";

interface HistoricalUVProps {
  recommendations: Recommendation[];
}

export function HistoricalUV({ recommendations }: HistoricalUVProps) {
  const weeklyData = [
    { day: "L", minutes: 15, uv: 4.2, fullDay: "Lunes" },
    { day: "M", minutes: 25, uv: 6.5, fullDay: "Martes" },
    { day: "X", minutes: 50, uv: 7.8, fullDay: "Miércoles" },
    { day: "J", minutes: 40, uv: 6.2, fullDay: "Jueves" },
    { day: "V", minutes: 55, uv: 8.5, fullDay: "Viernes" },
    { day: "S", minutes: 30, uv: 5.3, fullDay: "Sábado" },
    { day: "D", minutes: 35, uv: 6.8, fullDay: "Domingo" },
  ];

  const [selectedDay, setSelectedDay] = useState<number | null>(
    null,
  );

  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  const getBarColor = (minutes: number, index: number) => {
    // BARRA NEGRA AL SELECCIONAR (Esto se queda)
    if (selectedDay === index) return "#6a6e73";

    if (minutes < 20) return "#4ADE80";
    if (minutes < 40) return "#FACC15";
    return "#FF5E62";
  };

  const getUVStatus = (uv: number) => {
    if (uv <= 2.9)
      return {
        label: "Bajo",
        textCol: "text-green-600",
        bg: "bg-green-50",
      };
    if (uv <= 5.9)
      return {
        label: "Moderado",
        textCol: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    if (uv <= 7.9)
      return {
        label: "Alto",
        textCol: "text-[#FF5E62]",
        bg: "bg-orange-50",
      };
    return {
      label: "Muy alto",
      textCol: "text-rose-600",
      bg: "bg-red-50",
    };
  };

  const avgDailyExposure = Math.round(
    weeklyData.reduce((sum, day) => sum + day.minutes, 0) /
      weeklyData.length,
  );

  const totalMinutes = weeklyData.reduce(
    (sum, day) => sum + day.minutes,
    0,
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleBarClick = (index: number) => {
    setSelectedDay(index === selectedDay ? null : index);
  };

  const handleDownloadReport = () => {
    console.log("Generando PDF...");
  };

  const handleViewCalendar = () => {
    console.log("Mostrando vista mensual...");
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-32 animate-fade-in">
      {/* HEADER: Alineado con Inicio */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <Clock
              className="text-orange-500 fill-orange-500/20"
              size={26}
            />
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Historial
            </h1>
          </div>
          <p className="text-xs text-gray-500 font-medium pl-1">
            Resumen semanal
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleViewCalendar}
            className="p-2.5 rounded-xl bg-white shadow-sm border border-orange-100 hover:bg-orange-50 transition-all active:scale-95 text-orange-500"
          >
            <Calendar size={18} />
          </button>
          <button
            onClick={handleDownloadReport}
            className="p-2.5 rounded-xl bg-white shadow-sm border border-orange-100 hover:bg-orange-50 transition-all active:scale-95 text-orange-500"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* TARJETA GRÁFICA */}
      <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-gray-200/60 mb-5 border border-white relative overflow-hidden transition-all duration-500">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            EXPOSICIÓN UV
          </h2>
          <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            <TrendingUp size={12} className="text-green-600" />
            <span className="text-[10px] font-bold text-green-700">
              +12% vs semana pasada
            </span>
          </div>
        </div>

        <div className="h-60 w-full mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{
                top: 10,
                right: 0,
                left: -25,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
              />
              <Tooltip
                cursor={{ fill: "#F3F4F6", radius: 4 }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="minutes"
                radius={[6, 6, 6, 6]}
                barSize={20}
                cursor="pointer"
                onClick={(_, index) => handleBarClick(index)}
                animationDuration={1500}
              >
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.minutes, index)}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- DETALLES DÍA SELECCIONADO (MÁS GRANDE) --- */}
      {selectedDay !== null && (
        <div className="w-full bg-orange-50 rounded-2xl p-4 shadow-sm border border-orange-100/50 flex items-center justify-between mb-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm text-orange-500">
              <Sun size={28} className="fill-orange-500/20" />
            </div>

            {/* Contenedor de textos */}
            <div className="flex flex-col">
              <p className="text-orange-600/70 text-xs font-bold uppercase tracking-wider mb-0.5">
                {weeklyData[selectedDay].fullDay}
              </p>

              {/* Minutos */}
              <p className="text-gray-800 font-bold text-[17px]">
                {weeklyData[selectedDay].minutes} min
              </p>

              {/* UV máx (Ahora abajo) */}
              <p className="text-gray-500 text-[15px] font-bold">
                UV máx {weeklyData[selectedDay].uv}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedDay(null)}
            className="text-sm font-medium text-orange-600 hover:text-orange-700 px-4 py-2 bg-white/50 rounded-xl transition-colors active:scale-95"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            PROMEDIO DIARIO
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl text-gray-800 font-bold tracking-tight">
              {avgDailyExposure}
            </p>
            <span className="text-xs text-gray-500 font-medium">
              min
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            TOTAL SEMANA
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl text-gray-800 font-bold tracking-tight">
              {hours}h {minutes}m
            </p>
          </div>
        </div>
      </div>

      {/* HISTORIAL DE RECOMENDACIONES */}
      {recommendations.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Historial de recomendaciones
            </h3>
          </div>
          <div className="space-y-2">
            {recommendations.slice(0, showAllRecommendations ? recommendations.length : 3).map((rec) => {
              const recStatus = getUVStatus(rec.uv);
              return (
                <div
                  key={rec.id}
                  className={`${recStatus.bg} rounded-xl p-3 border border-gray-100 shadow-sm`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-[10px] font-bold ${recStatus.textCol}`}>
                      {rec.level} • UV {rec.uv}
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium">
                      {rec.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium">{rec.message}</p>
                </div>
              );
            })}
          </div>
          {recommendations.length > 3 && (
            <button
              onClick={() => setShowAllRecommendations(!showAllRecommendations)}
              className="w-full mt-2 py-2 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center justify-center gap-1 transition-colors"
            >
              {showAllRecommendations ? "Ver menos" : `Ver más (${recommendations.length - 3})`}
              <ChevronDown 
                size={14} 
                className={`transform transition-transform ${showAllRecommendations ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
