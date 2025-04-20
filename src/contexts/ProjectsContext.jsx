import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { authFetch } = useAuth();
  const apiUrl = "https://localhost:7037/api/projects";
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await authFetch(apiUrl);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to fetch projects");
        return;
      }

      setProjects(data);
      return data;
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching projects");
    }
  };

  const fetchProjectById = async (projectId) => {
    try {
      const res = await authFetch(`${apiUrl}/${projectId}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to fetch project");
        return;
      }

      return data; // Returnerar det hämtade projektet
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching the project");
    }
  };

  const addProject = async (formData) => {
    try {
      const res = await authFetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to add project");
        return;
      }

      setProjects((prevProjects) => [...prevProjects, data]);
      return data;
    } catch (error) {
      console.error("Error adding project:", error);
      setErrorMessage("An error occurred while adding project");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const res = await authFetch(`${apiUrl}/${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      setErrorMessage("An error occurred while deleting the project");
      return false;
    }
  };

  const updateProject = async (projectUpdateForm) => {
    try {
      const res = await authFetch(apiUrl, {
        method: "PUT",
        body: projectUpdateForm,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update project");
      }

      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      setErrorMessage("An error occurred while updatingg the project");
      throw error;
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await authFetch("https://localhost:7037/api/status");
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to fetch statuses");
        return;
      }

      return data;
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching statuses");
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        errorMessage,
        fetchProjects,
        fetchProjectById,
        addProject,
        deleteProject,
        updateProject,
        fetchStatuses,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
