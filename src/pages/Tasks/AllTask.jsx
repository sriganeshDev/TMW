// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import CloseIcon from "@mui/icons-material/Close";
// import { Button, Chip, IconButton } from "@mui/material";
// import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
// import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
// import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
// import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
// import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
// import CommonTable from "../../components/reusablecomponents/CommonTable";
// import SearchIcon from "@mui/icons-material/Search";

// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import CommonFilter from "../../components/reusablecomponents/CommonModel/CommonFilterModel";

// const AllTask = () => {
//   const [addEditModal, setAddEditModal] = useState(false);
//   const [filterModal, setFilterModal] = useState(false);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     projectName: "",
//     status: "",
//     assignedTo: "",
//     dueDate: null,
//   });

//   const validationSchema = Yup.object({
//     projectName: Yup.string().required("Project Name is required"),
//     taskTitle: Yup.string().required("Task Title is required"),
//     description: Yup.string().required("Description is required"),
//     status: Yup.string().required("Status is required"),
//     dueDate: Yup.date().required("Due Date is required"),
//     assignedTo: Yup.string().required("Assigned To is required"),
//   });

//   const filterValidationSchema = Yup.object({
//     projectName: Yup.string(),
//     status: Yup.string(),
//     assignedTo: Yup.string(),
//     dueDate: Yup.date().nullable(),
//   });

//   const statusOptions = [
//     { value: "To Do", label: "To Do" },
//     { value: "In Progress", label: "In Progress" },
//     { value: "Done", label: "Done" },
//   ];

//   const projectOptions = [
//     { value: "Truelysell", label: "Truelysell" },
//     { value: "Dreamschat", label: "Dreamschat" },
//     { value: "Servbook", label: "Servbook" },
//     { value: "DreamPOS", label: "DreamPOS" },
//     { value: "Kofejob", label: "Kofejob" },
//     { value: "Doccure", label: "Doccure" },
//     { value: "Best@laundry", label: "Best@laundry" },
//     { value: "POS", label: "POS" },
//     { value: "Bookserv", label: "Bookserv" },
//   ];

//   const assignedToOptions = [
//     { value: "John Doe", label: "John Doe" },
//     { value: "Jane Smith", label: "Jane Smith" },
//     { value: "Mike Johnson", label: "Mike Johnson" },
//     { value: "Sarah Wilson", label: "Sarah Wilson" },
//     { value: "David Brown", label: "David Brown" },
//     { value: "Emily Davis", label: "Emily Davis" },
//     { value: "Robert Taylor", label: "Robert Taylor" },
//     { value: "Lisa Anderson", label: "Lisa Anderson" },
//   ];

//   const [sampleData, setSampleData] = useState([
//     {
//       id: 1,
//       projectName: "Truelysell",
//       taskTitle: "Design Landing Page",
//       description:
//         "Create responsive landing page design with modern UI elements and user-friendly interface",
//       status: "In Progress",
//       dueDate: "28 Jun 2025",
//       assignedTo: "John Doe",
//     },
//     {
//       id: 2,
//       projectName: "Dreamschat",
//       taskTitle: "Implement Chat Feature",
//       description:
//         "Develop real-time chat functionality with message encryption and file sharing capabilities",
//       status: "To Do",
//       dueDate: "30 Jun 2025",
//       assignedTo: "Jane Smith",
//     },
//   ]);

//   const initialValues = {
//     projectName: "",
//     taskTitle: "",
//     description: "",
//     status: "To Do",
//     dueDate: new Date(),
//     assignedTo: "",
//   };

//   const filterInitialValues = {
//     projectName: "",
//     status: "",
//     assignedTo: "",
//     dueDate: null,
//   };

//   const openAddModal = () => {
//     setEditingTask(null);
//     setAddEditModal(true);
//   };

//   const openEditModal = (task) => {
//     setEditingTask(task);
//     setAddEditModal(true);
//   };

//   const closeAddEditModal = () => {
//     setAddEditModal(false);
//     setEditingTask(null);
//   };

//   const openFilterModal = () => {
//     setFilterModal(true);
//   };

//   const closeFilterModal = () => {
//     setFilterModal(false);
//   };

//   const handleSubmit = (values, { setSubmitting, resetForm }) => {
//     console.log("Form values:", values);

//     if (editingTask) {
//       // Update existing task
//       setSampleData((prevData) =>
//         prevData.map((task) =>
//           task.id === editingTask.id
//             ? {
//                 ...task,
//                 ...values,
//                 dueDate: values.dueDate.toLocaleDateString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 }),
//               }
//             : task
//         )
//       );
//     } else {
//       // Add new task
//       const newTask = {
//         id: Math.max(...sampleData.map((t) => t.id)) + 1,
//         projectName: values.projectName,
//         taskTitle: values.taskTitle,
//         description: values.description,
//         status: values.status,
//         dueDate: values.dueDate.toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         }),
//         assignedTo: values.assignedTo,
//       };
//       setSampleData((prevData) => [...prevData, newTask]);
//     }

//     setSubmitting(false);
//     resetForm();
//     closeAddEditModal();
//   };

//   const handleFilterSubmit = (values, { setSubmitting }) => {
//     setFilters(values);
//     setSubmitting(false);
//     closeFilterModal();
//   };

//   const clearFilters = () => {
//     setFilters({
//       projectName: "",
//       status: "",
//       assignedTo: "",
//       dueDate: null,
//     });
//     setSearchTerm("");
//   };

//   const parseDate = (dateString) => {
//     const [day, month, year] = dateString.split(" ");
//     const monthMap = {
//       Jan: 0,
//       Feb: 1,
//       Mar: 2,
//       Apr: 3,
//       May: 4,
//       Jun: 5,
//       Jul: 6,
//       Aug: 7,
//       Sep: 8,
//       Oct: 9,
//       Nov: 10,
//       Dec: 11,
//     };
//     return new Date(parseInt(year), monthMap[month], parseInt(day));
//   };

//   const filteredData = sampleData.filter((task) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       task.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesProjectName =
//       filters.projectName === "" || task.projectName === filters.projectName;
//     const matchesStatus =
//       filters.status === "" || task.status === filters.status;
//     const matchesAssignedTo =
//       filters.assignedTo === "" || task.assignedTo === filters.assignedTo;

//     let matchesDueDate = true;
//     if (filters.dueDate) {
//       const taskDueDate = parseDate(task.dueDate);
//       matchesDueDate =
//         taskDueDate.toDateString() === filters.dueDate.toDateString();
//     }

//     return (
//       matchesSearch &&
//       matchesProjectName &&
//       matchesStatus &&
//       matchesAssignedTo &&
//       matchesDueDate
//     );
//   });

//   const getEditValues = () => {
//     if (!editingTask) return initialValues;

//     return {
//       projectName: editingTask.projectName,
//       taskTitle: editingTask.taskTitle,
//       description: editingTask.description,
//       status: editingTask.status,
//       dueDate: parseDate(editingTask.dueDate),
//       assignedTo: editingTask.assignedTo,
//     };
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "To Do":
//         return { backgroundColor: "#f3f4f6", color: "#374151" };
//       case "In Progress":
//         return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
//       case "Done":
//         return { backgroundColor: "#dcfce7", color: "#166534" };
//       default:
//         return { backgroundColor: "#f3f4f6", color: "#374151" };
//     }
//   };

//   const columns = [
//     { key: "projectName", label: "Project Name", sortable: true },
//     { key: "taskTitle", label: "Task Title", sortable: true },
//     {
//       key: "description",
//       label: "Description",
//       sortable: false,
//       render: (row) => (
//         <div className="max-w-xs truncate" title={row.description}>
//           {row.description}
//         </div>
//       ),
//     },
//     {
//       key: "status",
//       label: "Status",
//       sortable: true,
//       render: (row) => (
//         <Chip
//           label={row.status}
//           size="small"
//           sx={{
//             ...getStatusColor(row.status),
//             fontWeight: "medium",
//             "& .MuiChip-label": {
//               fontSize: "0.75rem",
//             },
//           }}
//         />
//       ),
//     },
//     { key: "dueDate", label: "Due Date", sortable: true },
//     { key: "assignedTo", label: "Assigned To", sortable: true },
//     {
//       key: "actions",
//       label: "Actions",
//       sortable: false,
//       render: (row) => (
//         <div className="flex gap-2">
//           <IconButton
//             size="small"
//             onClick={() => openEditModal(row)}
//             sx={{
//               color: "#1976d2",
//               border: "none",
//               backgroundColor: "transparent",
//               "&:hover": {
//                 backgroundColor: "rgba(25, 118, 210, 0.08)",
//               },
//             }}
//           >
//             <EditIcon fontSize="small" />
//           </IconButton>
//           <IconButton
//             size="small"
//             onClick={() => {
//               setSampleData((prevData) =>
//                 prevData.filter((t) => t.id !== row.id)
//               );
//             }}
//             sx={{
//               color: "#d32f2f",
//               border: "none",
//               backgroundColor: "transparent",
//               "&:hover": {
//                 backgroundColor: "rgba(211, 47, 47, 0.08)",
//               },
//             }}
//           >
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const activeFiltersCount =
//     Object.values(filters).filter((value) => value !== "" && value !== null)
//       .length + (searchTerm ? 1 : 0);

//   return (
//     <div>
//       <div className="flex justify-between px-3 pb-3.5 items-center">
//         <p className="text-xl flex items-center gap-2 text-gray-700 font-semibold mb-3">
//           <p className="orange-underline"> All Tasks </p>{" "}
//           <span className="bg-gray-300 text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
//             {filteredData.length}
//           </span>
//         </p>

//         <Button
//           variant="contained"
//           onClick={openAddModal}
//           startIcon={<AddCircleOutlineIcon />}
//         >
//           Add Task
//         </Button>
//       </div>

//       <div className="flex justify-between bg-white h-20 px-2.5 items-center">
//         <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 bg-white w-64">
//           <SearchIcon className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="outline-none w-full text-sm text-gray-700 bg-transparent"
//           />
//         </div>

//         <div className="flex gap-2">
//           {activeFiltersCount > 0 && (
//             <Button variant="outlined" onClick={clearFilters} size="small">
//               Clear Filters ({activeFiltersCount})
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             onClick={openFilterModal}
//             startIcon={<FilterListIcon />}
//           >
//             Filter
//           </Button>
//         </div>
//       </div>

//       <CommonTable data={filteredData} columns={columns} itemsPerPage={10} />

//       {/* Add/Edit Task Modal */}
//       <CommonSideModel openDrawer={addEditModal} handleFunction={openAddModal}>
//         <div className="flex justify-between gap-3 border-b border-gray-200 !ml-[1rem] px-1.5 !pb-[1rem]">
//           <p className="text-[1rem] font-semibold">
//             {editingTask ? "Edit Task" : "Add New Task"}
//           </p>
//           <p className="cursor-pointer" onClick={closeAddEditModal}>
//             <CloseIcon />
//           </p>
//         </div>
//         <Formik
//           initialValues={getEditValues()}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize={true}
//         >
//           {({ values, errors, touched, setFieldValue, isSubmitting }) => (
//             <Form>
//               <div className="px-6 pt-3 h-[84vh] overflow-auto">
//                 <div className="space-y-6">
//                   <div className="w-full">
//                     <CommonDropdown
//                       label="Project Name"
//                       value={values.projectName}
//                       onChange={(e) =>
//                         setFieldValue("projectName", e.target.value)
//                       }
//                       options={projectOptions}
//                       placeholder="Select Project"
//                       required
//                       error={touched.projectName && !!errors.projectName}
//                       helperText={touched.projectName && errors.projectName}
//                     />
//                   </div>

//                   <div className="w-full">
//                     <CommonTextField
//                       label="Task Title"
//                       value={values.taskTitle}
//                       onChange={(e) =>
//                         setFieldValue("taskTitle", e.target.value)
//                       }
//                       placeholder="Enter task title"
//                       required
//                       error={touched.taskTitle && !!errors.taskTitle}
//                       helperText={touched.taskTitle && errors.taskTitle}
//                     />
//                   </div>

//                   <div className="w-full">
//                     <CommonTextField
//                       label="Description"
//                       value={values.description}
//                       onChange={(e) =>
//                         setFieldValue("description", e.target.value)
//                       }
//                       placeholder="Enter task description"
//                       variant="textarea"
//                       rows={3}
//                       required
//                       error={touched.description && !!errors.description}
//                       helperText={touched.description && errors.description}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <CommonDropdown
//                         label="Status"
//                         value={values.status}
//                         onChange={(e) =>
//                           setFieldValue("status", e.target.value)
//                         }
//                         options={statusOptions}
//                         placeholder="Select Status"
//                         required
//                         error={touched.status && !!errors.status}
//                         helperText={touched.status && errors.status}
//                       />
//                     </div>
//                     <div>
//                       <CommonDatePicker
//                         label="Due Date"
//                         value={values.dueDate}
//                         onChange={(newValue) =>
//                           setFieldValue("dueDate", newValue)
//                         }
//                         required
//                         error={touched.dueDate && !!errors.dueDate}
//                         helperText={touched.dueDate && errors.dueDate}
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full">
//                     <CommonDropdown
//                       label="Assigned To"
//                       value={values.assignedTo}
//                       onChange={(e) =>
//                         setFieldValue("assignedTo", e.target.value)
//                       }
//                       options={assignedToOptions}
//                       placeholder="Select Assignee"
//                       required
//                       error={touched.assignedTo && !!errors.assignedTo}
//                       helperText={touched.assignedTo && errors.assignedTo}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="px-6 mt-2.5 flex justify-end gap-4">
//                 <Button
//                   onClick={closeAddEditModal}
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#ddd",
//                     color: "#666",
//                     "&:hover": {
//                       borderColor: "#999",
//                       backgroundColor: "rgba(0,0,0,0.04)",
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={isSubmitting}
//                   sx={{
//                     backgroundColor: "#f44336",
//                     "&:hover": {
//                       backgroundColor: "#d32f2f",
//                     },
//                   }}
//                 >
//                   {editingTask ? "Update" : "Create"}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </CommonSideModel>

//       {/* Filter Modal */}
//       <CommonFilter
//         openDrawer={filterModal}
//         handleFunction={openFilterModal}
//         onClick={closeFilterModal}
//       >
//         <div className="flex justify-between gap-3 border-b border-gray-200 px-1.5 pb-4 mt-8">
//           <p className="text-[1rem] font-semibold">Filter Tasks</p>
//         </div>
//         <Formik
//           initialValues={filters}
//           validationSchema={filterValidationSchema}
//           onSubmit={handleFilterSubmit}
//           enableReinitialize={true}
//         >
//           {({ values, errors, touched, setFieldValue, isSubmitting }) => (
//             <Form>
//               <div className="px-2 pt-3 h-[84vh] overflow-auto">
//                 <div className="space-y-6">
//                   <div className="w-full">
//                     <CommonDropdown
//                       label="Project Name"
//                       value={values.projectName}
//                       onChange={(e) =>
//                         setFieldValue("projectName", e.target.value)
//                       }
//                       options={projectOptions}
//                       placeholder="All Projects"
//                     />
//                   </div>

//                   <div className="w-full">
//                     <CommonDropdown
//                       label="Status"
//                       value={values.status}
//                       onChange={(e) => setFieldValue("status", e.target.value)}
//                       options={statusOptions}
//                       placeholder="All Statuses"
//                     />
//                   </div>

//                   <div className="w-full">
//                     <CommonDropdown
//                       label="Assigned To"
//                       value={values.assignedTo}
//                       onChange={(e) =>
//                         setFieldValue("assignedTo", e.target.value)
//                       }
//                       options={assignedToOptions}
//                       placeholder="All Assignees"
//                     />
//                   </div>

//                   <div className="w-full">
//                     <CommonDatePicker
//                       label="Due Date"
//                       value={values.dueDate}
//                       onChange={(newValue) =>
//                         setFieldValue("dueDate", newValue)
//                       }
//                       placeholder="Select due date"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="px-2 mt-2.5 flex justify-end gap-4">
//                 <Button
//                   onClick={closeFilterModal}
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#ddd",
//                     color: "#666",
//                     "&:hover": {
//                       borderColor: "#999",
//                       backgroundColor: "rgba(0,0,0,0.04)",
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={isSubmitting}
//                   sx={{
//                     backgroundColor: "#f44336",
//                     "&:hover": {
//                       backgroundColor: "#d32f2f",
//                     },
//                   }}
//                 >
//                   Apply Filters
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </CommonFilter>

//       {openConfirm && (
//         <ConfirmationModal
//           open={openConfirm}
//           setOpen={setOpenConfirm}
//           module="task"
//         />
//       )}
//     </div>
//   );
// };

// export default AllTask;

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Chip, IconButton } from "@mui/material";
import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
import CommonTable from "../../components/reusablecomponents/CommonTable";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import CommonFilter from "../../components/reusablecomponents/CommonModel/CommonFilterModel";
import {
  createTaskForProject,
  deleteTask,
  getAllTask,
  updateTask,
} from "../../services/Task/TaskServices";
import { getAllProjectNames } from "../../services/project/ProjectServices";
import { getAllUserNames } from "../../services/user/UserServices";

const AllTask = () => {
  const [addEditModal, setAddEditModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [tasks, setTasks] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);

  const [filters, setFilters] = useState({
    projectName: "",
    status: "",
    assignedTo: "",
    dueDate: null,
  });

  const validationSchema = Yup.object({
    projectId: Yup.string().required("Project is required"),
    taskTitle: Yup.string().required("Task Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    TaskDueDate: Yup.date().required("Due Date is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
    taskPriority: Yup.string().required("Task Priority is required"),
  });

  const statusOptions = [
    { value: "To do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const initialValues = {
    projectId: "",
    taskTitle: "",
    description: "",
    status: "To do",
    TaskDueDate: new Date(),
    assignedTo: "",
    taskPriority: "Medium",
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [tasksResponse, projectsResponse, usersResponse] =
        await Promise.all([
          getAllTask(),
          getAllProjectNames(),
          getAllUserNames(),
        ]);

      if (tasksResponse.status === "200" && tasksResponse.Data) {
        setTasks(tasksResponse.Data);
      }

      if (projectsResponse.status === "200" && projectsResponse.Data) {
        const projectOptions = projectsResponse.Data.map((project) => ({
          value: project._id,
          label: project.projectName,
        }));
        setProjectOptions(projectOptions);
      }

      if (usersResponse.success && usersResponse.Data) {
        const userOptions = usersResponse.Data.map((user) => ({
          value: user._id,
          label: user.userName,
        }));
        setAssignedToOptions(userOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getAllTask();
      if (response.status === "200" && response.Data) {
        setTasks(response.Data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openAddModal = () => {
    setEditingTask(null);
    setAddEditModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setAddEditModal(true);
  };

  const closeAddEditModal = () => {
    setAddEditModal(false);
    setEditingTask(null);
  };

  const openFilterModal = () => setFilterModal(true);
  const closeFilterModal = () => setFilterModal(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const taskData = { ...values };

      if (editingTask) {
        const response = await updateTask(editingTask._id, taskData);
        if (response.status === "200") {
          await fetchTasks();
          resetForm();
          closeAddEditModal();
        }
      } else {
        const response = await createTaskForProject(taskData);
        if (response.status === "200") {
          await fetchTasks();
          resetForm();
          closeAddEditModal();
        }
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilterSubmit = (values, { setSubmitting }) => {
    setFilters(values);
    setSubmitting(false);
    closeFilterModal();
  };

  const clearFilters = () => {
    setFilters({
      projectName: "",
      status: "",
      assignedTo: "",
      dueDate: null,
    });
    setSearchTerm("");
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setOpenConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTaskId) {
      try {
        const response = await deleteTask(deleteTaskId);
        if (response.status === "200") {
          await fetchTasks();
          setOpenConfirm(false);
          setDeleteTaskId(null);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setOpenConfirm(false);
    setDeleteTaskId(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Simplified helper functions
  const getProjectName = (projectId) => {
    if (!projectId) return "No Project";

    // Handle populated project object
    if (projectId.projectName) return projectId.projectName;

    // Handle project ID string
    const project = projectOptions.find((p) => p.value === projectId);
    return project?.label || "Unknown Project";
  };

  const getUserName = (assignedTo) => {
    if (!assignedTo) return "Unassigned";

    // Handle populated user object
    if (assignedTo.userName) return assignedTo.userName;
    if (assignedTo.email) return assignedTo.email;

    // Handle user ID string
    const user = assignedToOptions.find((u) => u.value === assignedTo);
    return user?.label || "Unknown User";
  };

  const getEditValues = () => {
    if (!editingTask) return initialValues;

    return {
      projectId: editingTask.projectId?._id || editingTask.projectId || "",
      taskTitle: editingTask.taskTitle || "",
      description: editingTask.description || "",
      status: editingTask.status || "To do",
      TaskDueDate: editingTask.TaskDueDate
        ? new Date(editingTask.TaskDueDate)
        : new Date(),
      assignedTo: editingTask.assignedTo?._id || editingTask.assignedTo || "",
      taskPriority: editingTask.taskPriority || "Medium",
    };
  };

  const getStatusColor = (status) => {
    const statusColors = {
      "To do": { backgroundColor: "#f3f4f6", color: "#374151" },
      "In Progress": { backgroundColor: "#dbeafe", color: "#1d4ed8" },
      Completed: { backgroundColor: "#dcfce7", color: "#166534" },
    };
    return statusColors[status] || statusColors["To do"];
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      High: { backgroundColor: "#fee2e2", color: "#dc2626" },
      Medium: { backgroundColor: "#fef3c7", color: "#d97706" },
      Low: { backgroundColor: "#f0f9ff", color: "#0369a1" },
    };
    return (
      priorityColors[priority] || {
        backgroundColor: "#f3f4f6",
        color: "#374151",
      }
    );
  };

  // Simplified filter logic
  const filteredData = tasks.filter((task) => {
    const projectName = getProjectName(task.projectId);
    const userName = getUserName(task.assignedTo);

    const matchesSearch =
      !searchTerm ||
      [projectName, task.taskTitle, task.status, userName].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesProjectName =
      !filters.projectName ||
      (task.projectId?._id || task.projectId) === filters.projectName;

    const matchesStatus = !filters.status || task.status === filters.status;

    const matchesAssignedTo =
      !filters.assignedTo ||
      (task.assignedTo?._id || task.assignedTo) === filters.assignedTo;

    const matchesDueDate =
      !filters.dueDate ||
      new Date(task.TaskDueDate).toDateString() ===
        filters.dueDate.toDateString();

    return (
      matchesSearch &&
      matchesProjectName &&
      matchesStatus &&
      matchesAssignedTo &&
      matchesDueDate
    );
  });

  const columns = [
    {
      key: "projectName",
      label: "Project Name",
      sortable: true,
      render: (row) => getProjectName(row.projectId),
    },
    { key: "taskTitle", label: "Task Title", sortable: true },
    {
      key: "description",
      label: "Description",
      sortable: false,
      render: (row) => (
        <div className="max-w-xs truncate" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            ...getStatusColor(row.status),
            fontWeight: "medium",
            "& .MuiChip-label": { fontSize: "0.75rem" },
          }}
        />
      ),
    },
    {
      key: "taskPriority",
      label: "Priority",
      sortable: true,
      render: (row) => (
        <Chip
          label={row.taskPriority}
          size="small"
          sx={{
            ...getPriorityColor(row.taskPriority),
            fontWeight: "medium",
            "& .MuiChip-label": { fontSize: "0.75rem" },
          }}
        />
      ),
    },
    {
      key: "TaskDueDate",
      label: "Due Date",
      sortable: true,
      render: (row) => formatDate(row.TaskDueDate),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      sortable: true,
      render: (row) => getUserName(row.assignedTo),
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (row) => (
        <div className="flex gap-2">
          <IconButton
            size="small"
            onClick={() => openEditModal(row)}
            sx={{
              color: "#1976d2",
              "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteClick(row._id)}
            sx={{
              color: "#d32f2f",
              "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  const activeFiltersCount =
    Object.values(filters).filter((value) => value !== "" && value !== null)
      .length + (searchTerm ? 1 : 0);

  if (loading) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader "></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-[85vh]">
      <div className="flex justify-between px-3 pb-3.5 items-center">
        <p className="text-xl flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <p className="orange-underline">All Tasks</p>
          <span className="bg-gray-300 text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
            {filteredData.length}
          </span>
        </p>

        <Button
          variant="contained"
          onClick={openAddModal}
          startIcon={<AddCircleOutlineIcon />}
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
          Add Task
        </Button>
      </div>

      <div className="flex justify-end gap-5 bg-white h-20 px-2.5 items-center">
        <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50 w-80 focus-within:border-blue-400 transition-colors">
          <SearchIcon className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search tasks by title, project, or assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-sm text-gray-700 bg-transparent placeholder-gray-500"
          />
        </div>

        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{
                "&:hover": {
                  backgroundColor: "#f1753b",
                },
              }}
              className="!border !border-[#f44336] hover:!text-white !text-black"
              size="small"
            >
              Clear Filters ({activeFiltersCount})
            </Button>
          )}
          <Button
            variant="contained"
            onClick={openFilterModal}
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
            startIcon={<FilterListIcon />}
          >
            Filter
          </Button>
        </div>
      </div>

      <CommonTable
        data={filteredData}
        columns={columns}
        itemsPerPage={10}
        module="task"
      />

      <CommonSideModel openDrawer={addEditModal} handleFunction={openAddModal}>
        <div className="flex justify-between gap-3 !ml-[1rem] px-1.5  !py-[1rem]">
          <p className="text-[1.2rem] orange-underline font-semibold">
            {editingTask ? "Edit Task" : "Add New Task"}
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
                  <CommonDropdown
                    label="Project"
                    fullWidth={true}
                    value={values.projectId}
                    onChange={(e) => setFieldValue("projectId", e.target.value)}
                    options={projectOptions}
                    placeholder="Select Project"
                    required
                    error={touched.projectId && !!errors.projectId}
                    helperText={touched.projectId && errors.projectId}
                  />

                  <CommonTextField
                    label="Task Title"
                    fullWidth={true}
                    value={values.taskTitle}
                    onChange={(e) => setFieldValue("taskTitle", e.target.value)}
                    placeholder="Enter task title"
                    required
                    error={touched.taskTitle && !!errors.taskTitle}
                    helperText={touched.taskTitle && errors.taskTitle}
                  />

                  <CommonTextField
                    fullWidth={true}
                    label="Description"
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    placeholder="Enter task description"
                    variant="textarea"
                    rows={3}
                    required
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CommonDropdown
                      fullWidth={true}
                      label="Status"
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.target.value)}
                      options={statusOptions}
                      placeholder="Select Status"
                      required
                      error={touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    />
                    <CommonDropdown
                      fullWidth={true}
                      label="Priority"
                      value={values.taskPriority}
                      onChange={(e) =>
                        setFieldValue("taskPriority", e.target.value)
                      }
                      options={priorityOptions}
                      placeholder="Select Priority"
                      required
                      error={touched.taskPriority && !!errors.taskPriority}
                      helperText={touched.taskPriority && errors.taskPriority}
                    />
                  </div>

                  <CommonDatePicker
                    label="Due Date"
                    value={values.TaskDueDate}
                    onChange={(newValue) =>
                      setFieldValue("TaskDueDate", newValue)
                    }
                    required
                    error={touched.TaskDueDate && !!errors.TaskDueDate}
                    helperText={touched.TaskDueDate && errors.TaskDueDate}
                  />

                  <CommonDropdown
                    label="Assigned To"
                    fullWidth={true}
                    value={values.assignedTo}
                    onChange={(e) =>
                      setFieldValue("assignedTo", e.target.value)
                    }
                    options={assignedToOptions}
                    placeholder="Select Assignee"
                    required
                    error={touched.assignedTo && !!errors.assignedTo}
                    helperText={touched.assignedTo && errors.assignedTo}
                  />
                </div>
              </div>

              <div className="px-6 mt-2.5 flex justify-end gap-4">
                <Button
                  onClick={closeAddEditModal}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1753b",
                    },
                  }}
                  className="!border !border-[#f44336] hover:!text-white !text-black"
                  variant="outlined"
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
                  {editingTask ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CommonSideModel>

      {/* Filter Modal */}
      <CommonFilter
        openDrawer={filterModal}
        handleFunction={openFilterModal}
        onClick={closeFilterModal}
      >
        <div className="flex justify-between gap-3  mb-2 !ml-[1rem] px-1.5 !py-[1rem]">
          <p className="text-[1.2rem] orange-underline font-semibold">
            Filter Tasks
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
          onSubmit={handleFilterSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="px-2 pt-3 h-[84vh] overflow-auto">
                <div className="space-y-6">
                  <CommonDropdown
                    label="Project Name"
                    fullWidth={true}
                    value={values.projectName}
                    onChange={(e) =>
                      setFieldValue("projectName", e.target.value)
                    }
                    options={projectOptions}
                    placeholder="All Projects"
                  />

                  <CommonDropdown
                    fullWidth={true}
                    label="Status"
                    value={values.status}
                    onChange={(e) => setFieldValue("status", e.target.value)}
                    options={statusOptions}
                    placeholder="All Statuses"
                  />

                  <CommonDropdown
                    fullWidth={true}
                    label="Assigned To"
                    value={values.assignedTo}
                    onChange={(e) =>
                      setFieldValue("assignedTo", e.target.value)
                    }
                    options={assignedToOptions}
                    placeholder="All Assignees"
                  />

                  <CommonDatePicker
                    label="Due Date"
                    value={values.dueDate}
                    onChange={(newValue) => setFieldValue("dueDate", newValue)}
                    placeholder="Select due date"
                  />
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

      {/* Delete Confirmation Modal */}
      {openConfirm && (
        <ConfirmationModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          module="task"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default AllTask;
