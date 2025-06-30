import { Get } from "../index";

// Get user's overall statistics
export const getUserOverallStats = async (userId, timeRange, projectId) => {
  return Get({
    url: `/api/user-dashboard/user-overall-stats/${userId}/${timeRange}/${projectId}`,
  });
};

// Get user's task status distribution for pie chart
export const getUserTaskStatusData = async (userId, timeRange, projectId) => {
  return Get({
    url: `/api/user-dashboard/user-task-status/${userId}/${timeRange}/${projectId}`,
  });
};

// Get user's completion trends for line chart
export const getUserCompletionTrends = async (userId, timeRange, projectId) => {
  return Get({
    url: `/api/user-dashboard/user-completion-trends/${userId}/${timeRange}/${projectId}`,
  });
};

// Get user's task data for bar chart
export const getUserTaskData = async (userId, timeRange, projectId) => {
  return Get({
    url: `/api/user-dashboard/user-task-data/${userId}/${timeRange}/${projectId}`,
  });
};

// Get user's recent tasks
export const getUserRecentTasks = async (userId, limit) => {
  const limitParam = limit ? `/${limit}` : "";
  return Get({
    url: `/api/user-dashboard/user-recent-tasks/${userId}${limitParam}`,
  });
};

// Get user's projects
export const getUserProjects = async (userId) => {
  return Get({
    url: `/api/user-dashboard/user-projects/${userId}`,
  });
};

// Get complete user dashboard data in one call
export const getUserDashboardData = async (userId, timeRange, projectId) => {
  let url = `/api/user-dashboard/user-dashboard/${userId}`;

  if (timeRange) {
    url += `/${timeRange}`;
    if (projectId) {
      url += `/${projectId}`;
    }
  }

  return Get({
    url: url,
  });
};
