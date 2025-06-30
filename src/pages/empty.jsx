import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  User,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  Circle,
  Clock,
  AlertCircle,
} from "lucide-react";

const TaskManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Build a modern e-commerce solution",
      createdAt: "2025-01-15",
      tasks: [1, 2, 3],
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile application",
      createdAt: "2025-02-01",
      tasks: [4, 5],
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Setup Authentication",
      description: "Implement JWT-based auth system",
      status: "Done",
      dueDate: "2025-06-25",
      assignedUser: 2,
      projectId: 1,
      createdAt: "2025-01-16",
    },
    {
      id: 2,
      title: "Design Database Schema",
      description: "Create MongoDB schemas for all entities",
      status: "In Progress",
      dueDate: "2025-06-28",
      assignedUser: 3,
      projectId: 1,
      createdAt: "2025-01-18",
    },
    {
      id: 3,
      title: "Build Product Catalog",
      description: "Create product listing and search functionality",
      status: "To Do",
      dueDate: "2025-07-05",
      assignedUser: 2,
      projectId: 1,
      createdAt: "2025-01-20",
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Design mobile app interfaces",
      status: "In Progress",
      dueDate: "2025-06-30",
      assignedUser: 4,
      projectId: 2,
      createdAt: "2025-02-02",
    },
    {
      id: 5,
      title: "API Integration",
      description: "Connect mobile app to backend APIs",
      status: "To Do",
      dueDate: "2025-07-10",
      assignedUser: 3,
      projectId: 2,
      createdAt: "2025-02-05",
    },
  ]);

  const [users] = useState([
    { id: 1, name: "Raashid", email: "raashid@company.com", role: "Admin" },
    { id: 2, name: "Sri Ganesh", email: "ganesh@company.com", role: "Member" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Member",
    },
    { id: 4, name: "Bob Smith", email: "bob@company.com", role: "Member" },
  ]);

  const [formData, setFormData] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Login/Auth functions
  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentPage("dashboard");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  // Task management functions
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      ...taskData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([...tasks, newTask]);
  };

  const addProject = (projectData) => {
    const newProject = {
      id: Math.max(...projects.map((p) => p.id)) + 1,
      ...projectData,
      tasks: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects([...projects, newProject]);
  };

  // Analytics data
  const getTaskStatusData = () => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color:
        status === "Done"
          ? "#10b981"
          : status === "In Progress"
          ? "#f59e0b"
          : "#6b7280",
    }));
  };

  const getTaskCompletionData = () => {
    const completedTasks = tasks.filter((t) => t.status === "Done");
    const dates = [...new Set(completedTasks.map((t) => t.createdAt))].sort();

    return dates.map((date) => ({
      date,
      completed: completedTasks.filter((t) => t.createdAt === date).length,
    }));
  };

  // Component renders
  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (handleLogin(email, password)) {
        setError("");
      } else {
        setError("Invalid credentials");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-sm">
              <strong>Admin:</strong> raashid@company.com
            </p>
            <p className="text-sm">
              <strong>Member:</strong> ganesh@company.com
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Password: any text works for demo
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Navbar = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Task Manager
            </h1>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === "dashboard"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage("projects")}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === "projects"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentPage("tasks")}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === "tasks"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setCurrentPage("analytics")}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === "analytics"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">{currentUser?.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  currentUser?.role === "Admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {currentUser?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => {
    const userTasks =
      currentUser?.role === "Admin"
        ? tasks
        : tasks.filter((t) => t.assignedUser === currentUser?.id);
    const statusCounts = userTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {currentUser?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Completed Tasks
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts["Done"] || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts["In Progress"] || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Circle className="w-8 h-8 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">To Do</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts["To Do"] || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Projects
            </h3>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {project.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setCurrentPage("project-detail");
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {userTasks
                .filter((task) => task.status !== "Done")
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 3)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KanbanBoard = () => {
    const userTasks =
      currentUser?.role === "Admin"
        ? tasks
        : tasks.filter((t) => t.assignedUser === currentUser?.id);
    const columns = ["To Do", "In Progress", "Done"];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Task Board</h2>
          {currentUser?.role === "Admin" && (
            <button
              onClick={() => {
                setModalType("task");
                setShowModal(true);
                setFormData({});
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{status}</h3>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {userTasks.filter((task) => task.status === status).length}
                </span>
              </div>
              <div className="space-y-3">
                {userTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-md p-4 shadow-sm border"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Due: {task.dueDate}</span>
                        <span>
                          {users.find((u) => u.id === task.assignedUser)?.name}
                        </span>
                      </div>
                      {currentUser?.role === "Admin" && (
                        <div className="mt-3 flex space-x-2">
                          {status !== "To Do" && (
                            <button
                              onClick={() =>
                                updateTaskStatus(
                                  task.id,
                                  status === "Done" ? "In Progress" : "To Do"
                                )
                              }
                              className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                              ← Move Left
                            </button>
                          )}
                          {status !== "Done" && (
                            <button
                              onClick={() =>
                                updateTaskStatus(
                                  task.id,
                                  status === "To Do" ? "In Progress" : "Done"
                                )
                              }
                              className="text-green-600 hover:text-green-700 text-xs"
                            >
                              Move Right →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProjectsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        {currentUser?.role === "Admin" && (
          <button
            onClick={() => {
              setModalType("project");
              setShowModal(true);
              setFormData({});
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Created: {project.createdAt}</span>
              <span>{project.tasks.length} tasks</span>
            </div>
            <button
              onClick={() => {
                setSelectedProject(project);
                setCurrentPage("project-detail");
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectDetail = () => {
    if (!selectedProject) return null;
    const projectTasks = tasks.filter(
      (t) => t.projectId === selectedProject.id
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage("projects")}
            className="text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Projects
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedProject.title}
          </h2>
          <p className="text-gray-600">{selectedProject.description}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Project Tasks
            </h3>
            {currentUser?.role === "Admin" && (
              <button
                onClick={() => {
                  setModalType("task");
                  setShowModal(true);
                  setFormData({ projectId: selectedProject.id });
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {projectTasks.map((task) => (
              <div key={task.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Assigned to:{" "}
                    {users.find((u) => u.id === task.assignedUser)?.name}
                  </span>
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsPage = () => {
    const statusData = getTaskStatusData();
    const completionData = getTaskCompletionData();

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Analytics Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Task Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Task Completion Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Task Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={users.map((user) => ({
                name: user.name,
                tasks: tasks.filter((t) => t.assignedUser === user.id).length,
                completed: tasks.filter(
                  (t) => t.assignedUser === user.id && t.status === "Done"
                ).length,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#6b7280" name="Total Tasks" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const Modal = () => {
    if (!showModal) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (modalType === "project") {
        addProject(formData);
      } else if (modalType === "task") {
        addTask({
          ...formData,
          assignedUser: parseInt(formData.assignedUser),
          projectId: parseInt(formData.projectId),
          status: formData.status || "To Do",
        });
      }
      setShowModal(false);
      setFormData({});
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {modalType === "project" ? "Create New Project" : "Create New Task"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            {modalType === "task" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                  </label>
                  <select
                    value={formData.projectId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, projectId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select
                    value={formData.assignedUser || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedUser: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select User</option>
                    {users
                      .filter((u) => u.role === "Member")
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || "To Do"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setFormData({});
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create {modalType === "project" ? "Project" : "Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "project-detail" && <ProjectDetail />}
      {currentPage === "tasks" && <KanbanBoard />}
      {currentPage === "analytics" && <AnalyticsPage />}
      <Modal />
    </div>
  );
};

export default TaskManagementSystem;
