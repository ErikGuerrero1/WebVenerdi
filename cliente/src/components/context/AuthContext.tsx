import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

const AuthStatus = {
  checking: "checking",
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
} as const;

type AuthStatusType = (typeof AuthStatus)[keyof typeof AuthStatus];

interface AuthState {
  status: AuthStatusType;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;

  //Methods
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => void;
  //Aqui se agrega el registro de usuario
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    UserID: number;
    Name: string;
    Email: string;
    Phone: string;
    Address: string;
    PasswordHash: string;
    CreatedAt: string | null;
  };
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatusType>(
    AuthStatus.unauthenticated
  );
  const [user, setUser] = useState<User>();

  const loginWithEmailPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setStatus(AuthStatus.checking);

      const response = await fetch("http://localhost:3000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.detail ||
            "Credenciales incorrectas o error en la conexión"
        );
      }

      const responseData: LoginResponse = await response.json();

      // Verificar que la respuesta sea exitosa
      if (!responseData.success) {
        throw new Error("Login fallido");
      }

      // Guardar datos del usuario en el estado
      const userData: User = {
        id: responseData.data.UserID,
        name: responseData.data.Name,
        email: responseData.data.Email,
        phone: responseData.data.Phone,
        address: responseData.data.Address,
      };

      setUser(userData);
      setStatus(AuthStatus.authenticated);

      console.log("Login exitoso:", userData);
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setUser(undefined);
      setStatus(AuthStatus.unauthenticated);

      throw error;
    }
  };

  const logout = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
    console.log("Sesión cerrada");
  };

  return (
    <div data-testid="auth-provider">
      <AuthContext.Provider
        value={{
          status: status,
          user: user,
          //Getters
          isChecking: status === AuthStatus.checking,
          isAuthenticated: status === AuthStatus.authenticated,
          //Methods
          loginWithEmailPassword,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
