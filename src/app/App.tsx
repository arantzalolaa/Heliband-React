import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { CreateAccountScreen } from "./components/CreateAccountScreen"; // Importamos el nuevo componente

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Ahora authView soporta 3 pantallas
  const [authView, setAuthView] = useState<
    "login" | "forgot-password" | "create-account"
  >("login");

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setAuthView("login");
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        username={username}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      {authView === "login" && (
        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={() =>
            setAuthView("forgot-password")
          }
          onCreateAccount={() => setAuthView("create-account")} // Navegar a Crear Cuenta
        />
      )}

      {authView === "forgot-password" && (
        <ForgotPasswordScreen
          onBack={() => setAuthView("login")}
        />
      )}

      {authView === "create-account" && (
        <CreateAccountScreen
          onBack={() => setAuthView("login")}
          onRegisterSuccess={() => setAuthView("login")} // Al terminar, volvemos al login
        />
      )}
    </>
  );
}
