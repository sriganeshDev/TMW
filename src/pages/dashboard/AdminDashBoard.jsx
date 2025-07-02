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
  getAllAnalytics,
  getProjects,
} from "../../services/dashboard/AdminDashboardServices";
import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
import StatCard from "../../components/DashBoard/StactCard";

const AdminDashBoard = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedProject, setSelectedProject] = useState("all");
  const [pieIndex, setPieIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    taskStatusData: [],
    completionTrends: [],
    userTaskData: [],
    overallStats: {
      totalTasks: 0,
      completedTasks: 0,
      totalProjects: 0,
      activeUsers: 0,
      completionRate: 0,
      avgTasksPerUser: 0,
    },
  });

  const timeOptions = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "1year", label: "Last Year" },
  ];

  const projectOptions = [
    { value: "all", label: "All Projects" },
    ...projects.map((project) => ({
      value: project._id,
      label: project.projectName,
    })),
  ];
  // <<<<<-----Fetch projects Name----->>>>>>
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.success) {
          setProjects(response.data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  //<<<<<<<---------- Fetch analytics data  -------->>>>>
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllAnalytics(timeRange, selectedProject);

        if (response.success) {
          setAnalyticsData({
            taskStatusData: response.data.taskStatusData || [],
            completionTrends: response.data.completionTrends || [],
            userTaskData: response.data.userTaskData || [],
            overallStats: response.data.overallStats || {
              totalTasks: 0,
              completedTasks: 0,
              totalProjects: 0,
              activeUsers: 0,
              completionRate: 0,
              avgTasksPerUser: 0,
            },
          });
        } else {
          throw new Error(response.message || "Failed to fetch analytics data");
        }
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again.");

        setAnalyticsData({
          taskStatusData: [],
          completionTrends: [],
          userTaskData: [],
          overallStats: {
            totalTasks: 0,
            completedTasks: 0,
            totalProjects: 0,
            activeUsers: 0,
            completionRate: 0,
            avgTasksPerUser: 0,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, selectedProject]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name || entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">ERROR</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="mb-4 sm:mb-6 lg:mb-8"></div>
        <div
          className="mb-4 w-full bg-white sticky top-16
         p-3 flex justify-between sm:mb-6 lg:mb-8 z-50"
        >
          <div>
            {" "}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Welcome Sri
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track project progress and team performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 w-full sm:w-60">
              <CalendarMonthOutlinedIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <CommonDropdown
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                options={timeOptions}
                placeholder="Select Time Range"
                required={false}
                fullWidth={true}
                disabled={loading}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-80">
              <AccountTreeOutlinedIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <CommonDropdown
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                options={projectOptions}
                placeholder="Select Project"
                required={false}
                fullWidth={true}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Tasks"
            value={analyticsData.overallStats.totalTasks}
            icon={ListChecks}
            color="text-blue-600"
          />
          <StatCard
            title="Completed Tasks"
            value={analyticsData.overallStats.completedTasks}
            icon={ClipboardCheck}
            color="text-green-600"
            subtitle={`${analyticsData.overallStats.completionRate}% completion rate`}
          />
          <StatCard
            title="Total Projects"
            value={analyticsData.overallStats.totalProjects}
            icon={FolderKanban}
            color="text-purple-600"
          />
          <StatCard
            title="Team Members"
            value={analyticsData.overallStats.activeUsers}
            icon={Users}
            color="text-orange-600"
            subtitle={`${analyticsData.overallStats.avgTasksPerUser} avg tasks/user`}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Task Status Distribution
            </h3>
            {analyticsData.taskStatusData.length > 0 ? (
              <>
                <div
                  className="w-full focus:outline-none"
                  tabIndex={-1}
                  style={{ minHeight: "250px" }}
                >
                  <ResponsiveContainer width="100%" height={250} minWidth={250}>
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
                        {analyticsData.taskStatusData.map((entry, index) => (
                          <Cell
                            onMouseEnter={() => setPieIndex(index)}
                            onMouseLeave={() => setPieIndex(null)}
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (
                            active &&
                            payload &&
                            payload.length &&
                            pieIndex !== null
                          ) {
                            const item = payload[0];
                            return (
                              <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: COLORS[pieIndex] }}
                                >
                                  {`${item.name}: ${item.value}`}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
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
                No task status data available
              </div>
            )}
          </div>

          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Task Completion Trends
            </h3>
            {analyticsData.completionTrends.length > 0 ? (
              <div
                className="w-full focus:outline-none"
                tabIndex={-1}
                style={{ minHeight: "250px" }}
              >
                <ResponsiveContainer width="100%" height={250} minWidth={250}>
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
                      name="Created"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No completion trends data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User-wise Task Analytics
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
                  stackId="a"
                  fill="#82ca9d"
                  name="Completed"
                  barSize={50}
                />
                <Bar
                  dataKey="inProgress"
                  stackId="a"
                  fill="#ffc658"
                  name="In Progress"
                  barSize={50}
                />
                <Bar
                  dataKey="todo"
                  stackId="a"
                  fill="#8884d8"
                  name="To Do"
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No user task data available
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Team Performance Summary
          </h3>
          {analyticsData.userTaskData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Assigned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.userTaskData.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                              {user.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.userName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.assigned}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {user.completed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                        {user.inProgress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  user.assigned > 0
                                    ? (user.completed / user.assigned) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {user.assigned > 0
                              ? Math.round(
                                  (user.completed / user.assigned) * 100
                                )
                              : 0}
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              No team performance data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
