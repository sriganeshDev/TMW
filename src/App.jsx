import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CommonLayout from "./pages/CommonLayout/CommonLayout";
import TaskManagementSystem from "./pages/empty";
import Project from "./pages/Projects/ProjectPage";
import SplitScreenAuthUI from "./pages/auth/RegisterandLogin";
import ViewProjectUI from "./pages/Projects/ViewProject";
import AllTask from "./pages/Tasks/AllTask";
import TaskAccordionUI from "./components/task/emptytask";
import UserManagement from "./pages/User/UserPage";
import ProfileSettings from "./pages/Profile/ProfileSettings";
import Todo from "./pages/Todo/Todo";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { ProjectDetailsPage } from "./components/projects/UserProject/UserProjectDetails";
import LoginScreen from "./components/empty";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SplitScreenAuthUI />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="TaskManagementSystem" element={<TaskManagementSystem />} />
        <Route
          path="/smart-HR"
          element={
            <ProtectedRoute>
              <CommonLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          {/* <Route path="dashboard" element={<TaskManagementSystem />} /> */}
          <Route path="project" element={<Project />} />
          <Route path="view-project" element={<ViewProjectUI />} />
          <Route path="tasks" element={<AllTask />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="todo" element={<Todo />} />
          <Route path="View-project-task" element={<ProjectDetailsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import CommonLayout from "./pages/CommonLayout/CommonLayout";
// import TaskManagementSystem from "./pages/empty";
// import Project from "./pages/Projects/ProjectPage";
// import SplitScreenAuthUI from "./pages/auth/RegisterandLogin";
// import ViewProjectUI from "./pages/Projects/ViewProject";
// import AllTask from "./pages/Tasks/AllTask";
// import TaskAccordionUI from "./components/task/emptytask";
// import UserManagement from "./pages/User/UserPage";
// import ProfileSettings from "./pages/Profile/ProfileSettings";
// import Todo from "./pages/Todo/Todo";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import DashboardPage from "./pages/dashboard/DashboardPage";
// import { ProjectDetailsPage } from "./components/projects/UserProject/UserProjectDetails";

// // Role-based route protection component
// const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const userRole = localStorage.getItem("role");

//   if (!allowedRoles.includes(userRole)) {
//     // Redirect to dashboard or show access denied
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return children;
// };

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<SplitScreenAuthUI />} />
//         <Route path="TaskManagementSystem" element={<TaskManagementSystem />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <CommonLayout />
//             </ProtectedRoute>
//           }
//         >
//           {/* Routes accessible by both Admin and Member */}
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="project" element={<Project />} />
//           <Route path="view-project" element={<ViewProjectUI />} />
//           <Route path="tasks" element={<AllTask />} />
//           <Route path="profile" element={<ProfileSettings />} />
//           <Route path="todo" element={<Todo />} />
//           <Route path="View-project-task" element={<ProjectDetailsPage />} />

//           {/* Routes accessible only by Admin */}
//           <Route
//             path="users"
//             element={
//               <RoleProtectedRoute allowedRoles={["Admin"]}>
//                 <UserManagement />
//               </RoleProtectedRoute>
//             }
//           />

//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;
