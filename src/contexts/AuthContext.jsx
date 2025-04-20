import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = "https://localhost:7037/api/appusers";

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState(null);

  // Sign Up
  const signUp = async () => {};

  // Sign In
  const signIn = async (email, password, isPersistent = false) => {
    try {
      const res = await fetch(`${apiUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isPersistent }),
      });

      const data = await res.json();

      if (!data.succeeded) {
        setErrorMessage(data.error);
        console.log("Data misslyckas ");
        return false;
      }

      setToken(data.token);
      setIsAdmin(data.isAdmin);
      setAdminKey(data.adminKey);
      return true;
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
      return false;
    }
  };

  // Sign out
  const signOut = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);

    if (adminKey !== null) {
      setAdminKey(null);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await authFetch(apiUrl);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to fetch users");
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("An error occurred while fetching users");
      return null;
    }
  };

  // Fetchar med autentierings-headers
  const authFetch = async (url, options = {}) => {
    const headers = options.headers ? { ...options.headers } : {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (isAdmin && adminKey) {
      headers["X-ADM-API-KEY"] = adminKey;
    }
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: {
          token,
          isAdmin,
          adminKey,
          user,
        },
        signUp,
        signIn,
        signOut,
        authFetch,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
