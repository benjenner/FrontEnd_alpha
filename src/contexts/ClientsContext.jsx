import { useState, useEffect, createContext } from "react";

export const ClientsContext = createContext();
export const ClientsProvider = ({ children }) => {
  const apiUri = "https://localhost:7037/api/clients";

  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const res = await fetch(apiUri);

      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch {}
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, getClients }}>
      {children}
    </ClientsContext.Provider>
  );
};
