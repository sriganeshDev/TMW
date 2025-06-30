import { Get, Post, Put } from "../index";

// Get overall dashboard statistics
export const getOverallStats = async (timeRange, projectId) => {
  return Get({ url: `/api/dashboard/overall-stats/${timeRange}/${projectId}` });
};

// Get task status distribution
export const getTaskStatusData = async (timeRange, projectId) => {
  return Get({ url: `/api/dashboard/task-status/${timeRange}/${projectId}` });
};

// Get completion trends (line chart data)
export const getCompletionTrends = async (timeRange, projectId) => {
  return Get({
    url: `/api/dashboard/completion-trends/${timeRange}/${projectId}`,
  });
};

// Get user-wise task analytics
export const getUserTaskAnalytics = async (timeRange, projectId) => {
  return Get({
    url: `/api/dashboard/user-analytics/${timeRange}/${projectId}`,
  });
};

// Get all analytics data in one call
export const getAllAnalytics = async (timeRange, projectId) => {
  return Get({ url: `/api/dashboard/analytics/${timeRange}/${projectId}` });
};

// Get projects list for dropdown
export const getProjects = async () => {
  return Get({ url: `/api/dashboard/projects` });
};
