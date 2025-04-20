import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { ClientProvider } from "./contexts/ClientsContext";

const Providers = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <ProjectsProvider>
          <ClientProvider>{children}</ClientProvider>
        </ProjectsProvider>
      </AuthProvider>
    </>
  );
};

export default Providers;
