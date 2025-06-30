import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography } from "@mui/material";

import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
import CommonTable from "../../components/reusablecomponents/CommonTable";
import SearchIcon from "@mui/icons-material/Search";
import nofound from "../../assets/no-data2.gif";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CommonFilter from "../../components/reusablecomponents/CommonModel/CommonFilterModel";
import {
  createProjects,
  getAllProjects,
} from "../../services/project/ProjectServices";
import { getAllTasksForUser } from "../../services/Task/TaskServices";
import UserProjectCard from "../../components/projects/UserProject/UserProjectCard";

// API Base URL
const API_BASE_URL = "http://localhost:7000/project";

const Project = () => {
  const [addEditModal, setAddEditModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    startDate: null,
    endDate: null,
    pipelineStage: "",
  });

  // Get user info from localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role") || "Member";
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [projects, setProjects] = useState([]);
  const [projectsWithTasks, setProjectsWithTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("projects"); // "projects" or "tasks"

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
    pipelineStage: Yup.string().required("Pipeline Stage is required"),
  });

  const filterValidationSchema = Yup.object({
    priority: Yup.string(),
    startDate: Yup.date().nullable(),
    endDate: Yup.date().nullable(),
    pipelineStage: Yup.string(),
  });

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const pipelineStageOptions = [
    { value: "Develop", label: "Develop" },
    { value: "Completed", label: "Completed" },
  ];

  const initialValues = {
    projectName: "",
    description: "",
    priority: "",
    startDate: new Date(),
    endDate: new Date(),
    pipelineStage: "",
    status: "Active",
  };

  // Helper function to transform API data
  const transformProjectData = (projects) => {
    return projects.map((project) => ({
      id: project._id,
      projectName: project.projectName,
      discription: project.description,
      priority: project.projectPriority || "Medium",
      startDate: new Date(project.projectStartDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      endDate: project.projectDueDate
        ? new Date(project.projectDueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      status: project.status || "Active",
      pipelineStage: project.pipeLine,
    }));
  };

  // Helper function to group tasks by project
  const groupTasksByProject = (tasks) => {
    const projectMap = new Map();

    tasks.forEach((task) => {
      const project = task.projectId;
      const projectId = project._id;

      if (!projectMap.has(projectId)) {
        projectMap.set(projectId, {
          projectId: projectId,
          projectName: project.projectName,
          description: project.description,
          projectPriority: project.projectPriority,
          projectStartDate: new Date(
            project.projectStartDate
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          projectDueDate: project.projectDueDate
            ? new Date(project.projectDueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          pipeLine: project.pipeLine,
          tasks: [],
          taskCount: 0,
        });
      }

      const projectData = projectMap.get(projectId);
      projectData.tasks.push({
        taskId: task._id,
        taskTitle: task.taskTitle,
        description: task.description,
        status: task.status,
        taskDueDate: new Date(task.TaskDueDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        taskPriority: task.taskPriority,
        assignedTo: task.assignedTo,
        assignedDate: task.assignedDate
          ? new Date(task.assignedDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
      });
      projectData.taskCount = projectData.tasks.length;
    });

    return Array.from(projectMap.values());
  };

  // Fetch all projects (for non-Member roles)
  // Fetch all projects (for non-Member roles) - FIXED VERSION
  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllProjects();
      console.log("Fetch all projects response:", response);

      // Check multiple possible response structures
      let projectsData = null;

      if (response?.status === "200" && response?.Data) {
        projectsData = response.Data;
      } else if (response?.status === "200" && response?.data) {
        projectsData = response.data;
      } else if (response?.data) {
        projectsData = response.data;
      } else if (response?.Data) {
        projectsData = response.Data;
      } else if (Array.isArray(response)) {
        projectsData = response;
      }

      if (projectsData && Array.isArray(projectsData)) {
        const transformedData = transformProjectData(projectsData);
        console.log("Transformed projects data:", transformedData);
        setProjects(transformedData);
      } else {
        console.warn("No valid projects data received from API", response);
        setProjects([]);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks for Member role
  const fetchTasksForUser = async (statusFilter = {}) => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllTasksForUser(statusFilter);
      console.log("Fetch user tasks response:", response);

      if (response?.status === "200" && response?.data) {
        const groupedProjects = groupTasksByProject(response.data);
        setProjectsWithTasks(groupedProjects);
      } else {
        console.warn("No tasks data received from API");
        setProjectsWithTasks([]);
      }
    } catch (err) {
      console.error("Error fetching user tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
      setProjectsWithTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Create project function (same as before)
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError("");

      const apiData = {
        projectName: projectData.projectName,
        description: projectData.description,
        projectPriority: projectData.priority,
        projectStartDate: projectData.startDate.toISOString(),
        projectDueDate: projectData.endDate.toISOString(),
        pipeLine: projectData.pipelineStage,
        status: projectData.status || "Active",
      };

      const response = await createProjects(apiData);
      console.log("Create project response:", response);

      if (
        response?.data ||
        response?.status === "200" ||
        response?.Status === 200
      ) {
        await fetchAllProjectsOrSearch();
        return { success: true, data: response.data };
      }
    } catch (err) {
      console.error("Error creating project:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create project. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Search and filter function (updated for different roles)
  const searchAndFilterProjects = async () => {
    if (userRole === "Member") {
      // For Member role, search within their assigned tasks
      const hasActiveFilters = Object.values(filters).some(
        (value) => value !== "" && value !== null
      );

      if (hasActiveFilters || searchTerm.trim()) {
        // Apply client-side filtering for member's tasks
        let filteredProjects = [...projectsWithTasks];

        if (searchTerm.trim()) {
          filteredProjects = filteredProjects.filter(
            (project) =>
              project.projectName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              project.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );
        }

        if (filters.priority) {
          filteredProjects = filteredProjects.filter(
            (project) => project.projectPriority === filters.priority
          );
        }

        if (filters.pipelineStage) {
          filteredProjects = filteredProjects.filter(
            (project) => project.pipeLine === filters.pipelineStage
          );
        }

        setProjectsWithTasks(filteredProjects);
      } else {
        await fetchTasksForUser();
      }
    } else {
      // For other roles, use the existing search API
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        }

        if (filters.priority && filters.priority !== "") {
          params.append("priority", filters.priority);
        }

        if (filters.pipelineStage && filters.pipelineStage !== "") {
          params.append("pipelineStage", filters.pipelineStage);
        }

        if (filters.startDate) {
          params.append("startDate", filters.startDate.toISOString());
        }

        if (filters.endDate) {
          params.append("endDate", filters.endDate.toISOString());
        }

        params.append("page", "1");
        params.append("limit", "50");

        const response = await axios.get(
          `${API_BASE_URL}/search?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data &&
          response.data.Status === 200 &&
          response.data.data
        ) {
          const transformedData = transformProjectData(response.data.data);
          setProjects(transformedData);
        } else if (response.data && response.data.data) {
          const transformedData = transformProjectData(response.data.data);
          setProjects(transformedData);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Error searching projects:", err);
        setError("Failed to search projects. Please try again.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper function to decide data source based on role
  const fetchAllProjectsOrSearch = async () => {
    const hasActiveFilters =
      searchTerm.trim() ||
      Object.values(filters).some((value) => value !== "" && value !== null);

    if (userRole === "Member") {
      if (hasActiveFilters) {
        await searchAndFilterProjects();
      } else {
        await fetchTasksForUser();
      }
    } else {
      if (hasActiveFilters) {
        await searchAndFilterProjects();
      } else {
        await fetchAllProjects();
      }
    }
  };

  // Load data on component mount based on user role
  useEffect(() => {
    if (userRole === "Member") {
      fetchTasksForUser();
    } else {
      fetchAllProjects();
    }
  }, [userRole]);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchAllProjectsOrSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filters]);

  // Modal functions (same as before)
  const openAddModal = () => {
    setEditingProject(null);
    setAddEditModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setAddEditModal(true);
  };

  const closeAddEditModal = () => {
    setAddEditModal(false);
    setEditingProject(null);
  };

  const openFilterModal = () => {
    setFilterModal(true);
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  };

  // Handle form submission (same as before)
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form values:", values);

    if (editingProject) {
      setProjects((prevData) =>
        prevData.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...values,
                discription: values.description,
                startDate: values.startDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                endDate: values.endDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
              }
            : project
        )
      );
      setSubmitting(false);
      resetForm();
      closeAddEditModal();
    } else {
      const result = await createProject(values);

      if (result.success) {
        setSubmitting(false);
        resetForm();
        closeAddEditModal();
        console.log("Project created successfully!");
      } else {
        setSubmitting(false);
      }
    }
  };

  const handleFilterSubmit = (values, { setSubmitting }) => {
    console.log("Filter values:", values);
    setFilters(values);
    setSubmitting(false);
    closeFilterModal();
  };

  const clearFilters = () => {
    setFilters({
      priority: "",
      startDate: null,
      endDate: null,
      pipelineStage: "",
    });
    setSearchTerm("");
  };

  // Helper functions (same as before)
  const parseDate = (dateString) => {
    if (!dateString || dateString === "N/A") return new Date();
    const [day, month, year] = dateString.split(" ");
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day));
  };

  const getEditValues = () => {
    if (!editingProject) return initialValues;

    return {
      projectName: editingProject.projectName,
      description: editingProject.discription,
      priority: editingProject.priority,
      startDate: parseDate(editingProject.startDate),
      endDate: parseDate(editingProject.endDate),
      pipelineStage: editingProject.pipelineStage,
      status: editingProject.status,
    };
  };

  // Table columns for different views
  const projectColumns = [
    { key: "projectName", label: "Project Name", sortable: true },
    { key: "discription", label: "Description", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
    { key: "startDate", label: "Start Date", sortable: true },
    { key: "endDate", label: "End Date", sortable: true },
    { key: "pipelineStage", label: "Pipeline Stage", sortable: true },
  ];

  const activeFiltersCount =
    Object.values(filters).filter((value) => value !== "" && value !== null)
      .length + (searchTerm ? 1 : 0);

  const dataToDisplay = userRole === "Member" ? projectsWithTasks : projects;
  const dataCount =
    userRole === "Member" ? projectsWithTasks.length : projects.length;

  return (
    <div>
      <div className="flex justify-between px-3 pb-3.5 items-center">
        <p className="text-xl flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <p className="orange-underline">
            {userRole === "Member" ? "My Projects" : "All Projects"}
          </p>
          <span className="bg-gray-300 text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
            {dataCount}
          </span>
        </p>

        {userRole !== "Member" && (
          <Button
            variant="contained"
            onClick={openAddModal}
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": {
                backgroundColor: "#f74531",
              },
              "&:active": {
                backgroundColor: "#e93e0d",
              },
              textTransform: "none",
            }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Add Project
          </Button>
        )}
      </div>

      <div className="flex justify-end gap-6 bg-white h-20 px-2.5 items-center">
        <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50 w-80 focus-within:border-blue-400 transition-colors">
          <SearchIcon className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder={
              userRole === "Member"
                ? "Search my projects..."
                : "Search projects by project name.."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-sm text-gray-700 bg-transparent placeholder-gray-500"
          />
        </div>
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "#f1753b",
                },
              }}
              className="!border !border-[#f44336] hover:!text-white !text-black"
              onClick={clearFilters}
              size="small"
            >
              Clear Filters ({activeFiltersCount})
            </Button>
          )}
          <Button
            variant="contained"
            onClick={openFilterModal}
            startIcon={<FilterListIcon />}
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": {
                backgroundColor: "#f74531",
              },
              "&:active": {
                backgroundColor: "#e93e0d",
              },
              textTransform: "none",
            }}
          >
            Filter
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Content based on user role */}
      {loading ? (
        <div className="w-full h-[85vh] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : userRole === "Member" ? (
        <div className="p-4">
          {projectsWithTasks.length > 0 ? (
            <UserProjectCard projectsWithTasks={projectsWithTasks} />
          ) : (
            <div className="text-center py-8">
              <AssignmentIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No tasks assigned to you yet
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <CommonTable
          data={projects}
          columns={projectColumns}
          itemsPerPage={10}
          module={"projectPage"}
        />
      )}

      {/* Project Create/Edit Modal */}
      {userRole !== "Member" && (
        <CommonSideModel
          openDrawer={addEditModal}
          handleFunction={openAddModal}
        >
          <div className="flex justify-between gap-3  !ml-[1rem] px-1.5 !py-[1rem]">
            <p className="text-[1.2rem] orange-underline font-semibold">
              {editingProject ? "Edit Project" : "Add New Project"}
            </p>

            <p
              className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
              onClick={closeAddEditModal}
            >
              <CloseIcon />
            </p>
          </div>
          <Formik
            initialValues={getEditValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="px-6 pt-3 h-[84vh] overflow-auto">
                  <div className="space-y-6">
                    <div className="w-full">
                      <CommonTextField
                        label="Project Name"
                        value={values.projectName}
                        onChange={(e) =>
                          setFieldValue("projectName", e.target.value)
                        }
                        placeholder="Enter project name"
                        required
                        error={touched.projectName && !!errors.projectName}
                        helperText={touched.projectName && errors.projectName}
                      />
                    </div>

                    <div className="w-full">
                      <CommonTextField
                        label="Description"
                        value={values.description}
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                        placeholder="Enter project description"
                        variant="textarea"
                        rows={2}
                        required
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <CommonDatePicker
                          label="Start Date"
                          value={values.startDate}
                          onChange={(newValue) =>
                            setFieldValue("startDate", newValue)
                          }
                          required
                          error={touched.startDate && !!errors.startDate}
                          helperText={touched.startDate && errors.startDate}
                        />
                      </div>
                      <div>
                        <CommonDatePicker
                          label="Due Date"
                          value={values.endDate}
                          onChange={(newValue) =>
                            setFieldValue("endDate", newValue)
                          }
                          required
                          error={touched.endDate && !!errors.endDate}
                          helperText={touched.endDate && errors.endDate}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <CommonDropdown
                          label="Priority"
                          value={values.priority}
                          onChange={(e) =>
                            setFieldValue("priority", e.target.value)
                          }
                          options={priorityOptions}
                          placeholder="Select"
                          required
                          error={touched.priority && !!errors.priority}
                          helperText={touched.priority && errors.priority}
                        />
                      </div>
                      <div>
                        <CommonDropdown
                          label="Pipeline Stage"
                          value={values.pipelineStage}
                          onChange={(e) =>
                            setFieldValue("pipelineStage", e.target.value)
                          }
                          options={pipelineStageOptions}
                          placeholder="Select"
                          required
                          error={
                            touched.pipelineStage && !!errors.pipelineStage
                          }
                          helperText={
                            touched.pipelineStage && errors.pipelineStage
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 mt-2.5 flex justify-end gap-4">
                  <Button
                    onClick={closeAddEditModal}
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f1753b",
                      },
                    }}
                    className="!border !border-[#f44336] hover:!text-white !text-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#f44336",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                      },
                    }}
                  >
                    {editingProject ? "Update" : "Create"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CommonSideModel>
      )}

      {/* Filter Modal */}
      <CommonFilter
        openDrawer={filterModal}
        handleFunction={openFilterModal}
        onClick={closeFilterModal}
      >
        <div className="flex justify-between gap-3  !ml-[1rem] px-1.5 !py-[1rem]">
          <p className="text-[1.2rem] orange-underline font-semibold">
            Filter Projects
          </p>

          <p
            className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
            onClick={closeFilterModal}
          >
            <CloseIcon />
          </p>
        </div>
        <Formik
          initialValues={filters}
          validationSchema={filterValidationSchema}
          onSubmit={handleFilterSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="px-2 pt-3 h-[84vh] overflow-auto">
                <div className="space-y-6">
                  <div className="w-full">
                    <CommonDropdown
                      label="Priority"
                      value={values.priority}
                      onChange={(e) =>
                        setFieldValue("priority", e.target.value)
                      }
                      options={priorityOptions}
                      placeholder="All Priorities"
                      fullWidth={true}
                      // sx={{ width: 160 }}
                    />
                  </div>

                  <div className="w-full">
                    <CommonDropdown
                      label="Pipeline Stage"
                      value={values.pipelineStage}
                      onChange={(e) =>
                        setFieldValue("pipelineStage", e.target.value)
                      }
                      options={pipelineStageOptions}
                      placeholder="All Stages"
                      fullWidth={true}
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <CommonDatePicker
                        label="Start Date From"
                        value={values.startDate}
                        onChange={(newValue) =>
                          setFieldValue("startDate", newValue)
                        }
                        placeholder="Select start date"
                      />
                    </div>
                    <div>
                      <CommonDatePicker
                        label="End Date To"
                        value={values.endDate}
                        onChange={(newValue) =>
                          setFieldValue("endDate", newValue)
                        }
                        placeholder="Select end date"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 mt-2.5 flex justify-end gap-4">
                <Button
                  onClick={closeFilterModal}
                  variant="outlined"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1753b",
                    },
                  }}
                  className="!border !border-[#f44336] hover:!text-white !text-black"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#f44336",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                    },
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CommonFilter>

      {openConfirm && (
        <ConfirmationModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          module="event"
        />
      )}
    </div>
  );
};

export default Project;
