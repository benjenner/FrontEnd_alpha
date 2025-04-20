import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const { authFetch } = useAuth();
  const apiUrl = "https://localhost:7037/api/clients";
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await authFetch(apiUrl);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to fetch clients");
        return;
      }

      setClients(data);
      return data;
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching clients");
    }
  };

  const addClient = async (formData) => {};

  const deleteClient = async (clientId) => {};

  const updateClient = async (clientId, updatedData) => {};

  return (
    <ClientContext.Provider
      value={{
        clients,
        errorMessage,
        fetchClients,
        addClient,
        deleteClient,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => useContext(ClientContext);
