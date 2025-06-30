import moment from "moment/moment";

export const dateFormatter = (dateStr, formatter) => {
  return moment(dateStr).format(formatter ?? "LLL");
};

export const ByNameAvater = (name) => {
  if (!name) return "";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("");
};

// Helper function to format date
export const formatDate = (dateString) => {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to format date with time
export const formatDateTime = (dateString) => {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to get status display name
export const getStatusDisplay = (status) => {
  switch (status) {
    case "To do":
      return "Pending";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Done";
    default:
      return status || "No status";
  }
};

// Helper function to get border color based on status
export const getBorderColor = (status) => {
  switch (status) {
    case "To do":
      return "border-yellow-500";
    case "In Progress":
      return "border-blue-500";
    case "Completed":
      return "border-green-500";
    default:
      return "border-gray-300";
  }
};

// Helper function to get status background color
export const getStatusBgColors = (status) => {
  switch (status) {
    case "To do":
      return "bg-yellow-500";
    case "In Progress":
      return "bg-blue-500";
    case "Completed":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

// Helper function to get priority color
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get modal content based on transition
export const getModalContent = (projectData, pendingPipelineStatus) => {
  const currentStatus = projectData?.pipeLine;
  const targetStatus = pendingPipelineStatus;

  if (targetStatus === "Completed" && currentStatus !== "Completed") {
    return {
      title: "Close Project",
      message:
        "Do you want to close this project? This will mark the project as completed.",
      confirmText: "Close Project",
      type: "warning",
    };
  } else if (targetStatus === "Develop" && currentStatus === "Completed") {
    return {
      title: "Reopen Project",
      message:
        "Do you want to reopen this project? This will change the project status back to development.",
      confirmText: "Reopen Project",
      type: "info",
    };
  }

  return {
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    confirmText: "Confirm",
    type: "default",
  };
};

// <----------------------for table--------------------->
// <----------------------for table--------------------->

export const getPriorityDotColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
};

export const getPriorityBgColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "rgba(239, 68, 68, 0.1)";
    case "medium":
      return "rgba(245, 158, 11, 0.1)";
    case "low":
      return "rgba(16, 185, 129, 0.1)";
    default:
      return "rgba(107, 114, 128, 0.1)";
  }
};

export const getPriorityTextColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "#dc2626";
    case "medium":
      return "#d97706";
    case "low":
      return "#059669";
    default:
      return "#374151";
  }
};

export const getPipelineStageColor = (stage) => {
  switch (stage?.toLowerCase()) {
    case "plan":
      return "#7c3aed";
    case "develop":
      return "#06b6d4";
    case "completed":
      return "#22c55e";
    case "design":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
};

export const getStatusBgColor = (status) => {
  switch (status?.toLowerCase()) {
    case "to do":
      return "rgba(107, 114, 128, 0.1)";
    case "in progress":
      return "rgba(59, 130, 246, 0.1)";
    case "done":
      return "rgba(34, 197, 94, 0.1)";
    case "active":
      return "rgba(16, 185, 129, 0.1)";
    case "inactive":
      return "rgba(239, 68, 68, 0.1)";
    default:
      return "rgba(107, 114, 128, 0.1)";
  }
};

export const getStatusTextColor = (status) => {
  switch (status?.toLowerCase()) {
    case "to do":
      return "#374151";
    case "in progress":
      return "#1d4ed8";
    case "done":
      return "#166534";
    case "active":
      return "#047857";
    case "inactive":
      return "#dc2626";
    default:
      return "#374151";
  }
};

export const getStatusDotColor = (status) => {
  switch (status?.toLowerCase()) {
    case "to do":
      return "#6b7280";
    case "in progress":
      return "#3b82f6";
    case "done":
      return "#22c55e";
    case "active":
      return "#10b981";
    case "inactive":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

// Enhanced responsive pagination options - now receives breakpoint parameters
export const getResponsivePaginationOptions = (
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge
) => {
  if (isExtraSmall) return [3, 5];
  if (isSmall && !isMedium) return [5, 8];
  if (isSmall) return [6, 10];
  if (isMedium && !isLarge) return [8, 12, 15];
  if (isMedium) return [10, 15, 20];
  if (isLarge && !isXXLarge) return [12, 20, 25];
  if (isExtraLarge) return [15, 25, 50];
  return [20, 50, 100]; // Ultra wide
};

// Enhanced padding calculations - now receives breakpoint parameters
export const getPadding = (
  type = "cell",
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge
) => {
  const paddings = {
    cell: {
      xs: "4px 6px",
      sm: "6px 8px",
      md: "8px 12px",
      lg: "10px 16px",
      xl: "12px 18px",
      xxl: "14px 20px",
    },
    header: {
      xs: "6px 8px",
      sm: "8px 10px",
      md: "10px 12px",
      lg: "12px 16px",
      xl: "14px 18px",
      xxl: "16px 20px",
    },
  };

  if (isExtraSmall) return paddings[type].xs;
  if (isSmall && !isMedium) return paddings[type].sm;
  if (isSmall) return paddings[type].sm;
  if (isMedium && !isLarge) return paddings[type].md;
  if (isMedium) return paddings[type].md;
  if (isLarge && !isXXLarge) return paddings[type].lg;
  if (isExtraLarge) return paddings[type].xl;
  return paddings[type].xxl;
};

// Enhanced font sizes for different screen sizes
export const getFontSize = (
  type = "body",
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge
) => {
  const sizes = {
    caption: {
      xs: "0.6rem",
      sm: "0.65rem",
      md: "0.7rem",
      lg: "0.75rem",
      xl: "0.8rem",
      xxl: "0.85rem",
    },
    body: {
      xs: "0.7rem",
      sm: "0.75rem",
      md: "0.8rem",
      lg: "0.875rem",
      xl: "0.9rem",
      xxl: "1rem",
    },
    header: {
      xs: "0.75rem",
      sm: "0.8rem",
      md: "0.85rem",
      lg: "0.9rem",
      xl: "0.95rem",
      xxl: "1rem",
    },
  };

  if (isExtraSmall) return sizes[type].xs;
  if (isSmall && !isMedium) return sizes[type].sm;
  if (isSmall) return sizes[type].sm;
  if (isMedium && !isLarge) return sizes[type].md;
  if (isMedium) return sizes[type].md;
  if (isLarge && !isXXLarge) return sizes[type].lg;
  if (isExtraLarge) return sizes[type].xl;
  return sizes[type].xxl;
};

// Enhanced responsive height calculations
export const getResponsiveHeight = (
  maxHeight,
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge
) => {
  if (maxHeight) return maxHeight;

  // Mobile Portrait (320px - 479px)
  if (isExtraSmall) return "calc(100vh - 300px)";

  // Mobile Landscape / Small Tablet Portrait (480px - 599px)
  if (isSmall && !isMedium) return "calc(100vh - 280px)";

  // Small Tablet Portrait (600px - 767px)
  if (isSmall) return "calc(100vh - 260px)";

  // Tablet Portrait / Small Desktop (768px - 899px)
  if (isMedium && !isLarge) return "calc(100vh - 240px)";

  // Tablet Landscape / Medium Desktop (900px - 1199px)
  if (isMedium) return "calc(100vh - 220px)";

  // Large Desktop (1200px - 1535px)
  if (isLarge && !isXXLarge) return "calc(100vh - 200px)";

  // Extra Large Desktop (1536px - 1919px)
  if (isExtraLarge) return "calc(100vh - 180px)";

  // Ultra Wide / 4K (1920px+)
  return "calc(100vh - 160px)";
};

export const getResponsiveMinHeight = (
  minHeight,
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge
) => {
  if (minHeight) return minHeight;

  // Mobile Portrait
  if (isExtraSmall) return "180px";

  // Mobile Landscape / Small devices
  if (isSmall && !isMedium) return "220px";

  // Small Tablet Portrait
  if (isSmall) return "250px";

  // Tablet Portrait / Small Desktop
  if (isMedium && !isLarge) return "300px";

  // Tablet Landscape / Medium Desktop
  if (isMedium) return "350px";

  // Large Desktop
  if (isLarge && !isXXLarge) return "400px";

  // Extra Large Desktop
  if (isExtraLarge) return "450px";

  // Ultra Wide / 4K
  return "500px";
};

// Enhanced responsive rows per page calculation
export const getResponsiveRowsPerPage = (
  isExtraSmall,
  isSmall,
  isMedium,
  isLarge,
  isXXLarge,
  isExtraLarge,
  itemsPerPage = 10
) => {
  if (isExtraSmall) return Math.min(3, itemsPerPage);
  if (isSmall && !isMedium) return Math.min(5, itemsPerPage);
  if (isSmall) return Math.min(6, itemsPerPage);
  if (isMedium && !isLarge) return Math.min(8, itemsPerPage);
  if (isMedium) return Math.min(10, itemsPerPage);
  if (isLarge && !isXXLarge) return Math.min(12, itemsPerPage);
  if (isExtraLarge) return Math.min(15, itemsPerPage);
  return Math.min(20, itemsPerPage);
};
