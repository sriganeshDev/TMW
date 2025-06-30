// // import React, { useState, useEffect } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
// // import { Users, FolderKanban, ClipboardCheck, ListChecks } from "lucide-react";
// // import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// // const UserDashboard = () => {
// //   const [timeRange, setTimeRange] = useState("7days");
// //   const [selectedProject, setSelectedProject] = useState("all");
// //   const [userRole, setUserRole] = useState("member");
// //   const [userName, setUserName] = useState("User");
// //   const [analyticsData, setAnalyticsData] = useState({
// //     taskStatusData: [],
// //     completionTrends: [],
// //     userTaskData: [],
// //     overallStats: {},
// //   });

// //   useEffect(() => {
// //     // Get user info from localStorage
// //     const storedRole = localStorage.getItem("userRole") || "member";
// //     const storedUserName = localStorage.getItem("userName") || "User";
// //     setUserRole(storedRole);
// //     setUserName(storedUserName);
// //   }, []);

// //   // Mock data for user - Replace with actual API calls filtered by user
// //   useEffect(() => {
// //     const fetchUserAnalyticsData = () => {
// //       // Mock data for the logged-in user only
// //       const mockUserData = {
// //         taskStatusData: [
// //           { name: "To Do", value: 30, count: 3 },
// //           { name: "In Progress", value: 50, count: 5 },
// //           { name: "Completed", value: 20, count: 2 },
// //         ],
// //         completionTrends: [
// //           { date: "2024-06-20", completed: 1, created: 2 },
// //           { date: "2024-06-21", completed: 2, created: 1 },
// //           { date: "2024-06-22", completed: 1, created: 2 },
// //           { date: "2024-06-23", completed: 3, created: 1 },
// //           { date: "2024-06-24", completed: 1, created: 2 },
// //           { date: "2024-06-25", completed: 2, created: 1 },
// //           { date: "2024-06-26", completed: 2, created: 2 },
// //         ],
// //         userTaskData: [
// //           {
// //             userName: userName,
// //             assigned: 10,
// //             completed: 2,
// //             inProgress: 5,
// //             todo: 3,
// //           },
// //         ],
// //         overallStats: {
// //           totalTasks: 10,
// //           completedTasks: 2,
// //           totalProjects: 3, // Projects user is involved in
// //           activeUsers: 1, // Just the user
// //           completionRate: 20,
// //           avgTasksPerUser: 10,
// //         },
// //       };
// //       setAnalyticsData(mockUserData);
// //     };

// //     fetchUserAnalyticsData();
// //   }, [timeRange, selectedProject, userName]);

// //   const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

// //   const CustomTooltip = ({ active, payload, label }) => {
// //     if (active && payload && payload.length) {
// //       return (
// //         <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
// //           <p className="font-medium">{`${label}`}</p>
// //           {payload.map((entry, index) => (
// //             <p key={index} style={{ color: entry.color }}>
// //               {`${entry.dataKey}: ${entry.value}`}
// //             </p>
// //           ))}
// //         </div>
// //       );
// //     }
// //     return null;
// //   };

// //   const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
// //     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm font-medium text-gray-600">{title}</p>
// //           <p className={`text-2xl font-bold ${color}`}>{value}</p>
// //           {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
// //         </div>
// //         <Icon className={`h-8 w-8 ${color}`} />
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-4 sm:mb-6 lg:mb-8">
// //           <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
// //             Welcome {userName}
// //           </h1>
// //           <p className="text-sm sm:text-base text-gray-600">
// //             Track your assigned tasks and project progress
// //           </p>
// //         </div>

// //         <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
// //           <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
// //             <div className="flex items-center gap-2 w-full sm:w-auto">
// //               <CalendarMonthOutlinedIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
// //               <select
// //                 value={timeRange}
// //                 onChange={(e) => setTimeRange(e.target.value)}
// //                 className="border border-gray-300 rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
// //               >
// //                 <option value="7days">Last 7 Days</option>
// //                 <option value="30days">Last 30 Days</option>
// //                 <option value="90days">Last 90 Days</option>
// //                 <option value="1year">Last Year</option>
// //               </select>
// //             </div>
// //             <div className="flex items-center gap-2 w-full sm:w-auto">
// //               <AccountTreeOutlinedIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
// //               <select
// //                 value={selectedProject}
// //                 onChange={(e) => setSelectedProject(e.target.value)}
// //                 className="border border-gray-300 rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
// //               >
// //                 <option value="all">All My Projects</option>
// //                 <option value="project1">E-commerce Website</option>
// //                 <option value="project2">Mobile App Development</option>
// //                 <option value="project3">Data Analytics Platform</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
// //           <StatCard
// //             title="My Tasks"
// //             value={analyticsData.overallStats.totalTasks}
// //             icon={ListChecks}
// //             color="text-blue-600"
// //           />
// //           <StatCard
// //             title="Completed"
// //             value={analyticsData.overallStats.completedTasks}
// //             icon={ClipboardCheck}
// //             color="text-green-600"
// //             subtitle={`${analyticsData.overallStats.completionRate}% completion rate`}
// //           />
// //           <StatCard
// //             title="My Projects"
// //             value={analyticsData.overallStats.totalProjects}
// //             icon={FolderKanban}
// //             color="text-purple-600"
// //           />
// //           <StatCard
// //             title="In Progress"
// //             value={analyticsData.userTaskData[0]?.inProgress || 0}
// //             icon={Users}
// //             color="text-orange-600"
// //             subtitle="Active tasks"
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
// //           <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
// //             <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
// //               My Task Status Distribution
// //             </h3>
// //             <div
// //               className="w-full focus:outline-none"
// //               tabIndex={-1}
// //               style={{ minHeight: "250px" }}
// //             >
// //               <ResponsiveContainer width="100%" height={250} minWidth={250}>
// //                 <PieChart>
// //                   <Pie
// //                     data={analyticsData.taskStatusData}
// //                     cx="50%"
// //                     cy="50%"
// //                     labelLine={false}
// //                     label={({ name, percent }) =>
// //                       window.innerWidth > 640
// //                         ? `${name} ${(percent * 100).toFixed(0)}%`
// //                         : `${(percent * 100).toFixed(0)}%`
// //                     }
// //                     outerRadius={
// //                       window.innerWidth < 480
// //                         ? 60
// //                         : window.innerWidth < 768
// //                         ? 70
// //                         : 80
// //                     }
// //                     fill="#8884d8"
// //                     dataKey="value"
// //                   >
// //                     {analyticsData.taskStatusData.map((entry, index) => (
// //                       <Cell
// //                         key={`cell-${index}`}
// //                         fill={COLORS[index % COLORS.length]}
// //                       />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip formatter={(value, name) => [`${value}%`, name]} />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>
// //             <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mt-3 sm:mt-4">
// //               {analyticsData.taskStatusData.map((item, index) => (
// //                 <div key={item.name} className="flex items-center">
// //                   <div
// //                     className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
// //                     style={{ backgroundColor: COLORS[index % COLORS.length] }}
// //                   ></div>
// //                   <span className="text-xs sm:text-sm text-gray-600">
// //                     {item.name}: {item.count}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
// //             <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
// //               My Task Completion Trends
// //             </h3>
// //             <div
// //               className="w-full focus:outline-none"
// //               tabIndex={-1}
// //               style={{ minHeight: "250px" }}
// //             >
// //               <ResponsiveContainer width="100%" height={250} minWidth={250}>
// //                 <LineChart
// //                   data={analyticsData.completionTrends}
// //                   margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
// //                 >
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis
// //                     dataKey="date"
// //                     padding={{ left: 0, right: 0 }}
// //                     tickFormatter={(value) => {
// //                       const date = new Date(value);
// //                       return window.innerWidth < 640
// //                         ? date.toLocaleDateString("en-US", {
// //                             month: "numeric",
// //                             day: "numeric",
// //                           })
// //                         : date.toLocaleDateString("en-US", {
// //                             month: "short",
// //                             day: "numeric",
// //                           });
// //                     }}
// //                     tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
// //                   />
// //                   <YAxis
// //                     padding={{ top: 0, bottom: 0 }}
// //                     tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
// //                   />
// //                   <Tooltip
// //                     content={CustomTooltip}
// //                     labelFormatter={(value) =>
// //                       new Date(value).toLocaleDateString()
// //                     }
// //                   />
// //                   <Legend
// //                     wrapperStyle={{
// //                       fontSize: window.innerWidth < 640 ? "12px" : "14px",
// //                     }}
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="completed"
// //                     stroke="#82ca9d"
// //                     strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
// //                     name="Completed"
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="created"
// //                     stroke="#8884d8"
// //                     strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
// //                     name="Assigned"
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //             My Task Progress
// //           </h3>
// //           <ResponsiveContainer
// //             width="100%"
// //             className="w-full focus:outline-none"
// //             tabIndex={-1}
// //             height={400}
// //           >
// //             <BarChart
// //               data={analyticsData.userTaskData}
// //               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //             >
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="userName" />
// //               <YAxis />
// //               <Tooltip content={CustomTooltip} />
// //               <Legend />
// //               <Bar
// //                 dataKey="completed"
// //                 stackId="a"
// //                 fill="#82ca9d"
// //                 name="Completed"
// //               />
// //               <Bar
// //                 dataKey="inProgress"
// //                 stackId="a"
// //                 fill="#ffc658"
// //                 name="In Progress"
// //               />
// //               <Bar dataKey="todo" stackId="a" fill="#8884d8" name="To Do" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-md mt-6">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //             My Task Summary
// //           </h3>
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Name
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Total Assigned
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Completed
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     In Progress
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Completion Rate
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {analyticsData.userTaskData.map((user, index) => (
// //                   <tr key={index} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex items-center">
// //                         <div className="flex-shrink-0 h-8 w-8">
// //                           <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
// //                             {user.userName
// //                               .split(" ")
// //                               .map((n) => n[0])
// //                               .join("")}
// //                           </div>
// //                         </div>
// //                         <div className="ml-4">
// //                           <div className="text-sm font-medium text-gray-900">
// //                             {user.userName} (You)
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {user.assigned}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
// //                       {user.completed}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
// //                       {user.inProgress}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex items-center">
// //                         <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
// //                           <div
// //                             className="bg-green-500 h-2 rounded-full"
// //                             style={{
// //                               width: `${
// //                                 (user.completed / user.assigned) * 100
// //                               }%`,
// //                             }}
// //                           ></div>
// //                         </div>
// //                         <span className="text-sm text-gray-600">
// //                           {Math.round((user.completed / user.assigned) * 100)}%
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Recent Tasks Section */}
// //         <div className="bg-white p-6 rounded-lg shadow-md mt-6">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //             Recent Tasks
// //           </h3>
// //           <div className="space-y-3">
// //             {[
// //               {
// //                 title: "Update user authentication",
// //                 status: "In Progress",
// //                 dueDate: "2024-06-28",
// //                 priority: "High",
// //               },
// //               {
// //                 title: "Fix responsive design issues",
// //                 status: "To Do",
// //                 dueDate: "2024-06-30",
// //                 priority: "Medium",
// //               },
// //               {
// //                 title: "Implement search functionality",
// //                 status: "Completed",
// //                 dueDate: "2024-06-25",
// //                 priority: "High",
// //               },
// //               {
// //                 title: "Write API documentation",
// //                 status: "In Progress",
// //                 dueDate: "2024-07-02",
// //                 priority: "Low",
// //               },
// //             ].map((task, index) => (
// //               <div
// //                 key={index}
// //                 className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
// //               >
// //                 <div className="flex-1">
// //                   <h4 className="text-sm font-medium text-gray-900">
// //                     {task.title}
// //                   </h4>
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     Due: {task.dueDate}
// //                   </p>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span
// //                     className={`px-2 py-1 text-xs rounded-full ${
// //                       task.priority === "High"
// //                         ? "bg-red-100 text-red-800"
// //                         : task.priority === "Medium"
// //                         ? "bg-yellow-100 text-yellow-800"
// //                         : "bg-green-100 text-green-800"
// //                     }`}
// //                   >
// //                     {task.priority}
// //                   </span>
// //                   <span
// //                     className={`px-2 py-1 text-xs rounded-full ${
// //                       task.status === "Completed"
// //                         ? "bg-green-100 text-green-800"
// //                         : task.status === "In Progress"
// //                         ? "bg-blue-100 text-blue-800"
// //                         : "bg-gray-100 text-gray-800"
// //                     }`}
// //                   >
// //                     {task.status}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
// import { Users, FolderKanban, ClipboardCheck, ListChecks } from "lucide-react";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import {
//   getUserOverallStats,
//   getUserTaskStatusData,
//   getUserCompletionTrends,
//   getUserTaskData,
//   getUserRecentTasks,
//   getUserProjects,
//   getUserDashboardData,
// } from "../../services/dashboard/UserDashBoardServices";

// const UserDashboard = () => {
//   const [timeRange, setTimeRange] = useState("7days");
//   const [selectedProject, setSelectedProject] = useState("all");
//   const [userRole, setUserRole] = useState("member");
//   const [userName, setUserName] = useState("User");
//   const [userId, setUserId] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [recentTasks, setRecentTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [analyticsData, setAnalyticsData] = useState({
//     taskStatusData: [],
//     completionTrends: [],
//     userTaskData: [],
//     overallStats: {},
//   });

//   useEffect(() => {
//     // Get user info from localStorage
//     const storedRole = localStorage.getItem("userRole") || "member";
//     const storedUserName = localStorage.getItem("userName") || "User";
//     const storedUserId = localStorage.getItem("userId");

//     setUserRole(storedRole);
//     setUserName(storedUserName);
//     setUserId(storedUserId);
//   }, []);

//   // Fetch user projects
//   useEffect(() => {
//     const fetchUserProjects = async () => {
//       if (!userId) return;

//       try {
//         const response = await getUserProjects(userId);
//         if (response.success) {
//           setProjects(response.data || []);
//         }
//       } catch (error) {
//         console.error("Error fetching user projects:", error);
//         setError("Failed to load projects");
//       }
//     };

//     fetchUserProjects();
//   }, [userId]);

//   // Fetch recent tasks
//   useEffect(() => {
//     const fetchRecentTasks = async () => {
//       if (!userId) return;

//       try {
//         const response = await getUserRecentTasks(userId, 5); // Get 5 recent tasks
//         if (response.success) {
//           setRecentTasks(response.data || []);
//         }
//       } catch (error) {
//         console.error("Error fetching recent tasks:", error);
//       }
//     };

//     fetchRecentTasks();
//   }, [userId]);

//   // Fetch analytics data
//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       if (!userId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         // Option 1: Use the consolidated API call
//         const dashboardResponse = await getUserDashboardData(
//           userId,
//           timeRange,
//           selectedProject === "all" ? "" : selectedProject
//         );

//         if (dashboardResponse.success) {
//           const data = dashboardResponse.data;
//           setAnalyticsData({
//             taskStatusData: data.taskStatusData || [],
//             completionTrends: data.completionTrends || [],
//             userTaskData: data.userTaskData || [],
//             overallStats: data.overallStats || {},
//           });
//         } else {
//           throw new Error(
//             dashboardResponse.message || "Failed to fetch dashboard data"
//           );
//         }

//         // Option 2: Alternative - Make individual API calls if consolidated API is not available
//         /*
//         const [statsResponse, statusResponse, trendsResponse, taskDataResponse] = await Promise.all([
//           getUserOverallStats(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
//           getUserTaskStatusData(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
//           getUserCompletionTrends(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
//           getUserTaskData(userId, timeRange, selectedProject === "all" ? "" : selectedProject)
//         ]);

//         setAnalyticsData({
//           taskStatusData: statusResponse.success ? statusResponse.data : [],
//           completionTrends: trendsResponse.success ? trendsResponse.data : [],
//           userTaskData: taskDataResponse.success ? taskDataResponse.data : [],
//           overallStats: statsResponse.success ? statsResponse.data : {},
//         });
//         */
//       } catch (error) {
//         console.error("Error fetching analytics data:", error);
//         setError("Failed to load dashboard data");

//         // Fallback to empty data
//         setAnalyticsData({
//           taskStatusData: [],
//           completionTrends: [],
//           userTaskData: [],
//           overallStats: {},
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalyticsData();
//   }, [timeRange, selectedProject, userId]);

//   const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
//           <p className="font-medium">{`${label}`}</p>
//           {payload.map((entry, index) => (
//             <p key={index} style={{ color: entry.color }}>
//               {`${entry.dataKey}: ${entry.value}`}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
//     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className={`text-2xl font-bold ${color}`}>{value || 0}</p>
//           {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//         </div>
//         <Icon className={`h-8 w-8 ${color}`} />
//       </div>
//     </div>
//   );

//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center h-32">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//     </div>
//   );

//   const ErrorMessage = ({ message }) => (
//     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
//       <p className="text-red-600 text-sm">{message}</p>
//     </div>
//   );

//   if (!userId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600 mb-4">
//             Please log in to view your dashboard
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-4 sm:mb-6 lg:mb-8">
//           <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
//             Welcome {userName}
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600">
//             Track your assigned tasks and project progress
//           </p>
//         </div>

//         {error && <ErrorMessage message={error} />}

//         <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
//           <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <CalendarMonthOutlinedIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
//               <select
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="border border-gray-300 rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
//                 disabled={loading}
//               >
//                 <option value="7days">Last 7 Days</option>
//                 <option value="30days">Last 30 Days</option>
//                 <option value="90days">Last 90 Days</option>
//                 <option value="1year">Last Year</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <AccountTreeOutlinedIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
//               <select
//                 value={selectedProject}
//                 onChange={(e) => setSelectedProject(e.target.value)}
//                 className="border border-gray-300 rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
//                 disabled={loading}
//               >
//                 <option value="all">All My Projects</option>
//                 {projects.map((project) => (
//                   <option key={project.id} value={project.id}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <StatCard
//                 title="My Tasks"
//                 value={analyticsData.overallStats.totalTasks}
//                 icon={ListChecks}
//                 color="text-blue-600"
//               />
//               <StatCard
//                 title="Completed"
//                 value={analyticsData.overallStats.completedTasks}
//                 icon={ClipboardCheck}
//                 color="text-green-600"
//                 subtitle={`${
//                   analyticsData.overallStats.completionRate || 0
//                 }% completion rate`}
//               />
//               <StatCard
//                 title="My Projects"
//                 value={analyticsData.overallStats.totalProjects}
//                 icon={FolderKanban}
//                 color="text-purple-600"
//               />
//               <StatCard
//                 title="In Progress"
//                 value={analyticsData.userTaskData[0]?.inProgress || 0}
//                 icon={Users}
//                 color="text-orange-600"
//                 subtitle="Active tasks"
//               />
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
//               <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
//                   My Task Status Distribution
//                 </h3>
//                 {analyticsData.taskStatusData.length > 0 ? (
//                   <>
//                     <div
//                       className="w-full focus:outline-none"
//                       tabIndex={-1}
//                       style={{ minHeight: "250px" }}
//                     >
//                       <ResponsiveContainer
//                         width="100%"
//                         height={250}
//                         minWidth={250}
//                       >
//                         <PieChart>
//                           <Pie
//                             data={analyticsData.taskStatusData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({ name, percent }) =>
//                               window.innerWidth > 640
//                                 ? `${name} ${(percent * 100).toFixed(0)}%`
//                                 : `${(percent * 100).toFixed(0)}%`
//                             }
//                             outerRadius={
//                               window.innerWidth < 480
//                                 ? 60
//                                 : window.innerWidth < 768
//                                 ? 70
//                                 : 80
//                             }
//                             fill="#8884d8"
//                             dataKey="value"
//                           >
//                             {analyticsData.taskStatusData.map(
//                               (entry, index) => (
//                                 <Cell
//                                   key={`cell-${index}`}
//                                   fill={COLORS[index % COLORS.length]}
//                                 />
//                               )
//                             )}
//                           </Pie>
//                           <Tooltip
//                             formatter={(value, name) => [`${value}%`, name]}
//                           />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mt-3 sm:mt-4">
//                       {analyticsData.taskStatusData.map((item, index) => (
//                         <div key={item.name} className="flex items-center">
//                           <div
//                             className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
//                             style={{
//                               backgroundColor: COLORS[index % COLORS.length],
//                             }}
//                           ></div>
//                           <span className="text-xs sm:text-sm text-gray-600">
//                             {item.name}: {item.count}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <div className="flex items-center justify-center h-64 text-gray-500">
//                     No task data available
//                   </div>
//                 )}
//               </div>

//               <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
//                   My Task Completion Trends
//                 </h3>
//                 {analyticsData.completionTrends.length > 0 ? (
//                   <div
//                     className="w-full focus:outline-none"
//                     tabIndex={-1}
//                     style={{ minHeight: "250px" }}
//                   >
//                     <ResponsiveContainer
//                       width="100%"
//                       height={250}
//                       minWidth={250}
//                     >
//                       <LineChart
//                         data={analyticsData.completionTrends}
//                         margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="date"
//                           padding={{ left: 0, right: 0 }}
//                           tickFormatter={(value) => {
//                             const date = new Date(value);
//                             return window.innerWidth < 640
//                               ? date.toLocaleDateString("en-US", {
//                                   month: "numeric",
//                                   day: "numeric",
//                                 })
//                               : date.toLocaleDateString("en-US", {
//                                   month: "short",
//                                   day: "numeric",
//                                 });
//                           }}
//                           tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
//                         />
//                         <YAxis
//                           padding={{ top: 0, bottom: 0 }}
//                           tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
//                         />
//                         <Tooltip
//                           content={CustomTooltip}
//                           labelFormatter={(value) =>
//                             new Date(value).toLocaleDateString()
//                           }
//                         />
//                         <Legend
//                           wrapperStyle={{
//                             fontSize: window.innerWidth < 640 ? "12px" : "14px",
//                           }}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="completed"
//                           stroke="#82ca9d"
//                           strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
//                           name="Completed"
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="created"
//                           stroke="#8884d8"
//                           strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
//                           name="Assigned"
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-64 text-gray-500">
//                     No trend data available
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 My Task Progress
//               </h3>
//               {analyticsData.userTaskData.length > 0 ? (
//                 <ResponsiveContainer
//                   width="100%"
//                   className="w-full focus:outline-none"
//                   tabIndex={-1}
//                   height={400}
//                 >
//                   <BarChart
//                     data={analyticsData.userTaskData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="userName" />
//                     <YAxis />
//                     <Tooltip content={CustomTooltip} />
//                     <Legend />
//                     <Bar
//                       dataKey="completed"
//                       stackId="a"
//                       fill="#82ca9d"
//                       name="Completed"
//                     />
//                     <Bar
//                       dataKey="inProgress"
//                       stackId="a"
//                       fill="#ffc658"
//                       name="In Progress"
//                     />
//                     <Bar
//                       dataKey="todo"
//                       stackId="a"
//                       fill="#8884d8"
//                       name="To Do"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex items-center justify-center h-64 text-gray-500">
//                   No task progress data available
//                 </div>
//               )}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 My Task Summary
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Total Assigned
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Completed
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         In Progress
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Completion Rate
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {analyticsData.userTaskData.length > 0 ? (
//                       analyticsData.userTaskData.map((user, index) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-8 w-8">
//                                 <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
//                                   {user.userName
//                                     ?.split(" ")
//                                     .map((n) => n[0])
//                                     .join("") || "U"}
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {user.userName || userName} (You)
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {user.assigned || 0}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
//                             {user.completed || 0}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
//                             {user.inProgress || 0}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
//                                 <div
//                                   className="bg-green-500 h-2 rounded-full"
//                                   style={{
//                                     width: `${
//                                       user.assigned > 0
//                                         ? Math.round(
//                                             (user.completed / user.assigned) *
//                                               100
//                                           )
//                                         : 0
//                                     }%`,
//                                   }}
//                                 ></div>
//                               </div>
//                               <span className="text-sm text-gray-600">
//                                 {user.assigned > 0
//                                   ? Math.round(
//                                       (user.completed / user.assigned) * 100
//                                     )
//                                   : 0}
//                                 %
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="px-6 py-4 text-center text-gray-500"
//                         >
//                           No task data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Recent Tasks Section */}
//             <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Recent Tasks
//               </h3>
//               <div className="space-y-3">
//                 {recentTasks.length > 0 ? (
//                   recentTasks.map((task, index) => (
//                     <div
//                       key={task.id || index}
//                       className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                     >
//                       <div className="flex-1">
//                         <h4 className="text-sm font-medium text-gray-900">
//                           {task.title || task.name}
//                         </h4>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Due:{" "}
//                           {task.dueDate
//                             ? new Date(task.dueDate).toLocaleDateString()
//                             : "No due date"}
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {task.priority && (
//                           <span
//                             className={`px-2 py-1 text-xs rounded-full ${
//                               task.priority.toLowerCase() === "high"
//                                 ? "bg-red-100 text-red-800"
//                                 : task.priority.toLowerCase() === "medium"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-green-100 text-green-800"
//                             }`}
//                           >
//                             {task.priority}
//                           </span>
//                         )}
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full ${
//                             task.status?.toLowerCase() === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : task.status?.toLowerCase().includes("progress")
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {task.status || "To Do"}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-gray-500 py-8">
//                     No recent tasks found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Users, FolderKanban, ClipboardCheck, ListChecks } from "lucide-react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import {
  getUserOverallStats,
  getUserTaskStatusData,
  getUserCompletionTrends,
  getUserTaskData,
  getUserRecentTasks,
  getUserProjects,
  getUserDashboardData,
} from "../../services/dashboard/UserDashBoardServices";
import TaskCardUi from "../task/TaskCardUi";
import { useNavigate } from "react-router-dom";
import { CommonDropdown } from "../reusablecomponents/CommonDropDown";

const UserDashboard = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedProject, setSelectedProject] = useState("all");
  const [userRole, setUserRole] = useState("member");
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [analyticsData, setAnalyticsData] = useState({
    taskStatusData: [],
    completionTrends: [],
    userTaskData: [],
    overallStats: {},
  });

  const timeOptions = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "1year", label: "Last Year" },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    // Get user info from localStorage
    const storedRole = localStorage.getItem("userRole") || "member";
    const storedUserName = localStorage.getItem("userName") || "User";
    const storedUserId = localStorage.getItem("userId");

    setUserRole(storedRole);
    setUserName(storedUserName);
    setUserId(storedUserId);
  }, []);
  const projectOptions = [
    { value: "all", label: "All My Projects" },
    ...projects.map((project) => ({
      value: project._id,
      label: project.projectName,
    })),
  ];
  // Fetch user projects
  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!userId) return;

      try {
        const response = await getUserProjects(userId);
        if (response.success) {
          setProjects(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
        setError("Failed to load projects");
      }
    };

    fetchUserProjects();
  }, [userId]);

  // Fetch recent tasks
  useEffect(() => {
    const fetchRecentTasks = async () => {
      if (!userId) return;

      try {
        const response = await getUserRecentTasks(userId, 5); // Get 5 recent tasks
        if (response.success) {
          setRecentTasks(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching recent tasks:", error);
      }
    };

    fetchRecentTasks();
  }, [userId]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        // Option 1: Use the consolidated API call
        const dashboardResponse = await getUserDashboardData(
          userId,
          timeRange,
          selectedProject === "all" ? "" : selectedProject
        );

        if (dashboardResponse.success) {
          const data = dashboardResponse.data;
          setAnalyticsData({
            taskStatusData: data.taskStatusData || [],
            completionTrends: data.completionTrends || [],
            userTaskData: data.userTaskData || [],
            overallStats: data.overallStats || {},
          });
        } else {
          throw new Error(
            dashboardResponse.message || "Failed to fetch dashboard data"
          );
        }

        // Option 2: Alternative - Make individual API calls if consolidated API is not available
        /*
        const [statsResponse, statusResponse, trendsResponse, taskDataResponse] = await Promise.all([
          getUserOverallStats(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
          getUserTaskStatusData(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
          getUserCompletionTrends(userId, timeRange, selectedProject === "all" ? "" : selectedProject),
          getUserTaskData(userId, timeRange, selectedProject === "all" ? "" : selectedProject)
        ]);

        setAnalyticsData({
          taskStatusData: statusResponse.success ? statusResponse.data : [],
          completionTrends: trendsResponse.success ? trendsResponse.data : [],
          userTaskData: taskDataResponse.success ? taskDataResponse.data : [],
          overallStats: statsResponse.success ? statsResponse.data : {},
        });
        */
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load dashboard data");

        // Fallback to empty data
        setAnalyticsData({
          taskStatusData: [],
          completionTrends: [],
          userTaskData: [],
          overallStats: {},
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, selectedProject, userId]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
    const bgVariants = {
      "text-blue-600": "bg-blue-600/10",
      "text-green-600": "bg-green-600/10",
      "text-purple-600": "bg-purple-600/10",
      "text-orange-600": "bg-orange-600/10",
    };
    const bgColor = bgVariants[color] || "bg-gray-100";
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value || 0}</p>
            {subtitle && (
              <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={`p-2 rounded-full ${bgColor} flex items-center justify-center`}
          >
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="w-full h-[85vh] flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="loader "></div>
      </div>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );

  const handleTaskMenuClick = (event, task) => {
    console.log("Taskdddddashhh :", task);
    navigate("/smart-HR/todo");
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Welcome {userName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your assigned tasks and project progress
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="bg-white p-3 w-full flex justify-end sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
            {/* Time Range Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-[240px]">
              <CalendarMonthOutlinedIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <CommonDropdown
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                options={timeOptions}
                placeholder="Select Time Range"
                disabled={loading}
                fullWidth
              />
            </div>

            {/* Project Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-[280px]">
              <AccountTreeOutlinedIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <CommonDropdown
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                options={projectOptions}
                placeholder="Select Project"
                disabled={loading}
                fullWidth
              />
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              <StatCard
                title="My Tasks"
                value={analyticsData.overallStats.totalTasks}
                icon={ListChecks}
                color="text-blue-600"
              />
              <StatCard
                title="Completed"
                value={analyticsData.overallStats.completedTasks}
                icon={ClipboardCheck}
                color="text-green-600"
                subtitle={`${
                  analyticsData.overallStats.completionRate || 0
                }% completion rate`}
              />
              <StatCard
                title="My Projects"
                value={analyticsData.overallStats.totalProjects}
                icon={FolderKanban}
                color="text-purple-600"
              />
              <StatCard
                title="In Progress"
                value={analyticsData.userTaskData[0]?.inProgress || 0}
                icon={Users}
                color="text-orange-600"
                subtitle="Active tasks"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  My Task Status Distribution
                </h3>
                {analyticsData.taskStatusData.length > 0 ? (
                  <>
                    <div
                      className="w-full focus:outline-none"
                      tabIndex={-1}
                      style={{ minHeight: "250px" }}
                    >
                      <ResponsiveContainer
                        width="100%"
                        height={250}
                        minWidth={250}
                      >
                        <PieChart>
                          <Pie
                            data={analyticsData.taskStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              window.innerWidth > 640
                                ? `${name} ${(percent * 100).toFixed(0)}%`
                                : `${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={
                              window.innerWidth < 480
                                ? 60
                                : window.innerWidth < 768
                                ? 70
                                : 80
                            }
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {analyticsData.taskStatusData.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => [`${value}%`, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mt-3 sm:mt-4">
                      {analyticsData.taskStatusData.map((item, index) => (
                        <div key={item.name} className="flex items-center">
                          <div
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          <span className="text-xs sm:text-sm text-gray-600">
                            {item.name}: {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    No task data available
                  </div>
                )}
              </div>

              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  My Task Completion Trends
                </h3>
                {analyticsData.completionTrends.length > 0 ? (
                  <div
                    className="w-full focus:outline-none"
                    tabIndex={-1}
                    style={{ minHeight: "250px" }}
                  >
                    <ResponsiveContainer
                      width="100%"
                      height={250}
                      minWidth={250}
                    >
                      <LineChart
                        data={analyticsData.completionTrends}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          padding={{ left: 0, right: 0 }}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return window.innerWidth < 640
                              ? date.toLocaleDateString("en-US", {
                                  month: "numeric",
                                  day: "numeric",
                                })
                              : date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                });
                          }}
                          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                        />
                        <YAxis
                          padding={{ top: 0, bottom: 0 }}
                          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                        />
                        <Tooltip
                          content={CustomTooltip}
                          labelFormatter={(value) =>
                            new Date(value).toLocaleDateString()
                          }
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: window.innerWidth < 640 ? "12px" : "14px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#82ca9d"
                          strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
                          name="Completed"
                        />
                        <Line
                          type="monotone"
                          dataKey="created"
                          stroke="#8884d8"
                          strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
                          name="Assigned"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    No trend data available
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                My Task Progress
              </h3>
              {analyticsData.userTaskData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  className="w-full focus:outline-none"
                  tabIndex={-1}
                  height={400}
                >
                  <BarChart
                    data={analyticsData.userTaskData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="userName" />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      content={CustomTooltip}
                    />
                    <Legend />
                    <Bar
                      dataKey="completed"
                      fill="#82ca9d"
                      name="Completed"
                      barSize={50}
                    />
                    <Bar
                      dataKey="inProgress"
                      fill="#ffc658"
                      name="In Progress"
                      barSize={50}
                    />
                    <Bar
                      dataKey="todo"
                      fill="#8884d8"
                      name="To Do"
                      barSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  No task progress data available
                </div>
              )}
            </div>

            {/* Recent Tasks and My Task Summary - Side by Side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Tasks Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Tasks
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentTasks.length > 0 ? (
                    recentTasks.map((task, index) => (
                      <TaskCardUi
                        module="dashboard"
                        key={task.id || index}
                        task={{
                          ...task,
                          taskTitle: task.title || task.taskTitle || task.name,
                          TaskDueDate: task.dueDate || task.TaskDueDate,
                          taskPriority: task.priority || task.taskPriority,
                          assignedTo: task.assignedTo || {
                            userName: task.assignedToName || "You",
                          },
                        }}
                        onMenuClick={handleTaskMenuClick}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No recent tasks found
                    </div>
                  )}
                </div>
              </div>

              {/* My Task Summary Section */}
              <div className="bg-white p-6 rounded-2xl shadow-md w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  My Task Summary
                </h3>

                {analyticsData.userTaskData.length > 0 ? (
                  <div className="flex flex-col space-y-5 w-full">
                    {analyticsData.userTaskData.map((user, index) => {
                      const completionRate =
                        user.assigned > 0
                          ? Math.round((user.completed / user.assigned) * 100)
                          : 0;

                      return (
                        <div
                          key={index}
                          className="w-full bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5"
                        >
                          {/* User Info */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                              {user.userName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-gray-900">
                                {user.userName || userName}{" "}
                                <span className="text-sm text-gray-400">
                                  (You)
                                </span>
                              </h4>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-800">
                                Assigned:
                              </span>{" "}
                              {user.assigned || 0}
                            </p>
                            <p className="text-green-600 font-semibold">
                              Completed: {user.completed || 0}
                            </p>
                            <p className="text-yellow-600 font-semibold">
                              In Progress: {user.inProgress || 0}
                            </p>
                          </div>

                          {/* Completion Bar */}
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 font-medium">
                                Completion Rate
                              </span>
                              <span className="text-gray-600">
                                {completionRate}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500 transition-all"
                                style={{ width: `${completionRate}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No task data available
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
