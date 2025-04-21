import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import { useProjects } from "../contexts/ProjectsContext";
import { useClients } from "../contexts/ClientsContext";
import { useFormik } from "formik";
import addProjectValidation from "../utilities/addProjectValidation";
import updateProjectValidation from "../utilities/updateProjectValidation";
import { useAuth } from "../contexts/AuthContext";

const Projects = () => {
  const {
    fetchProjects,
    addProject,
    fetchStatuses,
    updateProject,
    deleteProject,
  } = useProjects();
  const { fetchClients } = useClients();
  const { getAllUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [statuses, setStatuses] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectToUpdate, setProjectToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjects();
        console.log(data);
        setProjectsData(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      if (allUsers) {
        setUsers(allUsers);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAllStatuses = async () => {
      const allStatuses = await fetchStatuses();
      if (allStatuses) {
        setStatuses(allStatuses);
      }
    };

    fetchAllStatuses();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await fetchClients();
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    if (projectToUpdate) {
      console.log(projectToUpdate);
      formikUpdate.setValues({
        projectName: projectToUpdate.projectName || "",
        clientName: projectToUpdate.clientName || "",
        description: projectToUpdate.description || "",
        startDate: projectToUpdate.startDate || "",
        endDate: projectToUpdate.endDate || "",
        projectOwner: projectToUpdate.userId || "",
        budget: projectToUpdate.budget || "",
        image: null,
        statusId: projectToUpdate.statusName || "",
      });
    }
  }, [projectToUpdate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openUpdateModal = async (project) => {
    setProjectToUpdate(project);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setProjectToUpdate(null);
    setIsUpdateModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      projectName: "",
      clientName: "",
      description: "",
      startDate: "",
      endDate: "",
      projectOwner: "",
      budget: "",
      image: null,
    },
    validate: addProjectValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      // AI-genererad kod
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        const addedProject = await addProject(formData);
        if (addedProject) {
          alert("Project added successfully!");
          toggleModal();
        }
      } catch (error) {
        console.error("Error submitting project:", error);
      }
    },
  });

  const formikUpdate = useFormik({
    initialValues: {
      projectName: "",
      clientName: "",
      description: "",
      startDate: "",
      endDate: "",
      projectOwner: "",
      budget: "",
      image: null,
      statusId: "",
    },

    validate: updateProjectValidation,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("Id", projectToUpdate.id);
      console.log(`Projektets ID: ${projectToUpdate.id}`);
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        const updatedProject = await updateProject(formData);
        if (updatedProject) {
          alert("Project updated successfully!");
          closeUpdateModal();
        }
      } catch (error) {
        console.error("Error submitting project:", error);
      }
    },
  });

  return (
    <div>
      <div className="page">
        <div className="page-header">
          <h1>Projects</h1>
          <ModalButton type="add" onClick={toggleModal} text="+ Add Project" />
        </div>
        <div className="page-body">
          {projectsData.map((project) => (
            <div className="portalCard" key={project.id}>
              <div className="portalCard-header">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.projectName}
                    className="project-image"
                  />
                )}
                <h5>{project.projectName}</h5>
                <h7>{project.client.clientName}</h7>
              </div>
              <div className="portalCard-body">
                <p>{project.description}</p>
              </div>
              <div className="portalCard-footer">
                <small>
                  {/* AI-genererad kod för att få svensk datumformatering */}
                  Deadline:
                  {new Date(project.endDate).toLocaleDateString("sv-SE")}
                </small>
              </div>
              <button onClick={() => openUpdateModal(project)}>Update</button>
              <button onClick={() => deleteProject(project.id)}>Delete</button>
            </div>
          ))}
        </div>
        {isUpdateModalOpen && (
          <section className="modal">
            <div className="modal-content">
              <header className="modal-header">
                <button onClick={closeUpdateModal}>Close</button>
              </header>
              <form onSubmit={formikUpdate.handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  <input
                    name="NewImage"
                    className="form-input"
                    type="file"
                    onChange={(event) => {
                      formikUpdate.setFieldValue(
                        "NewImage",
                        event.currentTarget.files[0]
                      );
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    name="projectName"
                    className="form-input"
                    type="text"
                    placeholder="Enter project name"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.projectName}
                  ></input>
                  {formikUpdate.errors.projectName && (
                    <span className="validation-error">
                      {formikUpdate.errors.projectName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <select
                    name="clientId"
                    className="form-select"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.clientId}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.clientName}
                      </option>
                    ))}
                  </select>
                  {formikUpdate.errors.clientId && (
                    <span className="validation-error">
                      {formikUpdate.errors.clientId}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-input"
                    placeholder="Enter project description"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.description}
                  ></textarea>
                  {formikUpdate.errors.description && (
                    <span className="validation-error">
                      {formikUpdate.errors.description}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    name="startDate"
                    className="form-input"
                    type="date"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.startDate}
                  ></input>
                  {formikUpdate.errors.startDate && (
                    <span className="validation-error">
                      {formikUpdate.errors.startDate}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    name="endDate"
                    className="form-input"
                    type="date"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.endDate}
                  ></input>
                  {formikUpdate.errors.endDate && (
                    <span className="validation-error">
                      {formikUpdate.errors.endDate}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Project Owner</label>
                  <select
                    name="UserId"
                    className="form-select"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.UserId}
                  >
                    <option value="">Select Project Owner</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </option>
                    ))}
                  </select>
                  {formikUpdate.errors.UserId && (
                    <span className="validation-error">
                      {formikUpdate.errors.UserId}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Budget</label>
                  <input
                    name="budget"
                    className="form-input"
                    type="number"
                    placeholder="Enter project budget"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.budget}
                  ></input>
                  {formikUpdate.errors.budget && (
                    <span className="validation-error">
                      {formikUpdate.errors.budget}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="statusId"
                    className="form-select"
                    onChange={formikUpdate.handleChange}
                    value={formikUpdate.values.statusId}
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.statusName}
                      </option>
                    ))}
                  </select>
                  {formikUpdate.errors.statusId && (
                    <span className="validation-error">
                      {formikUpdate.errors.statusId}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn">
                  Update
                </button>
              </form>
            </div>
          </section>
        )}
        {/* AI-genererad kod för att spara tid med formik-validering*/}
        {isModalOpen && (
          <section className="modal">
            <div className="modal-content">
              <header className="modal-header">
                <button onClick={toggleModal}>Close</button>
              </header>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  <input
                    name="image"
                    className="form-input"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    name="projectName"
                    className="form-input"
                    type="text"
                    placeholder="Enter project name"
                    onChange={formik.handleChange}
                    value={formik.values.projectName}
                  ></input>
                  {formik.errors.projectName ? (
                    <span className="validation-error">
                      {formik.errors.projectName}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <select
                    name="clientId"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.clientId}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.clientName}
                      </option>
                    ))}
                  </select>
                  {formik.errors.clientId ? (
                    <span className="validation-error">
                      {formik.errors.clientId}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-input"
                    placeholder="Enter project description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  ></textarea>
                  {formik.errors.description ? (
                    <span className="validation-error">
                      {formik.errors.description}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    name="startDate"
                    className="form-input"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  ></input>
                  {formik.errors.startDate ? (
                    <span className="validation-error">
                      {formik.errors.startDate}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    name="endDate"
                    className="form-input"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                  ></input>
                  {formik.errors.endDate ? (
                    <span className="validation-error">
                      {formik.errors.endDate}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">Project Owner</label>
                  <select
                    name="UserId"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.UserId}
                  >
                    <option value="">Select Project Owner</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </option>
                    ))}
                  </select>
                  {formik.errors.UserId ? (
                    <span className="validation-error">
                      {formik.errors.UserId}
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label">Budget</label>
                  <input
                    name="budget"
                    className="form-input"
                    type="number"
                    placeholder="Enter project budget"
                    onChange={formik.handleChange}
                    value={formik.values.budget}
                  ></input>
                  {formik.errors.budget ? (
                    <span className="validation-error">
                      {formik.errors.budget}
                    </span>
                  ) : null}
                </div>
                <button type="submit" className="btn">
                  Create
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Projects;
