import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, status } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Si aún está verificando el estado de autenticación, no hacer nada
    if (status === "checking") {
      return;
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      navigate(redirectTo, { replace: true });
      return;
    }

    // Si requiere ser admin pero el usuario no es admin (ID !== 0)
    if (adminOnly && user?.id !== 0) {
      // Redirigir al home o mostrar página de acceso denegado
      navigate("/", { replace: true });
      return;
    }
  }, [isAuthenticated, user, adminOnly, navigate, redirectTo, status]);

  // Si está verificando el estado, mostrar loading
  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se está redirigiendo)
  if (!isAuthenticated) {
    return null;
  }

  // Si requiere admin pero no es admin, no mostrar nada (se está redirigiendo)
  if (adminOnly && user?.id !== 0) {
    return null;
  }

  // Si todo está bien, mostrar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;