// import React, { useEffect, useState } from "react";
// import {
//   Settings,
//   Plus,
//   MoreVertical,
//   Clock,
//   Calendar,
//   Phone,
//   StickyNote,
//   FileText,
//   Mail,
//   CheckSquare,
//   ArrowDown,
//   Lock,
//   Check,
// } from "lucide-react";
// import {
//   ListChecks, // For "All Tasks"
//   Hourglass, // For "Pending"
//   Loader2, // For "In Progress"
//   CheckCircle2, // For "Completed"
// } from "lucide-react";
// import {
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { StepProgress } from "../empty";
// import TaskCardUi from "../../components/task/TaskCardUi";
// import { useLocation } from "react-router-dom";
// import { getSingleProfile } from "../../services/project/ProjectServices";
// import { ByNameAvater, dateFormatter } from "../../utils/helpers/basicHelper";
// import { getAllTaskForsingleProj } from "../../services/Task/TaskServices";

// const ProjectManagementUI = () => {
//   const [activeTab, setActiveTab] = useState("Tasks");
//   const [sortBy, setSortBy] = useState("Date");
//   const [taskForProj, setTaskForProj] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [projectData, setProjectData] = useState({});
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   // <------------------Fetch Project Detials --------------->
//   const { state } = useLocation();

//   const getProjectDetials = async () => {
//     const ProjectDetail = await getSingleProfile(state?.id);
//     setProjectData(ProjectDetail?.Data);
//   };
//   useEffect(() => {
//     getProjectDetials();
//   }, []);

//   // <------------------Fetch All Task Data for project --------------->
//   const getAllTaskForproj = async () => {
//     const allTask = await getAllTaskForsingleProj(state?.id);
//     setTaskForProj(allTask?.Data);
//   };
//   useEffect(() => {
//     getAllTaskForproj();
//   }, []);
//   console.log(taskForProj, "taskForProj");

//   // <--------------------------------->
//   const tabs = [
//     { name: "All Tasks", icon: ListChecks },
//     { name: "Pending", icon: Hourglass },
//     { name: "In Progress", icon: Loader2 },
//     { name: "Completed", icon: CheckCircle2 },
//   ];
//   const tasks = [
//     {
//       id: 1,
//       title: "Add a form to Update Task",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",
//       status: "Pending",
//       assigned: "John Doe",
//     },
//     {
//       id: 2,
//       title: "Make all strokes thinner",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",
//       status: "Inprogress",
//       assigned: "John Doe",
//     },
//     {
//       id: 3,
//       title: "Update orginal content",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",
//       assigned: "John Doe",
//     },
//     {
//       id: 4,
//       title: "Use only component colours",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",

//       status: "Pending",
//       assigned: "John Doe",
//     },
//     {
//       id: 5,
//       title: "Update orginal content",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",
//       status: "Inprogress",
//       assigned: "John Doe",
//     },
//     {
//       id: 6,
//       title:
//         "Use only component colours Use only component coloursUse only component colours ",
//       priority: "High",
//       hours: "25 Hrs",
//       date: "25 Oct 2023",
//       category: "Calls",
//       status: "Done",
//       assigned: "John Doe",
//     },
//   ];

//   return (
//     <div className=" ">
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         PaperProps={{
//           elevation: 1,
//           sx: {
//             borderRadius: "8px",
//             minWidth: 150,
//             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <EditIcon sx={{ width: "20px" }} className=" text-purple-600" />
//           </ListItemIcon>
//           <ListItemText
//             primary="Edit"
//             primaryTypographyProps={{ fontSize: "0.875rem" }}
//           />
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <DeleteIcon
//               sx={{ width: "20px" }}
//               className="w-3 h-3 text-red-500"
//             />
//           </ListItemIcon>
//           <ListItemText
//             primary="Delete"
//             primaryTypographyProps={{ fontSize: "0.875rem" }}
//           />
//         </MenuItem>
//       </Menu>
//       <div className="bg-white shadow-sm ">
//         <div className=" w-full flex  px-6 py-4">
//           <div className="flex items-center w-full justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
//                 <div className="text-white font-bold text-lg">
//                   {ByNameAvater(projectData.projectName)}
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">
//                   {projectData.projectName || "N/A"}
//                 </h1>
//                 {/* <p className="text-sm text-gray-500">Project Id : 154454887</p> */}
//                 <div className="flex items-center space-x-2 mt-1">
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                     <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
//                     {projectData.projectPriority}
//                   </span>
//                   {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     Active
//                   </span> */}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Lock className="w-4 h-4" />
//                 <span>Private</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
//                 <Check className="w-4 h-4" />
//                 <span>{projectData?.pipeLine}</span>
//                 <ArrowDown className="w-4 h-4" />
//               </div>
//               <button
//                 className="p-2 text-gray-400 hover:text-gray-600"
//                 onClick={handleClick}
//               >
//                 <MoreVertical className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=" w-full  py-6">
//         <div className=" flex  md:flex-col 3xl:flex-row xl:flex-row   lg:flex-col gap-6 ">
//           <div className=" space-y-6  w-full xl:w-[450px]  mb-5">
//             <div className="bg-white rounded-lg w-full h-full shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Project Information
//               </h3>
//               <div className=" flex flex-col w-full">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm text-gray-500">
//                       Project Name
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {projectData.projectName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Description</label>
//                     <p className="text-sm text-gray-900">
//                       {projectData.description}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Start Date</label>
//                     <p className="text-sm text-gray-900">
//                       {dateFormatter(projectData.projectStartDate || "-")}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Due Date</label>
//                     <p className="text-sm text-gray-900">
//                       {dateFormatter(projectData.projectDueDate || "-")}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center  !mt-5 justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Responsible Persons
//                   </h3>
//                   {/* <button className="text-blue-600 text-sm flex items-center">
//                     <Plus className="w-4 h-4 mr-1" />
//                     Add New
//                   </button> */}
//                 </div>
//                 <div className="flex items-center  space-x-2">
//                   <div className="flex -space-x-2">
//                     <Avatar
//                       src="sr"
//                       alt={"formattedName"}
//                       sx={{
//                         width: 32,
//                         height: 32,
//                       }}
//                     >
//                       {/* <p className="text-sm">{"initials"}</p> */}
//                     </Avatar>
//                     <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <span className="text-sm text-gray-500">+05</span>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Client</h3>
//                 <button className="text-blue-600 text-sm flex items-center">
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add New
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                   <span className="text-red-600 text-sm">H</span>
//                 </div>
//                 <span className="text-sm text-gray-700">Harbor View</span>
//               </div>
//             </div> */}
//           </div>

//           <div className="bg-white   h-fit w-full rounded-lg shadow-sm">
//             <div className="flex-1">
//               <div className="">
//                 <StepProgress />
//               </div>

//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8 px-6">
//                   {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     return (
//                       <button
//                         key={tab.name}
//                         onClick={() => setActiveTab(tab.name)}
//                         className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
//                           activeTab === tab.name
//                             ? "border-red-500 text-red-600"
//                             : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                         }`}
//                       >
//                         <Icon className="w-4 h-4" />
//                         <span>{tab.name}</span>
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     All Tasks
//                   </h2>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-gray-500">Sort By</span>
//                       <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option>Date</option>
//                         <option>Priority</option>
//                         <option>Status</option>
//                       </select>
//                     </div>
//                     <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add New Task
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-4  lg:!h-[43vh]  overflow-auto">
//                   {tasks.map((task) => (
//                     <TaskCardUi key={task.id || task._id} task={task} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectManagementUI;

// import React, { useEffect, useState } from "react";
// import {
//   Settings,
//   Plus,
//   MoreVertical,
//   Clock,
//   Calendar,
//   Phone,
//   StickyNote,
//   FileText,
//   Mail,
//   CheckSquare,
//   ArrowDown,
//   Lock,
//   Check,
// } from "lucide-react";
// import {
//   ListChecks, // For "All Tasks"
//   Hourglass, // For "Pending"
//   Loader2, // For "In Progress"
//   CheckCircle2, // For "Completed"
// } from "lucide-react";
// import {
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { StepProgress } from "../empty";
// import TaskCardUi from "../../components/task/TaskCardUi";
// import { useLocation } from "react-router-dom";
// import { getSingleProfile } from "../../services/project/ProjectServices";
// import { ByNameAvater, dateFormatter } from "../../utils/helpers/basicHelper";
// import { getAllTaskForsingleProj } from "../../services/Task/TaskServices";

// const ProjectManagementUI = () => {
//   const [activeTab, setActiveTab] = useState("All Tasks");
//   const [sortBy, setSortBy] = useState("Date");
//   const [taskForProj, setTaskForProj] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [projectData, setProjectData] = useState({});

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // <------------------Fetch Project Details --------------->
//   const { state } = useLocation();

//   const getProjectDetails = async () => {
//     try {
//       const ProjectDetail = await getSingleProfile(state?.id);
//       setProjectData(ProjectDetail?.Data);
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   };

//   useEffect(() => {
//     getProjectDetails();
//   }, []);

//   // <------------------Get Status for API Call --------------->
//   const getStatusForTab = (tabName) => {
//     switch (tabName) {
//       case "Pending":
//         return "To do";
//       case "In Progress":
//         return "In Progress";
//       case "Completed":
//         return "Completed";
//       default:
//         return null; // For "All Tasks", don't send status
//     }
//   };

//   // <------------------Filter Tasks Based on Active Tab --------------->
//   const filterTasksByTab = (tasks, tabName) => {
//     if (tabName === "All Tasks") {
//       return tasks;
//     }
//     const status = getStatusForTab(tabName);
//     return tasks.filter((task) => task.status === status);
//   };

//   // <------------------Fetch Tasks Based on Active Tab --------------->
//   const getAllTaskForproj = async (tabName = null) => {
//     try {
//       setLoading(true);
//       // For "All Tasks", don't send status filter
//       const payload = {};

//       const allTask = await getAllTaskForsingleProj(state?.id, payload);
//       const tasks = allTask?.Data || [];

//       // Filter tasks based on active tab
//       const filteredTasks = tabName
//         ? filterTasksByTab(tasks, tabName)
//         : filterTasksByTab(tasks, activeTab);
//       setTaskForProj(filteredTasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       setTaskForProj([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // <------------------Initial Load --------------->
//   useEffect(() => {
//     if (state?.id) {
//       getAllTaskForproj();
//     }
//   }, [state?.id]);

//   // <------------------Fetch Tasks When Tab Changes --------------->
//   useEffect(() => {
//     if (state?.id) {
//       getAllTaskForproj(activeTab);
//     }
//   }, [activeTab]);

//   // <------------------Sort Tasks --------------->
//   const sortTasks = (tasks) => {
//     return [...tasks].sort((a, b) => {
//       switch (sortBy) {
//         case "Date":
//           return new Date(b.TaskDueDate) - new Date(a.TaskDueDate);
//         case "Priority":
//           const priorityOrder = { High: 3, Medium: 2, Low: 1 };
//           return (
//             (priorityOrder[b.taskPriority] || 0) -
//             (priorityOrder[a.taskPriority] || 0)
//           );
//         case "Status":
//           return (a.status || "").localeCompare(b.status || "");
//         default:
//           return 0;
//       }
//     });
//   };

//   // <------------------Handle Tab Change --------------->
//   const handleTabChange = (tabName) => {
//     setActiveTab(tabName);
//   };

//   // <------------------Get Task Count for Each Tab --------------->
//   const getTaskCountForTab = (tabName, allTasks) => {
//     if (tabName === "All Tasks") {
//       return allTasks.length;
//     }
//     const status = getStatusForTab(tabName);
//     return allTasks.filter((task) => task.status === status).length;
//   };

//   // <------------------Fetch All Tasks for Counts --------------->
//   const [allTasks, setAllTasks] = useState([]);

//   const fetchAllTasksForCounts = async () => {
//     try {
//       const allTask = await getAllTaskForsingleProj(state?.id, {});
//       setAllTasks(allTask?.Data || []);
//     } catch (error) {
//       console.error("Error fetching all tasks for counts:", error);
//     }
//   };

//   useEffect(() => {
//     if (state?.id) {
//       fetchAllTasksForCounts();
//     }
//   }, [state?.id]);

//   // <--------------------------------->
//   const tabs = [
//     { name: "All Tasks", icon: ListChecks },
//     { name: "Pending", icon: Hourglass },
//     { name: "In Progress", icon: Loader2 },
//     { name: "Completed", icon: CheckCircle2 },
//   ];

//   const sortedTasks = sortTasks(taskForProj);

//   return (
//     <div className=" ">
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         PaperProps={{
//           elevation: 1,
//           sx: {
//             borderRadius: "8px",
//             minWidth: 150,
//             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <EditIcon sx={{ width: "20px" }} className=" text-purple-600" />
//           </ListItemIcon>
//           <ListItemText
//             primary="Edit"
//             primaryTypographyProps={{ fontSize: "0.875rem" }}
//           />
//         </MenuItem>

//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <DeleteIcon
//               sx={{ width: "20px" }}
//               className="w-3 h-3 text-red-500"
//             />
//           </ListItemIcon>
//           <ListItemText
//             primary="Delete"
//             primaryTypographyProps={{ fontSize: "0.875rem" }}
//           />
//         </MenuItem>
//       </Menu>

//       <div className="bg-white shadow-sm ">
//         <div className=" w-full flex  px-6 py-4">
//           <div className="flex items-center w-full justify-between">
//             {/* <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
//                 <div className="text-white font-bold text-lg">
//                   {ByNameAvater(projectData.projectName)}
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">
//                   {projectData.projectName || "N/A"}
//                 </h1>
//                 <div className="flex items-center space-x-2 mt-1">
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                     <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
//                     {projectData.projectPriority}
//                   </span>
//                 </div>
//               </div>
//             </div> */}
//             <div className="flex items-center space-x-3">
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Lock className="w-4 h-4" />
//                 <span>Private</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
//                 <Check className="w-4 h-4" />
//                 <span>{projectData?.pipeLine}</span>
//                 <ArrowDown className="w-4 h-4" />
//               </div>
//               <button
//                 className="p-2 text-gray-400 hover:text-gray-600"
//                 onClick={handleClick}
//               >
//                 <MoreVertical className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className=" w-full  py-6">
//         <div className=" flex  md:flex-col 3xl:flex-row xl:flex-row   lg:flex-col gap-6 ">
//           <div className=" space-y-6  w-full xl:w-[450px]  mb-5">
//             {/* <div className="bg-white rounded-lg w-full h-full shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Project Information
//               </h3>
//               <div className=" flex flex-col w-full">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm text-gray-500">
//                       Project Name
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {projectData.projectName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Description</label>
//                     <p className="text-sm text-gray-900">
//                       {projectData.description}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Start Date</label>
//                     <p className="text-sm text-gray-900">
//                       {dateFormatter(projectData.projectStartDate || "-")}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Due Date</label>
//                     <p className="text-sm text-gray-900">
//                       {dateFormatter(projectData.projectDueDate || "-")}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center  !mt-5 justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Responsible Persons
//                   </h3>
//                 </div>
//                 <div className="flex items-center  space-x-2">
//                   <div className="flex -space-x-2">
//                     <Avatar
//                       src="sr"
//                       alt={"formattedName"}
//                       sx={{
//                         width: 32,
//                         height: 32,
//                       }}
//                     ></Avatar>
//                     <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
//                     <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <span className="text-sm text-gray-500">+05</span>
//                 </div>
//               </div>
//             </div> */}
//           </div>

//           <div className="bg-white   h-fit w-full rounded-lg shadow-sm">
//             <div className="flex-1">
//               <div className="">
//                 <StepProgress />
//               </div>

//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8 px-6">
//                   {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     const taskCount = getTaskCountForTab(tab.name, allTasks);
//                     return (
//                       <button
//                         key={tab.name}
//                         onClick={() => handleTabChange(tab.name)}
//                         disabled={loading}
//                         className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                           activeTab === tab.name
//                             ? "border-red-500 text-red-600"
//                             : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                         } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                       >
//                         <Icon className="w-4 h-4" />
//                         <span>{tab.name}</span>
//                         <span
//                           className={`ml-1 px-2 py-1 text-xs rounded-full ${
//                             activeTab === tab.name
//                               ? "bg-red-100 text-red-600"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                         >
//                           {taskCount}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {activeTab} ({taskForProj.length})
//                   </h2>
//                   <div className="flex items-center space-x-4">
//                     {activeTab === "All Tasks" && (
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm text-gray-500">Sort By</span>
//                         <select
//                           value={sortBy}
//                           onChange={(e) => setSortBy(e.target.value)}
//                           disabled={loading}
//                           className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//                         >
//                           <option>Date</option>
//                           <option>Priority</option>
//                           <option>Status</option>
//                         </select>
//                       </div>
//                     )}
//                     <button
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add New Task
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-4  lg:!h-[43vh]  overflow-auto">
//                   {loading ? (
//                     <div className="flex items-center justify-center py-8">
//                       <div className="flex items-center space-x-2 text-gray-500">
//                         <div className="w-5 h-5 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
//                         <span>Loading tasks...</span>
//                       </div>
//                     </div>
//                   ) : sortedTasks.length > 0 ? (
//                     sortedTasks.map((task) => (
//                       <TaskCardUi key={task._id} task={task} />
//                     ))
//                   ) : (
//                     <div className="text-center py-8 text-gray-500">
//                       No tasks found for {activeTab.toLowerCase()}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectManagementUI;

///////////////

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import nofound from "../../assets/no-data2.gif";
import {
  Settings,
  Plus,
  MoreVertical,
  Clock,
  Calendar,
  Phone,
  StickyNote,
  FileText,
  Mail,
  CheckSquare,
  ArrowDown,
  Lock,
  Check,
  MoreVerticalIcon,
} from "lucide-react";
import {
  ListChecks, // For "All Tasks"
  Hourglass, // For "Pending"
  Loader2, // For "In Progress"
  CheckCircle2, // For "Completed"
} from "lucide-react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import TaskCardUi from "../../components/task/TaskCardUi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSingleProfile,
  updateProject,
  DeleteProject,
} from "../../services/project/ProjectServices";
import {
  ByNameAvater,
  dateFormatter,
  getModalContent,
} from "../../utils/helpers/basicHelper";
import {
  getAllTaskForsingleProj,
  createTaskForProject,
  updateTask,
  deleteTask,
} from "../../services/Task/TaskServices";
import { getAllUserNames } from "../../services/user/UserServices";
import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
import {
  pipelineOptions,
  priorityOptions,
  statusOption,
} from "../../utils/helpers/helperData";
import PipelineDropdown from "../../components/projects/pipeline";
import {
  Settings as SettingsIcon,
  FileText as FileTextIcon,
  GitBranch,
} from "lucide-react";
import { StepProgress } from "../../components/projects/Steper";
import SimpleAvatarList from "../../components/projects/userAvatar";
const ProjectManagementUI = () => {
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [sortBy, setSortBy] = useState("Date");
  const [taskForProj, setTaskForProj] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [projectData, setProjectData] = useState({});
  const [userDetail, setUserDetial] = useState("");
  // Task Modal States
  const [addEditTaskModal, setAddEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [assignedToOptions, setAssignedToOptions] = useState([]);

  // Project Modal States
  const [editProjectModal, setEditProjectModal] = useState(false);

  // Confirmation Modal States
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "task" or "project"
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  // Task Validation Schema
  const taskValidationSchema = Yup.object({
    taskTitle: Yup.string().required("Task Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    TaskDueDate: Yup.date().required("Due Date is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
    taskPriority: Yup.string().required("Task Priority is required"),
  });

  // Project Validation Schema
  const projectValidationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    projectStartDate: Yup.date().required("Start Date is required"),
    projectDueDate: Yup.date().required("Due Date is required"),
    projectPriority: Yup.string().required("Priority is required"),
    pipeLine: Yup.string().required("Pipeline is required"),
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // <------------------Fetch Project Details --------------->
  const getProjectDetails = async () => {
    try {
      const ProjectDetail = await getSingleProfile(state?.id);
      setProjectData(ProjectDetail?.Data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  // <------------------Fetch Users for Assignment --------------->
  const fetchUsers = async () => {
    try {
      const usersResponse = await getAllUserNames();
      if (usersResponse.success && usersResponse.Data) {
        const userOptions = usersResponse.Data.map((user) => ({
          value: user._id,
          label: user.userName,
        }));
        setAssignedToOptions(userOptions);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getProjectDetails();
    fetchUsers();
  }, []);

  // <------------------Get Status for API Call --------------->
  const getStatusForTab = (tabName) => {
    switch (tabName) {
      case "Pending":
        return "To do";
      case "In Progress":
        return "In Progress";
      case "Completed":
        return "Completed";
      default:
        return null; // For "All Tasks", don't send status
    }
  };

  // <------------------Filter Tasks Based on Active Tab --------------->
  const filterTasksByTab = (tasks, tabName) => {
    if (tabName === "All Tasks") {
      return tasks;
    }
    const status = getStatusForTab(tabName);
    return tasks.filter((task) => task.status === status);
  };

  // <------------------Fetch Tasks Based on Active Tab --------------->
  const getAllTaskForproj = async (tabName = null) => {
    try {
      setLoading(true);
      const payload = {};
      const allTask = await getAllTaskForsingleProj(state?.id, payload);
      const tasks = allTask?.Data || [];
      // console.log(tasks, "taskstaskstaskstasks");

      setUserDetial(tasks);
      // console.log("userDetails , userDetails ", userDetail);
      const filteredTasks = tabName
        ? filterTasksByTab(tasks, tabName)
        : filterTasksByTab(tasks, activeTab);
      setTaskForProj(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTaskForProj([]);
    } finally {
      setLoading(false);
    }
  };

  // <------------------Initial Load --------------->
  useEffect(() => {
    if (state?.id) {
      getAllTaskForproj();
    }
  }, [state?.id]);

  // <------------------Fetch Tasks When Tab Changes --------------->
  useEffect(() => {
    if (state?.id) {
      getAllTaskForproj(activeTab);
    }
  }, [activeTab]);

  // <------------------Sort Tasks --------------->
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case "Date":
          return new Date(b.TaskDueDate) - new Date(a.TaskDueDate);
        case "Priority":
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return (
            (priorityOrder[b.taskPriority] || 0) -
            (priorityOrder[a.taskPriority] || 0)
          );
        case "Status":
          return (a.status || "").localeCompare(b.status || "");
        default:
          return 0;
      }
    });
  };

  // <------------------Handle Tab Change --------------->
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // <------------------Get Task Count for Each Tab --------------->
  const getTaskCountForTab = (tabName, allTasks) => {
    if (tabName === "All Tasks") {
      return allTasks.length;
    }
    const status = getStatusForTab(tabName);
    return allTasks.filter((task) => task.status === status).length;
  };

  // <------------------Fetch All Tasks for Counts --------------->
  const [allTasks, setAllTasks] = useState([]);

  const fetchAllTasksForCounts = async () => {
    try {
      const allTask = await getAllTaskForsingleProj(state?.id, {});
      setAllTasks(allTask?.Data || []);
    } catch (error) {
      console.error("Error fetching all tasks for counts:", error);
    }
  };

  useEffect(() => {
    if (state?.id) {
      fetchAllTasksForCounts();
    }
  }, [state?.id]);

  // <------------------Task Modal Functions --------------->
  const openAddTaskModal = () => {
    setEditingTask(null);
    setAddEditTaskModal(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setAddEditTaskModal(true);
  };

  const closeTaskModal = () => {
    setAddEditTaskModal(false);
    setEditingTask(null);
  };

  // <------------------Project Modal Functions --------------->
  const openEditProjectModal = () => {
    setEditProjectModal(true);
    handleClose();
  };

  const closeProjectModal = () => {
    setEditProjectModal(false);
  };

  // <------------------Task CRUD Operations --------------->
  const handleTaskSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const taskData = {
        ...values,
        projectId: state?.id, // Always use current project ID
      };

      if (editingTask) {
        const response = await updateTask(editingTask._id, taskData);
        if (response.status === "200") {
          await getAllTaskForproj();
          await fetchAllTasksForCounts();
          resetForm();
          closeTaskModal();
        }
      } else {
        const response = await createTaskForProject(taskData);
        if (response.status === "200") {
          await getAllTaskForproj();
          await fetchAllTasksForCounts();
          resetForm();
          closeTaskModal();
        }
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setSubmitting(false);
    }
  };
  // Add these state variables
  const [pendingPipelineStatus, setPendingPipelineStatus] = useState(null);

  // Add these handler functions
  const handlePipelineStatusChange = async (newStatus) => {
    try {
      const response = await updateProject(state?.id, { pipeLine: newStatus });

      if (response.status === "200") {
        setProjectData((prev) => ({ ...prev, pipeLine: newStatus }));
        // Optionally refresh project details
        // await getProjectDetails();
      }
    } catch (error) {
      console.error("Error updating pipeline status:", error);
    }
  };

  const handleShowPipelineConfirmModal = (newStatus) => {
    setPendingPipelineStatus(newStatus);
    setDeleteType("pipeline");
    setOpenConfirm(true);
  };
  // <------------------Project CRUD Operations --------------->
  const handleProjectSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await updateProject(state?.id, values);
      if (response.status === "200") {
        await getProjectDetails();
        closeProjectModal();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // <------------------Delete Operations --------------->
  const handleDeleteClick = (id, type) => {
    console.log("Clicked Delete", id, type);
    setDeleteId(id);
    setDeleteType(type);
    setOpenConfirm(true); // <-- Make sure this triggers re-render
    if (type === "project") {
      handleClose(); // Ensure this doesn't cause state reset
    }
  };

  // Update your existing handleDeleteConfirm function
  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === "pipeline") {
        if (pendingPipelineStatus) {
          await handlePipelineStatusChange(pendingPipelineStatus);
          setPendingPipelineStatus(null);
        }
      } else if (deleteType === "task" && deleteId) {
        const response = await deleteTask(deleteId);
        if (response.status === "200") {
          await getAllTaskForproj();
          await fetchAllTasksForCounts();
        }
      } else if (deleteType === "project" && deleteId) {
        const response = await DeleteProject(deleteId);
        if (response.status === "200") {
          navigate("/smart-HR/project");
        }
      }

      setOpenConfirm(false);
      setDeleteId(null);
      setDeleteType("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteCancel = () => {
    setOpenConfirm(false);
    setDeleteId(null);
    setDeleteType("");
  };
  const getPipelineStep = (pipelineStatus) => {
    switch (pipelineStatus) {
      case "Develop":
        return 2;
      case "Completed":
        return 3;
      default:
        return 1;
    }
  };
  // <------------------Helper Functions --------------->
  const getTaskEditValues = () => {
    if (!editingTask) {
      return {
        taskTitle: "",
        description: "",
        status: "To do",
        TaskDueDate: new Date(),
        assignedTo: "",
        taskPriority: "Medium",
      };
    }

    return {
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

  const getProjectEditValues = () => {
    return {
      projectName: projectData.projectName || "",
      description: projectData.description || "",
      projectStartDate: projectData.projectStartDate
        ? new Date(projectData.projectStartDate)
        : new Date(),
      projectDueDate: projectData.projectDueDate
        ? new Date(projectData.projectDueDate)
        : new Date(),
      projectPriority: projectData.projectPriority || "Medium",
      pipeLine: projectData.pipeLine || "Active",
    };
  };
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleMenuOpen = (event, task) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTask(null);
  };

  // <--------------------------------->
  const tabs = [
    { name: "All Tasks", icon: ListChecks },
    { name: "Pending", icon: Hourglass },
    { name: "In Progress", icon: Loader2 },
    { name: "Completed", icon: CheckCircle2 },
  ];

  const sortedTasks = sortTasks(taskForProj);

  return (
    <div className=" ">
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 1,
          sx: {
            borderRadius: "8px",
            minWidth: 150,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        <MenuItem onClick={openEditProjectModal}>
          <ListItemIcon>
            <EditIcon sx={{ width: "20px" }} className=" text-purple-600" />
          </ListItemIcon>
          <ListItemText
            primary="Edit Project"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </MenuItem>

        <MenuItem onClick={() => handleDeleteClick(state?.id, "project")}>
          <ListItemIcon>
            <DeleteIcon
              sx={{ width: "20px" }}
              className="w-3 h-3 text-red-500"
            />
          </ListItemIcon>
          <ListItemText
            primary="Delete Project"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </MenuItem>
      </Menu>

      <div className="bg-white shadow-sm ">
        <div className=" w-full flex  px-6 py-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-lg">
                  {ByNameAvater(projectData.projectName)}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {projectData.projectName || "N/A"}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    {projectData.projectPriority}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </div>

              <PipelineDropdown
                projectData={projectData}
                onStatusChange={handlePipelineStatusChange}
                onShowConfirmModal={handleShowPipelineConfirmModal}
              />
              <button
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={handleClick}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full  py-6">
        <div className=" flex  md:flex-col 3xl:flex-row xl:flex-row   lg:flex-col gap-6 ">
          <div className=" space-y-6  w-full xl:w-[450px]  mb-5">
            <div className="bg-white rounded-lg w-full h-full shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Information
              </h3>
              <div className=" flex flex-col w-full">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Project Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {projectData.projectName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="text-sm text-gray-900">
                      {projectData.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Start Date</label>
                    <p className="text-sm text-gray-900">
                      {dateFormatter(projectData.projectStartDate || "-")}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Due Date</label>
                    <p className="text-sm text-gray-900">
                      {dateFormatter(projectData.projectDueDate || "-")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center  !mt-5 justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Responsible Persons
                  </h3>
                </div>
                {Array.isArray(userDetail) && userDetail.length > 0 ? (
                  <SimpleAvatarList userDetails={userDetail} />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No users assigned for this project
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white     w-full rounded-lg shadow-sm">
            <div className="flex-1">
              <div className="">
                <StepProgress
                  currentStep={getPipelineStep(projectData.pipeLine)}
                />{" "}
              </div>

              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const taskCount = getTaskCountForTab(tab.name, allTasks);
                    return (
                      <button
                        key={tab.name}
                        onClick={() => handleTabChange(tab.name)}
                        disabled={loading}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.name
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                        <span
                          className={`ml-1 px-2 py-1 text-xs rounded-full ${
                            activeTab === tab.name
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {taskCount}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeTab} ({taskForProj.length})
                  </h2>
                  <div className="flex items-center space-x-4">
                    {activeTab === "All Tasks" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sort By</span>
                        <div className="w-40">
                          <CommonDropdown
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            options={[
                              { label: "Date", value: "Date" },
                              { label: "Priority", value: "Priority" },
                              { label: "Status", value: "Status" },
                            ]}
                            placeholder="Select"
                            disabled={loading}
                            fullWidth={false}
                            sx={{ width: 160 }}
                          />
                        </div>
                      </div>
                    )}
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center disabled:opacity-50"
                      disabled={loading}
                      onClick={openAddTaskModal}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Task
                    </button>
                  </div>
                </div>

                <div className="space-y-4  lg:!h-[43vh]  overflow-auto">
                  {loading ? (
                    <div className="w-full h-[55vh] flex justify-center items-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="loader "></div>
                      </div>
                    </div>
                  ) : sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                      <div key={task._id} className="relative group">
                        <TaskCardUi task={task} onMenuClick={handleMenuOpen} />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4 sm:py-20">
                      <img
                        src={nofound}
                        alt="No data found"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 object-contain mb-4"
                      />
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600">
                        No tasks found for {activeTab.toLowerCase()}{" "}
                      </p>
                    </div>
                  )}
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      elevation: 1,
                      sx: {
                        borderRadius: "8px",
                        minWidth: 150,
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        openEditTaskModal(selectedTask);
                      }}
                    >
                      <ListItemIcon>
                        <EditIcon
                          sx={{ width: "20px" }}
                          className="text-blue-600"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Edit Task"
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                      />
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        handleDeleteClick(selectedTask?._id, "task");
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon
                          sx={{ width: "20px" }}
                          className="text-red-500"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Delete Task"
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                      />
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommonSideModel
        openDrawer={addEditTaskModal}
        handleFunction={openAddTaskModal}
      >
        <div className="flex justify-between gap-3  !ml-[1rem] px-1.5 !py-[1rem]">
          <p className="text-[1.2rem] orange-underline font-semibold">
            {editingTask ? "Edit Task" : "Add New Task"}{" "}
          </p>

          <p
            className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
            onClick={closeTaskModal}
          >
            <CloseIcon />
          </p>
        </div>
        <Formik
          initialValues={getTaskEditValues()}
          validationSchema={taskValidationSchema}
          onSubmit={handleTaskSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="px-6 pt-3 h-[84vh] overflow-auto">
                <div className="space-y-6">
                  {/* Project Name Display (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
                      {projectData.projectName || "Current Project"}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Project cannot be changed when editing task
                    </p>
                  </div>

                  <CommonTextField
                    label="Task Title"
                    value={values.taskTitle}
                    onChange={(e) => setFieldValue("taskTitle", e.target.value)}
                    placeholder="Enter task title"
                    required
                    error={touched.taskTitle && !!errors.taskTitle}
                    helperText={touched.taskTitle && errors.taskTitle}
                  />

                  <CommonTextField
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
                      label="Status"
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.target.value)}
                      options={statusOption}
                      placeholder="Select Status"
                      required
                      fullWidth={true}
                      error={touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    />
                    <CommonDropdown
                      label="Priority"
                      value={values.taskPriority}
                      onChange={(e) =>
                        setFieldValue("taskPriority", e.target.value)
                      }
                      options={priorityOptions}
                      placeholder="Select Priority"
                      required
                      fullWidth={true}
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
                    value={values.assignedTo}
                    onChange={(e) =>
                      setFieldValue("assignedTo", e.target.value)
                    }
                    fullWidth={true}
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
                  onClick={closeTaskModal}
                  variant="outlined "
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
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CommonSideModel>

      <CommonSideModel
        openDrawer={editProjectModal}
        handleFunction={closeProjectModal}
      >
        <div className="flex justify-between gap-3  !ml-[1rem] px-1.5 !py-[1rem]">
          <p className="text-[1.2rem] orange-underline font-semibold">
            Edit Project{" "}
          </p>

          <p
            className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
            onClick={closeProjectModal}
          >
            <CloseIcon />
          </p>
        </div>

        <Formik
          initialValues={getProjectEditValues()}
          validationSchema={projectValidationSchema}
          onSubmit={handleProjectSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="px-6 pt-4 pb-6 h-[calc(100vh-150px)] overflow-auto space-y-6">
                <CommonTextField
                  label="Project Name"
                  value={values.projectName}
                  onChange={(e) => setFieldValue("projectName", e.target.value)}
                  placeholder="Enter project name"
                  required
                  error={touched.projectName && !!errors.projectName}
                  helperText={touched.projectName && errors.projectName}
                />

                <CommonTextField
                  label="Description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  placeholder="Enter project description"
                  variant="textarea"
                  rows={3}
                  required
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CommonDatePicker
                    label="Start Date"
                    value={values.projectStartDate}
                    onChange={(date) => setFieldValue("projectStartDate", date)}
                    required
                    error={
                      touched.projectStartDate && !!errors.projectStartDate
                    }
                    helperText={
                      touched.projectStartDate && errors.projectStartDate
                    }
                  />
                  <CommonDatePicker
                    label="Due Date"
                    value={values.projectDueDate}
                    onChange={(date) => setFieldValue("projectDueDate", date)}
                    required
                    error={touched.projectDueDate && !!errors.projectDueDate}
                    helperText={touched.projectDueDate && errors.projectDueDate}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CommonDropdown
                    label="Priority"
                    value={values.projectPriority}
                    onChange={(val) => setFieldValue("projectPriority", val)}
                    options={priorityOptions}
                    required
                    // fullWidth={true}
                    sx={{ width: "100%" }}
                    error={touched.projectPriority && !!errors.projectPriority}
                    helperText={
                      touched.projectPriority && errors.projectPriority
                    }
                  />
                  <CommonDropdown
                    label="Pipeline"
                    value={values.pipeLine}
                    onChange={(val) => setFieldValue("pipeLine", val)}
                    options={pipelineOptions}
                    required
                    fullWidth={true}
                    // sx={{ width: "100%" }}
                    error={touched.pipeLine && !!errors.pipeLine}
                    helperText={touched.pipeLine && errors.pipeLine}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4  px-6 py-4">
                <Button
                  onClick={closeProjectModal}
                  variant="outlined"
                  disabled={isSubmitting}
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
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CommonSideModel>

      {/* Delete Confirmation Modal */}
      {openConfirm && (
        <ConfirmationModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          title={
            deleteType === "pipeline"
              ? getModalContent(projectData, pendingPipelineStatus).title
              : deleteType === "project"
              ? "Delete Project"
              : "Delete Task"
          }
          message={
            deleteType === "pipeline"
              ? getModalContent().message
              : deleteType === "project"
              ? "Are you sure you want to delete this project?"
              : "Are you sure you want to delete this task?"
          }
          confirmText={
            deleteType === "pipeline"
              ? getModalContent().confirmText
              : deleteType === "project"
              ? "Delete"
              : "Delete"
          }
          type={deleteType === "pipeline" ? "pipeline" : "delete"}
          icon={
            deleteType === "pipeline" ? (
              <GitBranch style={{ fontSize: 28 }} />
            ) : deleteType === "project" ? (
              <FileText style={{ fontSize: 28 }} />
            ) : (
              <Settings style={{ fontSize: 28 }} />
            )
          }
        />
      )}
    </div>
  );
};

export default ProjectManagementUI;
