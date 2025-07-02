// // import React, { useState, useMemo } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TableSortLabel,
// //   TablePagination,
// //   Paper,
// //   Tooltip,
// //   IconButton,
// // } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import { ChevronUp, ChevronDown } from "lucide-react";

// // const CommonTable = ({
// //   data = []p
// //   columns = [],
// //   itemsPerPage = 10,
// //   onEdit = null,
// //   onDelete = null,
// // }) => {
// //   const [page, setPage] = useState(0); // MUI uses 0-based page index
// //   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

// //   const handleSort = (key) => {
// //     let direction = "asc";
// //     if (sortConfig.key === key && sortConfig.direction === "asc") {
// //       direction = "desc";
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const sortedData = useMemo(() => {
// //     let sortableData = [...data];
// //     if (sortConfig.key) {
// //       sortableData.sort((a, b) => {
// //         if (a[sortConfig.key] < b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? -1 : 1;
// //         }
// //         if (a[sortConfig.key] > b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }
// //     return sortableData;
// //   }, [data, sortConfig]);

// //   const paginatedData = sortedData.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   const renderCellContent = (row, column) => {
// //     const { key } = column;

// //     // If column has a custom render function, use it
// //     if (column.render && typeof column.render === "function") {
// //       return column.render(row);
// //     }

// //     // Handle special cases
// //     if (key === "actions") {
// //       return (
// //         <div style={{ display: "flex", gap: "8px" }}>
// //           {onEdit && (
// //             <IconButton
// //               size="small"
// //               onClick={() => onEdit(row)}
// //               sx={{
// //                 color: "#1976d2",
// //                 border: "none",
// //                 backgroundColor: "transparent",
// //                 "&:hover": {
// //                   backgroundColor: "rgba(25, 118, 210, 0.08)",
// //                 },
// //               }}
// //             >
// //               <EditIcon fontSize="small" />
// //             </IconButton>
// //           )}
// //           {onDelete && (
// //             <IconButton
// //               size="small"
// //               onClick={() => onDelete(row.id)}
// //               sx={{
// //                 color: "#d32f2f",
// //                 border: "none",
// //                 backgroundColor: "transparent",
// //                 "&:hover": {
// //                   backgroundColor: "rgba(211, 47, 47, 0.08)",
// //                 },
// //               }}
// //             >
// //               <DeleteIcon fontSize="small" />
// //             </IconButton>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (key === "discription") {
// //       return (
// //         <Tooltip title={row[key]} arrow>
// //           <span
// //             style={{
// //               display: "-webkit-box",
// //               WebkitLineClamp: 1,
// //               WebkitBoxOrient: "vertical",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "normal",
// //               cursor: "default",
// //             }}
// //             className="clamp-text"
// //           >
// //             {row[key]}
// //           </span>
// //         </Tooltip>
// //       );
// //     }

// //     if (key === "priority") {
// //       return (
// //         <span
// //           style={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: "2px 8px",
// //             borderRadius: "9999px",
// //             backgroundColor: getPriorityBgColor(row[key]),
// //             fontWeight: 500,
// //             fontSize: "0.75rem",
// //           }}
// //         >
// //           <span
// //             style={{
// //               display: "inline-block",
// //               width: "8px",
// //               height: "8px",
// //               borderRadius: "9999px",
// //               backgroundColor: getPriorityDotColor(row[key]),
// //               marginRight: "6px",
// //             }}
// //           ></span>
// //           {row[key]}
// //         </span>
// //       );
// //     }

// //     if (key === "status") {
// //       return (
// //         <span
// //           style={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: "4px 12px",
// //             borderRadius: "9999px",
// //             backgroundColor: getStatusBgColor(row[key]),
// //             color: getStatusTextColor(row[key]),
// //             fontWeight: 500,
// //             fontSize: "0.75rem",
// //           }}
// //         >
// //           <span
// //             style={{
// //               display: "inline-block",
// //               width: "8px",
// //               height: "8px",
// //               borderRadius: "9999px",
// //               backgroundColor: getStatusDotColor(row[key]),
// //               marginRight: "6px",
// //             }}
// //           ></span>
// //           {row[key]}
// //         </span>
// //       );
// //     }

// //     if (key === "pipelineStage") {
// //       return (
// //         <span
// //           style={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             fontWeight: 500,
// //             fontSize: "0.85rem",
// //           }}
// //         >
// //           <span
// //             style={{
// //               display: "inline-block",
// //               width: "24px",
// //               height: "4px",
// //               borderRadius: "9999px",
// //               backgroundColor: getPipelineStageColor(row[key]),
// //               marginRight: "8px",
// //             }}
// //           ></span>
// //           {row[key]}
// //         </span>
// //       );
// //     }

// //     // Default case - just return the value
// //     return row[key];
// //   };

// //   return (
// //     <Paper elevation={1}>
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               {columns.map(({ key, label, sortable }) => (
// //                 <TableCell
// //                   key={key}
// //                   style={{ fontWeight: "bold", backgroundColor: "#f6f6f9" }}
// //                 >
// //                   {sortable ? (
// //                     <TableSortLabel
// //                       active={sortConfig.key === key}
// //                       direction={
// //                         sortConfig.key === key ? sortConfig.direction : "asc"
// //                       }
// //                       onClick={() => handleSort(key)}
// //                     >
// //                       {label}
// //                     </TableSortLabel>
// //                   ) : (
// //                     label
// //                   )}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedData.map((row, idx) => (
// //               <TableRow key={row.id || idx}>
// //                 {columns.map((column) => (
// //                   <TableCell
// //                     key={column.key}
// //                     style={
// //                       column.key === "discription" ? { width: "400px" } : {}
// //                     }
// //                   >
// //                     {renderCellContent(row, column)}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Pagination */}
// //       <TablePagination
// //         component="div"
// //         count={data.length}
// //         page={page}
// //         rowsPerPage={rowsPerPage}
// //         onPageChange={(e, newPage) => setPage(newPage)}
// //         onRowsPerPageChange={(e) => {
// //           setRowsPerPage(parseInt(e.target.value, 10));
// //           setPage(0);
// //         }}
// //         rowsPerPageOptions={[5, 10, 25, 50]}
// //       />
// //     </Paper>
// //   );
// // };

// // // Existing helpers (keeping unchanged)
// // const getPriorityDotColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "#ef4444"; // red
// //     case "Medium":
// //       return "#f59e0b"; // orange
// //     case "Low":
// //       return "#10b981"; // green
// //     default:
// //       return "#6b7280"; // gray
// //   }
// // };

// // const getPriorityBgColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "rgba(239, 68, 68, 0.1)"; // red bg with transparency
// //     case "Medium":
// //       return "rgba(245, 158, 11, 0.1)"; // orange bg
// //     case "Low":
// //       return "rgba(16, 185, 129, 0.1)"; // green bg
// //     default:
// //       return "rgba(107, 114, 128, 0.1)"; // gray bg
// //   }
// // };

// // const getPipelineStageColor = (stage) => {
// //   switch (stage) {
// //     case "Plan":
// //       return "#7c3aed"; // purple
// //     case "Develop":
// //       return "#06b6d4"; // cyan
// //     case "Completed":
// //       return "#22c55e"; // green
// //     case "Design":
// //       return "#f59e0b"; // orange
// //     default:
// //       return "#6b7280"; // gray
// //   }
// // };

// // // New status color helpers
// // const getStatusBgColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "rgba(107, 114, 128, 0.1)"; // gray bg
// //     case "In Progress":
// //       return "rgba(59, 130, 246, 0.1)"; // blue bg
// //     case "Done":
// //       return "rgba(34, 197, 94, 0.1)"; // green bg
// //     case "Active":
// //       return "rgba(16, 185, 129, 0.1)"; // emerald bg
// //     case "Inactive":
// //       return "rgba(239, 68, 68, 0.1)"; // red bg
// //     default:
// //       return "rgba(107, 114, 128, 0.1)"; // gray bg
// //   }
// // };

// // const getStatusTextColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#374151"; // gray text
// //     case "In Progress":
// //       return "#1d4ed8"; // blue text
// //     case "Done":
// //       return "#166534"; // green text
// //     case "Active":
// //       return "#047857"; // emerald text
// //     case "Inactive":
// //       return "#dc2626"; // red text
// //     default:
// //       return "#374151"; // gray text
// //   }
// // };

// // const getStatusDotColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#6b7280"; // gray
// //     case "In Progress":
// //       return "#3b82f6"; // blue
// //     case "Done":
// //       return "#22c55e"; // green
// //     case "Active":
// //       return "#10b981"; // emerald
// //     case "Inactive":
// //       return "#ef4444"; // red
// //     default:
// //       return "#6b7280"; // gray
// //   }
// // };

// // export default CommonTable;

// // import React, { useState, useMemo } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TableSortLabel,
// //   TablePagination,
// //   Paper,
// //   Tooltip,
// //   IconButton,
// //   Typography,
// //   Box,
// //   useTheme,
// //   useMediaQuery,
// // } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import { ChevronUp, ChevronDown } from "lucide-react";

// // const CommonTable = ({
// //   data = [],
// //   columns = [],
// //   itemsPerPage = 10,
// //   onEdit = null,
// //   onDelete = null,
// //   noDataMessage = "No data available",
// //   maxHeight = "calc(100vh - 200px)",
// //   minHeight = "300px",
// // }) => {
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// //   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
// //   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

// //   const handleSort = (key) => {
// //     let direction = "asc";
// //     if (sortConfig.key === key && sortConfig.direction === "asc") {
// //       direction = "desc";
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const sortedData = useMemo(() => {
// //     let sortableData = [...data];
// //     if (sortConfig.key) {
// //       sortableData.sort((a, b) => {
// //         if (a[sortConfig.key] < b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? -1 : 1;
// //         }
// //         if (a[sortConfig.key] > b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }
// //     return sortableData;
// //   }, [data, sortConfig]);

// //   const paginatedData = sortedData.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   const renderCellContent = (row, column) => {
// //     const { key } = column;

// //     // If column has a custom render function, use it
// //     if (column.render && typeof column.render === "function") {
// //       return column.render(row);
// //     }

// //     // Handle special cases
// //     if (key === "actions") {
// //       return (
// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: { xs: 0.5, sm: 1 },
// //             minWidth: { xs: "60px", sm: "80px", md: "100px" },
// //             justifyContent: "flex-start",
// //           }}
// //         >
// //           {onEdit && (
// //             <IconButton
// //               size={isMobile ? "small" : "medium"}
// //               onClick={() => onEdit(row)}
// //               sx={{
// //                 color: "#1976d2",
// //                 padding: { xs: "4px", sm: "8px" },
// //                 "&:hover": {
// //                   backgroundColor: "rgba(25, 118, 210, 0.08)",
// //                 },
// //               }}
// //             >
// //               <EditIcon fontSize={isMobile ? "small" : "medium"} />
// //             </IconButton>
// //           )}
// //           {onDelete && (
// //             <IconButton
// //               size={isMobile ? "small" : "medium"}
// //               onClick={() => onDelete(row.id)}
// //               sx={{
// //                 color: "#d32f2f",
// //                 padding: { xs: "4px", sm: "8px" },
// //                 "&:hover": {
// //                   backgroundColor: "rgba(211, 47, 47, 0.08)",
// //                 },
// //               }}
// //             >
// //               <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
// //             </IconButton>
// //           )}
// //         </Box>
// //       );
// //     }

// //     if (key === "discription") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Tooltip title={value} arrow>
// //           <Box
// //             sx={{
// //               display: "-webkit-box",
// //               WebkitLineClamp: { xs: 1, sm: 2, md: 2 },
// //               WebkitBoxOrient: "vertical",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "normal",
// //               cursor: "default",
// //               maxWidth: {
// //                 xs: "120px",
// //                 sm: "200px",
// //                 md: "300px",
// //                 lg: "400px",
// //                 xl: "500px",
// //               },
// //               minWidth: { xs: "80px", sm: "120px" },
// //               fontSize: { xs: "0.75rem", sm: "0.875rem" },
// //               lineHeight: { xs: 1.2, sm: 1.43 },
// //             }}
// //           >
// //             {value}
// //           </Box>
// //         </Tooltip>
// //       );
// //     }

// //     if (key === "priority") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: { xs: "2px 6px", sm: "2px 8px", md: "3px 10px" },
// //             borderRadius: "9999px",
// //             backgroundColor: getPriorityBgColor(value),
// //             fontWeight: 500,
// //             fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
// //             minWidth: "fit-content",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: { xs: "6px", sm: "7px", md: "8px" },
// //               height: { xs: "6px", sm: "7px", md: "8px" },
// //               borderRadius: "9999px",
// //               backgroundColor: getPriorityDotColor(value),
// //               marginRight: { xs: "4px", sm: "5px", md: "6px" },
// //               flexShrink: 0,
// //             }}
// //           />
// //           <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
// //             {value}
// //           </Box>
// //           <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
// //             {value.charAt(0)}
// //           </Box>
// //         </Box>
// //       );
// //     }

// //     if (key === "status") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: { xs: "2px 6px", sm: "3px 8px", md: "4px 12px" },
// //             borderRadius: "9999px",
// //             backgroundColor: getStatusBgColor(value),
// //             color: getStatusTextColor(value),
// //             fontWeight: 500,
// //             fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
// //             minWidth: "fit-content",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: { xs: "6px", sm: "7px", md: "8px" },
// //               height: { xs: "6px", sm: "7px", md: "8px" },
// //               borderRadius: "9999px",
// //               backgroundColor: getStatusDotColor(value),
// //               marginRight: { xs: "4px", sm: "5px", md: "6px" },
// //               flexShrink: 0,
// //             }}
// //           />
// //           <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
// //             {value}
// //           </Box>
// //           <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
// //             {getStatusAbbreviation(value)}
// //           </Box>
// //         </Box>
// //       );
// //     }

// //     if (key === "pipelineStage") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             fontWeight: 500,
// //             fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
// //             minWidth: "fit-content",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: { xs: "16px", sm: "20px", md: "24px" },
// //               height: { xs: "3px", sm: "3px", md: "4px" },
// //               borderRadius: "9999px",
// //               backgroundColor: getPipelineStageColor(value),
// //               marginRight: { xs: "6px", sm: "7px", md: "8px" },
// //               flexShrink: 0,
// //             }}
// //           />
// //           <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
// //             {value}
// //           </Box>
// //           <Box component="span" sx={{ display: { xs: "inline", md: "none" } }}>
// //             {getPipelineStageAbbreviation(value)}
// //           </Box>
// //         </Box>
// //       );
// //     }

// //     // Default case - check for empty values and return "-" if empty
// //     const value = row[key];
// //     if (value === null || value === undefined || value === "") {
// //       return "-";
// //     }

// //     // Handle long text for default columns
// //     if (typeof value === "string" && value.length > 20) {
// //       return (
// //         <Tooltip title={value} arrow>
// //           <Box
// //             sx={{
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "nowrap",
// //               maxWidth: { xs: "80px", sm: "120px", md: "150px" },
// //               fontSize: { xs: "0.75rem", sm: "0.875rem" },
// //             }}
// //           >
// //             {value}
// //           </Box>
// //         </Tooltip>
// //       );
// //     }

// //     return (
// //       <Box sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>{value}</Box>
// //     );
// //   };

// //   const getColumnWidth = (columnKey) => {
// //     const baseWidths = {
// //       xs: {
// //         // Mobile (320px-599px)
// //         actions: { minWidth: "40px", width: "50px" },
// //         discription: { minWidth: "100px", width: "120px" },
// //         priority: { minWidth: "40px", width: "50px" },
// //         status: { minWidth: "40px", width: "50px" },
// //         pipelineStage: { minWidth: "50px", width: "60px" },
// //         default: { minWidth: "40px", width: "60px" },
// //       },
// //       sm: {
// //         // Small tablets (600px-899px)
// //         actions: { minWidth: "60px", width: "80px" },
// //         discription: { minWidth: "140px", width: "180px" },
// //         priority: { minWidth: "60px", width: "80px" },
// //         status: { minWidth: "60px", width: "80px" },
// //         pipelineStage: { minWidth: "70px", width: "90px" },
// //         default: { minWidth: "60px", width: "80px" },
// //       },
// //       md: {
// //         // Tablets (900px-1199px)
// //         actions: { minWidth: "80px", width: "100px" },
// //         discription: { minWidth: "200px", width: "250px" },
// //         priority: { minWidth: "80px", width: "100px" },
// //         status: { minWidth: "80px", width: "100px" },
// //         pipelineStage: { minWidth: "100px", width: "120px" },
// //         default: { minWidth: "80px", width: "100px" },
// //       },
// //       lg: {
// //         // Desktop (1200px-1535px)
// //         actions: { minWidth: "20px", width: "20px" },
// //         discription: { minWidth: "280px", width: "320px" },
// //         priority: { minWidth: "100px", width: "120px" },
// //         status: { minWidth: "100px", width: "120px" },
// //         pipelineStage: { minWidth: "120px", width: "140px" },
// //         default: { minWidth: "100px", width: "120px" },
// //       },
// //       xl: {
// //         // Large desktop (1536px+)
// //         actions: { minWidth: "20px", width: "140px" },
// //         discription: { minWidth: "320px", width: "400px" },
// //         priority: { minWidth: "120px", width: "140px" },
// //         status: { minWidth: "120px", width: "140px" },
// //         pipelineStage: { minWidth: "140px", width: "160px" },
// //         default: { minWidth: "120px", width: "140px" },
// //       },
// //     };

// //     return {
// //       minWidth: {
// //         xs:
// //           baseWidths.xs[columnKey]?.minWidth || baseWidths.xs.default.minWidth,
// //         sm:
// //           baseWidths.sm[columnKey]?.minWidth || baseWidths.sm.default.minWidth,
// //         md:
// //           baseWidths.md[columnKey]?.minWidth || baseWidths.md.default.minWidth,
// //         lg:
// //           baseWidths.lg[columnKey]?.minWidth || baseWidths.lg.default.minWidth,
// //         xl:
// //           baseWidths.xl[columnKey]?.minWidth || baseWidths.xl.default.minWidth,
// //       },
// //       width: {
// //         xs: baseWidths.xs[columnKey]?.width || baseWidths.xs.default.width,
// //         sm: baseWidths.sm[columnKey]?.width || baseWidths.sm.default.width,
// //         md: baseWidths.md[columnKey]?.width || baseWidths.md.default.width,
// //         lg: baseWidths.lg[columnKey]?.width || baseWidths.lg.default.width,
// //         xl: baseWidths.xl[columnKey]?.width || baseWidths.xl.default.width,
// //       },
// //     };
// //   };

// //   // Responsive table minimum width with reduced values
// //   const getTableMinWidth = () => {
// //     const columnCount = columns.length;
// //     return {
// //       xs: Math.max(320, columnCount * 50),
// //       sm: Math.max(600, columnCount * 80),
// //       md: Math.max(900, columnCount * 100),
// //       lg: Math.max(1200, columnCount * 120),
// //       xl: Math.max(1536, columnCount * 140),
// //     };
// //   };

// //   // No data state
// //   if (!data || data.length === 0) {
// //     return (
// //       <Paper
// //         elevation={1}
// //         sx={{
// //           width: "100%",
// //           overflow: "hidden",
// //           height: { xs: "250px", sm: minHeight },
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <TableContainer
// //           sx={{
// //             flexGrow: 1,
// //             overflowX: "auto",
// //             overflowY: "auto",
// //           }}
// //         >
// //           <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
// //             <TableHead>
// //               <TableRow>
// //                 {columns.map(({ key, label, sortable }) => (
// //                   <TableCell
// //                     key={key}
// //                     sx={{
// //                       fontWeight: "bold",
// //                       backgroundColor: "#f6f6f9",
// //                       position: "sticky",
// //                       top: 0,
// //                       zIndex: 10,
// //                       fontSize: { xs: "0.75rem", sm: "0.875rem" },
// //                       padding: { xs: "8px 4px", sm: "16px 8px", md: "16px" },
// //                       ...getColumnWidth(key),
// //                     }}
// //                   >
// //                     {sortable ? (
// //                       <TableSortLabel
// //                         active={sortConfig.key === key}
// //                         direction={
// //                           sortConfig.key === key ? sortConfig.direction : "asc"
// //                         }
// //                         onClick={() => handleSort(key)}
// //                         sx={{
// //                           "& .MuiTableSortLabel-icon": {
// //                             fontSize: { xs: "1rem", sm: "1.2rem" },
// //                           },
// //                         }}
// //                       >
// //                         <Box
// //                           sx={{
// //                             display: { xs: "none", sm: "inline" },
// //                             fontSize: "inherit",
// //                           }}
// //                         >
// //                           {label}
// //                         </Box>
// //                         <Box
// //                           sx={{
// //                             display: { xs: "inline", sm: "none" },
// //                             fontSize: "inherit",
// //                           }}
// //                         >
// //                           {label.length > 8
// //                             ? label.substring(0, 6) + "..."
// //                             : label}
// //                         </Box>
// //                       </TableSortLabel>
// //                     ) : (
// //                       <>
// //                         <Box sx={{ display: { xs: "none", sm: "inline" } }}>
// //                           {label}
// //                         </Box>
// //                         <Box sx={{ display: { xs: "inline", sm: "none" } }}>
// //                           {label.length > 8
// //                             ? label.substring(0, 6) + "..."
// //                             : label}
// //                         </Box>
// //                       </>
// //                     )}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   align="center"
// //                   sx={{
// //                     py: { xs: 4, sm: 8 },
// //                     px: { xs: 2, sm: 3 },
// //                   }}
// //                 >
// //                   <Box>
// //                     <Typography
// //                       variant={isMobile ? "subtitle1" : "h6"}
// //                       color="text.secondary"
// //                       gutterBottom
// //                     >
// //                       {noDataMessage}
// //                     </Typography>
// //                     <Typography
// //                       variant="body2"
// //                       color="text.disabled"
// //                       sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
// //                     >
// //                       There are no records to display
// //                     </Typography>
// //                   </Box>
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>
// //     );
// //   }

// //   return (
// //     <Paper
// //       elevation={1}
// //       sx={{
// //         width: "100%",
// //         overflow: "hidden",
// //         height: { xs: "calc(100vh - 120px)", sm: maxHeight },
// //         minHeight: { xs: "250px", sm: minHeight },
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       <TableContainer
// //         sx={{
// //           flexGrow: 1,
// //           overflowX: "auto",
// //           overflowY: "auto",
// //           // Custom scrollbar styling
// //           "&::-webkit-scrollbar": {
// //             width: { xs: "2px", sm: "2px", md: "3px" },
// //             height: { xs: "2px", sm: "2px", md: "3px" },
// //           },
// //           "&::-webkit-scrollbar-track": {
// //             backgroundColor: "#f1f1f1",
// //             borderRadius: "4px",
// //           },
// //           "&::-webkit-scrollbar-thumb": {
// //             backgroundColor: "#c1c1c1",
// //             borderRadius: "4px",
// //             "&:hover": {
// //               backgroundColor: "#a8a8a8",
// //             },
// //           },
// //         }}
// //       >
// //         <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
// //           <TableHead>
// //             <TableRow>
// //               {columns.map(({ key, label, sortable }) => (
// //                 <TableCell
// //                   key={key}
// //                   sx={{
// //                     fontWeight: "bold",
// //                     backgroundColor: "#f6f6f9",
// //                     position: "sticky",
// //                     top: 0,
// //                     zIndex: 10,
// //                     whiteSpace: "nowrap",
// //                     fontSize: { xs: "0.75rem", sm: "0.875rem" },
// //                     padding: { xs: "8px 4px", sm: "12px 8px", md: "16px" },
// //                     ...getColumnWidth(key),
// //                   }}
// //                 >
// //                   {sortable ? (
// //                     <TableSortLabel
// //                       active={sortConfig.key === key}
// //                       direction={
// //                         sortConfig.key === key ? sortConfig.direction : "asc"
// //                       }
// //                       onClick={() => handleSort(key)}
// //                       sx={{
// //                         "& .MuiTableSortLabel-icon": {
// //                           fontSize: { xs: "1rem", sm: "1.2rem" },
// //                         },
// //                       }}
// //                     >
// //                       <Box
// //                         sx={{
// //                           display: { xs: "none", sm: "inline" },
// //                           fontSize: "inherit",
// //                         }}
// //                       >
// //                         {label}
// //                       </Box>
// //                       <Box
// //                         sx={{
// //                           display: { xs: "inline", sm: "none" },
// //                           fontSize: "inherit",
// //                         }}
// //                       >
// //                         {label.length > 8
// //                           ? label.substring(0, 6) + "..."
// //                           : label}
// //                       </Box>
// //                     </TableSortLabel>
// //                   ) : (
// //                     <>
// //                       <Box sx={{ display: { xs: "none", sm: "inline" } }}>
// //                         {label}
// //                       </Box>
// //                       <Box sx={{ display: { xs: "inline", sm: "none" } }}>
// //                         {label.length > 8
// //                           ? label.substring(0, 6) + "..."
// //                           : label}
// //                       </Box>
// //                     </>
// //                   )}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedData.map((row, idx) => (
// //               <TableRow
// //                 key={row.id || idx}
// //                 sx={{
// //                   "&:hover": {
// //                     backgroundColor: "rgba(0, 0, 0, 0.04)",
// //                   },
// //                   height: { xs: "40px", sm: "52px", md: "57px" },
// //                 }}
// //               >
// //                 {columns.map((column) => (
// //                   <TableCell
// //                     key={column.key}
// //                     sx={{
// //                       ...getColumnWidth(column.key),
// //                       verticalAlign: "middle",
// //                       padding: { xs: "4px", sm: "8px 12px", md: "12px 16px" },
// //                       borderBottom: {
// //                         xs: "1px solid rgba(224, 224, 224, 0.5)",
// //                         sm: "1px solid rgba(224, 224, 224, 1)",
// //                       },
// //                     }}
// //                   >
// //                     {renderCellContent(row, column)}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Responsive Pagination */}
// //       <TablePagination
// //         component="div"
// //         count={data.length}
// //         page={page}
// //         rowsPerPage={rowsPerPage}
// //         onPageChange={(e, newPage) => setPage(newPage)}
// //         onRowsPerPageChange={(e) => {
// //           setRowsPerPage(parseInt(e.target.value, 10));
// //           setPage(0);
// //         }}
// //         rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25, 50]}
// //         sx={{
// //           borderTop: "1px solid rgba(224, 224, 224, 1)",
// //           backgroundColor: "#fafafa",
// //           flexShrink: 0,
// //           minHeight: { xs: "44px", sm: "52px" },
// //           "& .MuiTablePagination-toolbar": {
// //             flexWrap: { xs: "wrap", sm: "nowrap" },
// //             minHeight: { xs: "44px", sm: "52px" },
// //             padding: { xs: "4px 8px", sm: "0 16px" },
// //             gap: { xs: "4px", sm: "8px" },
// //           },
// //           "& .MuiTablePagination-spacer": {
// //             display: { xs: "none", md: "flex" },
// //           },
// //           "& .MuiTablePagination-selectLabel": {
// //             fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
// //             margin: 0,
// //             display: { xs: "none", sm: "block" },
// //           },
// //           "& .MuiTablePagination-displayedRows": {
// //             fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
// //             margin: 0,
// //           },
// //           "& .MuiTablePagination-select": {
// //             fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
// //           },
// //           "& .MuiTablePagination-actions": {
// //             "& .MuiIconButton-root": {
// //               padding: { xs: "4px", sm: "8px" },
// //               "& .MuiSvgIcon-root": {
// //                 fontSize: { xs: "1rem", sm: "1.25rem" },
// //               },
// //             },
// //           },
// //         }}
// //         labelRowsPerPage={isMobile ? "" : "Rows per page:"}
// //         labelDisplayedRows={({ from, to, count }) =>
// //           isMobile
// //             ? `${from}-${to} of ${count}`
// //             : `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
// //         }
// //       />
// //     </Paper>
// //   );
// // };

// // // Additional helper functions for mobile abbreviations
// // const getStatusAbbreviation = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "TD";
// //     case "In Progress":
// //       return "IP";
// //     case "Done":
// //       return "D";
// //     case "Active":
// //       return "A";
// //     case "Inactive":
// //       return "I";
// //     default:
// //       return status.charAt(0);
// //   }
// // };

// // const getPipelineStageAbbreviation = (stage) => {
// //   switch (stage) {
// //     case "Plan":
// //       return "P";
// //     case "Develop":
// //       return "Dev";
// //     case "Completed":
// //       return "Done";
// //     case "Design":
// //       return "Des";
// //     default:
// //       return stage.substring(0, 3);
// //   }
// // };

// // // Existing color helper functions remain the same
// // const getPriorityDotColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "#ef4444";
// //     case "Medium":
// //       return "#f59e0b";
// //     case "Low":
// //       return "#10b981";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // const getPriorityBgColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "rgba(239, 68, 68, 0.1)";
// //     case "Medium":
// //       return "rgba(245, 158, 11, 0.1)";
// //     case "Low":
// //       return "rgba(16, 185, 129, 0.1)";
// //     default:
// //       return "rgba(107, 114, 128, 0.1)";
// //   }
// // };

// // const getPipelineStageColor = (stage) => {
// //   switch (stage) {
// //     case "Plan":
// //       return "#7c3aed";
// //     case "Develop":
// //       return "#06b6d4";
// //     case "Completed":
// //       return "#22c55e";
// //     case "Design":
// //       return "#f59e0b";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // const getStatusBgColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "rgba(107, 114, 128, 0.1)";
// //     case "In Progress":
// //       return "rgba(59, 130, 246, 0.1)";
// //     case "Done":
// //       return "rgba(34, 197, 94, 0.1)";
// //     case "Active":
// //       return "rgba(16, 185, 129, 0.1)";
// //     case "Inactive":
// //       return "rgba(239, 68, 68, 0.1)";
// //     default:
// //       return "rgba(107, 114, 128, 0.1)";
// //   }
// // };

// // const getStatusTextColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#374151";
// //     case "In Progress":
// //       return "#1d4ed8";
// //     case "Done":
// //       return "#166534";
// //     case "Active":
// //       return "#047857";
// //     case "Inactive":
// //       return "#dc2626";
// //     default:
// //       return "#374151";
// //   }
// // };

// // const getStatusDotColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#6b7280";
// //     case "In Progress":
// //       return "#3b82f6";
// //     case "Done":
// //       return "#22c55e";
// //     case "Active":
// //       return "#10b981";
// //     case "Inactive":
// //       return "#ef4444";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // export default CommonTable;

// // import React, { useState, useMemo } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TableSortLabel,
// //   TablePagination,
// //   Paper,
// //   Tooltip,
// //   IconButton,
// //   Typography,
// //   Box,
// //   useTheme,
// //   useMediaQuery,
// // } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import { ChevronUp, ChevronDown } from "lucide-react";

// // const CommonTable = ({
// //   data = [],
// //   columns = [],
// //   itemsPerPage = 10,
// //   onEdit = null,
// //   onDelete = null,
// //   noDataMessage = "No data available",
// //   maxHeight = "calc(100vh - 200px)",
// //   minHeight = "3s00px",
// // }) => {
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //   const handleSort = (key) => {
// //     let direction = "asc";
// //     if (sortConfig.key === key && sortConfig.direction === "asc") {
// //       direction = "desc";
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const sortedData = useMemo(() => {
// //     let sortableData = [...data];
// //     if (sortConfig.key) {
// //       sortableData.sort((a, b) => {
// //         if (a[sortConfig.key] < b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? -1 : 1;
// //         }
// //         if (a[sortConfig.key] > b[sortConfig.key]) {
// //           return sortConfig.direction === "asc" ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }
// //     return sortableData;
// //   }, [data, sortConfig]);

// //   const paginatedData = sortedData.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   const renderCellContent = (row, column) => {
// //     const { key } = column;

// //     // If column has a custom render function, use it
// //     if (column.render && typeof column.render === "function") {
// //       return column.render(row);
// //     }

// //     // Handle special cases
// //     if (key === "actions") {
// //       return (
// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 1,
// //             justifyContent: "flex-start",
// //           }}
// //         >
// //           {onEdit && (
// //             <IconButton
// //               onClick={() => onEdit(row)}
// //               sx={{
// //                 color: "#1976d2",
// //                 "&:hover": {
// //                   backgroundColor: "rgba(25, 118, 210, 0.08)",
// //                 },
// //               }}
// //             >
// //               <EditIcon />
// //             </IconButton>
// //           )}
// //           {onDelete && (
// //             <IconButton
// //               onClick={() => onDelete(row.id)}
// //               sx={{
// //                 color: "#d32f2f",
// //                 "&:hover": {
// //                   backgroundColor: "rgba(211, 47, 47, 0.08)",
// //                 },
// //               }}
// //             >
// //               <DeleteIcon />
// //             </IconButton>
// //           )}
// //         </Box>
// //       );
// //     }

// //     if (key === "discription") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Tooltip title={value} arrow>
// //           <Box
// //             sx={{
// //               display: "-webkit-box",
// //               WebkitLineClamp: 2,
// //               WebkitBoxOrient: "vertical",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "normal",
// //               cursor: "default",
// //               maxWidth: "300px",
// //             }}
// //           >
// //             {value}
// //           </Box>
// //         </Tooltip>
// //       );
// //     }

// //     if (key === "priority") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: "3px 10px",
// //             borderRadius: "9999px",
// //             backgroundColor: getPriorityBgColor(value),
// //             fontWeight: 500,
// //             fontSize: "0.75rem",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: "8px",
// //               height: "8px",
// //               borderRadius: "9999px",
// //               backgroundColor: getPriorityDotColor(value),
// //               marginRight: "6px",
// //               flexShrink: 0,
// //             }}
// //           />
// //           {value}
// //         </Box>
// //       );
// //     }

// //     if (key === "status") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             padding: "4px 12px",
// //             borderRadius: "9999px",
// //             backgroundColor: getStatusBgColor(value),
// //             color: getStatusTextColor(value),
// //             fontWeight: 500,
// //             fontSize: "0.75rem",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: "8px",
// //               height: "8px",
// //               borderRadius: "9999px",
// //               backgroundColor: getStatusDotColor(value),
// //               marginRight: "6px",
// //               flexShrink: 0,
// //             }}
// //           />
// //           {value}
// //         </Box>
// //       );
// //     }

// //     if (key === "pipelineStage") {
// //       const value = row[key];
// //       if (!value || value === "" || value === null || value === undefined) {
// //         return "-";
// //       }
// //       return (
// //         <Box
// //           sx={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             fontWeight: 500,
// //             fontSize: "0.85rem",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "inline-block",
// //               width: "24px",
// //               height: "4px",
// //               borderRadius: "9999px",
// //               backgroundColor: getPipelineStageColor(value),
// //               marginRight: "8px",
// //               flexShrink: 0,
// //             }}
// //           />
// //           {value}
// //         </Box>
// //       );
// //     }

// //     // Default case - check for empty values and return "-" if empty
// //     const value = row[key];
// //     if (value === null || value === undefined || value === "") {
// //       return "-";
// //     }

// //     // Handle long text for default columns
// //     if (typeof value === "string" && value.length > 20) {
// //       return (
// //         <Tooltip title={value} arrow>
// //           <Box
// //             sx={{
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "nowrap",
// //               maxWidth: "150px",
// //             }}
// //           >
// //             {value}
// //           </Box>
// //         </Tooltip>
// //       );
// //     }

// //     return value;
// //   };

// //   // No data state
// //   if (!data || data.length === 0) {
// //     return (
// //       <Paper
// //         elevation={1}
// //         sx={{
// //           width: "100%",
// //           overflow: "hidden",
// //           height: minHeight,
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <TableContainer
// //           sx={{
// //             flexGrow: 1,
// //             overflowX: "auto",
// //             overflowY: "auto",
// //           }}
// //         >
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow>
// //                 {columns.map(({ key, label, sortable }) => (
// //                   <TableCell
// //                     key={key}
// //                     sx={{
// //                       fontWeight: "bold",
// //                       backgroundColor: "#f6f6f9",
// //                       position: "sticky",
// //                       top: 0,
// //                       zIndex: 10,
// //                       padding: "16px",
// //                     }}
// //                   >
// //                     {sortable ? (
// //                       <TableSortLabel
// //                         active={sortConfig.key === key}
// //                         direction={
// //                           sortConfig.key === key ? sortConfig.direction : "asc"
// //                         }
// //                         onClick={() => handleSort(key)}
// //                       >
// //                         {label}
// //                       </TableSortLabel>
// //                     ) : (
// //                       label
// //                     )}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   align="center"
// //                   sx={{ py: 8, px: 3 }}
// //                 >
// //                   <Box>
// //                     <Typography
// //                       variant="h6"
// //                       color="text.secondary"
// //                       gutterBottom
// //                     >
// //                       {noDataMessage}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.disabled">
// //                       There are no records to display
// //                     </Typography>
// //                   </Box>
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>
// //     );
// //   }

// //   return (
// //     <Paper
// //       elevation={1}
// //       sx={{
// //         width: "100%",
// //         overflow: "hidden",
// //         height: maxHeight,
// //         minHeight: minHeight,
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       <TableContainer
// //         sx={{
// //           flexGrow: 1,
// //           overflowX: "auto",
// //           overflowY: "auto",
// //           // Custom scrollbar styling
// //           "&::-webkit-scrollbar": {
// //             width: "3px",
// //             height: "3px",
// //           },
// //           "&::-webkit-scrollbar-track": {
// //             backgroundColor: "#f1f1f1",
// //             borderRadius: "4px",
// //           },
// //           "&::-webkit-scrollbar-thumb": {
// //             backgroundColor: "#c1c1c1",
// //             borderRadius: "4px",
// //             "&:hover": {
// //               backgroundColor: "#a8a8a8",
// //             },
// //           },
// //         }}
// //       >
// //         <Table stickyHeader>
// //           <TableHead>
// //             <TableRow>
// //               {columns.map(({ key, label, sortable }) => (
// //                 <TableCell
// //                   key={key}
// //                   sx={{
// //                     fontWeight: "bold",
// //                     backgroundColor: "#f6f6f9",
// //                     position: "sticky",
// //                     top: 0,
// //                     zIndex: 10,
// //                     whiteSpace: "nowrap",
// //                     padding: "16px",
// //                   }}
// //                 >
// //                   {sortable ? (
// //                     <TableSortLabel
// //                       active={sortConfig.key === key}
// //                       direction={
// //                         sortConfig.key === key ? sortConfig.direction : "asc"
// //                       }
// //                       onClick={() => handleSort(key)}
// //                     >
// //                       {label}
// //                     </TableSortLabel>
// //                   ) : (
// //                     label
// //                   )}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedData.map((row, idx) => (
// //               <TableRow
// //                 key={row.id || idx}
// //                 sx={{
// //                   "&:hover": {
// //                     backgroundColor: "rgba(0, 0, 0, 0.01) !important",
// //                   },
// //                   backgroundColor:
// //                     idx % 2 === 0 ? "#fff9fe !important" : "#f9f7f7 !important",
// //                   "& td": {
// //                     backgroundColor: "inherit",
// //                   },
// //                 }}
// //               >
// //                 {columns.map((column) => (
// //                   <TableCell
// //                     key={column.key}
// //                     sx={{
// //                       verticalAlign: "middle",
// //                       padding: "12px 16px",
// //                       borderBottom: "1px solid rgba(224, 224, 224, 1)",
// //                     }}
// //                   >
// //                     {renderCellContent(row, column)}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Pagination */}
// //       <TablePagination
// //         component="div"
// //         count={data.length}
// //         page={page}
// //         rowsPerPage={rowsPerPage}
// //         onPageChange={(e, newPage) => setPage(newPage)}
// //         onRowsPerPageChange={(e) => {
// //           setRowsPerPage(parseInt(e.target.value, 10));
// //           setPage(0);
// //         }}
// //         rowsPerPageOptions={[5, 10, 25, 50]}
// //         sx={{
// //           borderTop: "1px solid rgba(224, 224, 224, 1)",
// //           backgroundColor: "#fafafa",
// //           flexShrink: 0,
// //         }}
// //       />
// //     </Paper>
// //   );
// // };

// // // Existing color helper functions remain the same
// // const getPriorityDotColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "#ef4444";
// //     case "Medium":
// //       return "#f59e0b";
// //     case "Low":
// //       return "#10b981";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // const getPriorityBgColor = (priority) => {
// //   switch (priority) {
// //     case "High":
// //       return "rgba(239, 68, 68, 0.1)";
// //     case "Medium":
// //       return "rgba(245, 158, 11, 0.1)";
// //     case "Low":
// //       return "rgba(16, 185, 129, 0.1)";
// //     default:
// //       return "rgba(107, 114, 128, 0.1)";
// //   }
// // };

// // const getPipelineStageColor = (stage) => {
// //   switch (stage) {
// //     case "Plan":
// //       return "#7c3aed";
// //     case "Develop":
// //       return "#06b6d4";
// //     case "Completed":
// //       return "#22c55e";
// //     case "Design":
// //       return "#f59e0b";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // const getStatusBgColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "rgba(107, 114, 128, 0.1)";
// //     case "In Progress":
// //       return "rgba(59, 130, 246, 0.1)";
// //     case "Done":
// //       return "rgba(34, 197, 94, 0.1)";
// //     case "Active":
// //       return "rgba(16, 185, 129, 0.1)";
// //     case "Inactive":
// //       return "rgba(239, 68, 68, 0.1)";
// //     default:
// //       return "rgba(107, 114, 128, 0.1)";
// //   }
// // };

// // const getStatusTextColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#374151";
// //     case "In Progress":
// //       return "#1d4ed8";
// //     case "Done":
// //       return "#166534";
// //     case "Active":
// //       return "#047857";
// //     case "Inactive":
// //       return "#dc2626";
// //     default:
// //       return "#374151";
// //   }
// // };

// // const getStatusDotColor = (status) => {
// //   switch (status) {
// //     case "To Do":
// //       return "#6b7280";
// //     case "In Progress":
// //       return "#3b82f6";
// //     case "Done":
// //       return "#22c55e";
// //     case "Active":
// //       return "#10b981";
// //     case "Inactive":
// //       return "#ef4444";
// //     default:
// //       return "#6b7280";
// //   }
// // };

// // export default CommonTable;

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TablePagination,
//   Paper,
//   Tooltip,
//   IconButton,
//   Typography,
//   Box,
//   useTheme,
//   useMediaQuery,
//   Chip,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { ChevronUp, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const CommonTable = ({
//   data = [],
//   columns = [],
//   itemsPerPage = 10,
//   onEdit = null,
//   onDelete = null,
//   module,
//   noDataMessage = "No data available",
//   maxHeight = null, // Will be calculated responsively
//   minHeight = null, // Will be calculated responsively
//   enableMobileCards = true, // New prop to enable mobile card view
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [containerHeight, setContainerHeight] = useState("auto");
//   const router = useNavigate();
//   const theme = useTheme();
//   const isExtraSmall = useMediaQuery(theme.breakpoints.down(480));
//   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
//   const isMedium = useMediaQuery(theme.breakpoints.down("md"));
//   const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

//   // Calculate responsive heights
//   const getResponsiveHeight = () => {
//     if (maxHeight) return maxHeight;

//     if (isExtraSmall) return "calc(100vh - 280px)";
//     if (isSmall) return "calc(100vh - 250px)";
//     if (isMedium) return "calc(100vh - 220px)";
//     return "calc(100vh - 200px)";
//   };

//   const getResponsiveMinHeight = () => {
//     if (minHeight) return minHeight;

//     if (isExtraSmall) return "200px";
//     if (isSmall) return "250px";
//     if (isMedium) return "300px";
//     return "350px";
//   };

//   // Calculate responsive rows per page
//   const getResponsiveRowsPerPage = () => {
//     if (isExtraSmall) return Math.min(5, itemsPerPage);
//     if (isSmall) return Math.min(8, itemsPerPage);
//     if (isMedium) return Math.min(10, itemsPerPage);
//     return itemsPerPage;
//   };

//   // Update rows per page when screen size changes
//   useEffect(() => {
//     const responsiveRowsPerPage = getResponsiveRowsPerPage();
//     if (responsiveRowsPerPage !== rowsPerPage) {
//       setRowsPerPage(responsiveRowsPerPage);
//       setPage(0);
//     }
//   }, [isExtraSmall, isSmall, isMedium]);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedData = useMemo(() => {
//     let sortableData = [...data];
//     if (sortConfig.key) {
//       sortableData.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableData;
//   }, [data, sortConfig]);

//   const paginatedData = sortedData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Get responsive column width
//   const getColumnWidth = (columnKey, index) => {
//     if (columnKey === "actions") {
//       return isSmall ? "80px" : "120px";
//     }

//     if (columnKey === "discription") {
//       if (isExtraSmall) return "150px";
//       if (isSmall) return "200px";
//       if (isMedium) return "250px";
//       return "300px";
//     }

//     // Default responsive widths
//     if (isExtraSmall) return "100px";
//     if (isSmall) return "120px";
//     if (isMedium) return "150px";
//     return "auto";
//   };

//   const renderCellContent = (row, column) => {
//     const { key } = column;

//     // If column has a custom render function, use it
//     if (column.render && typeof column.render === "function") {
//       return column.render(row);
//     }

//     // Handle special cases
//     if (key === "actions") {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             gap: isSmall ? 0.5 : 1,
//             justifyContent: "flex-start",
//             flexWrap: isExtraSmall ? "wrap" : "nowrap",
//           }}
//         >
//           {onEdit && (
//             <IconButton
//               size={isSmall ? "small" : "medium"}
//               onClick={() => onEdit(row)}
//               sx={{
//                 color: "#1976d2",
//                 padding: isSmall ? "4px" : "8px",
//                 "&:hover": {
//                   backgroundColor: "rgba(25, 118, 210, 0.08)",
//                 },
//               }}
//             >
//               <EditIcon fontSize={isSmall ? "small" : "medium"} />
//             </IconButton>
//           )}
//           {onDelete && (
//             <IconButton
//               size={isSmall ? "small" : "medium"}
//               onClick={() => onDelete(row.id)}
//               sx={{
//                 color: "#d32f2f",
//                 padding: isSmall ? "4px" : "8px",
//                 "&:hover": {
//                   backgroundColor: "rgba(211, 47, 47, 0.08)",
//                 },
//               }}
//             >
//               <DeleteIcon fontSize={isSmall ? "small" : "medium"} />
//             </IconButton>
//           )}
//         </Box>
//       );
//     }

//     if (key === "discription") {
//       const value = row[key];
//       if (!value || value === "" || value === null || value === undefined) {
//         return "-";
//       }
//       return (
//         <Tooltip title={value} arrow>
//           <Box
//             sx={{
//               display: "-webkit-box",
//               WebkitLineClamp: isSmall ? 1 : 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "normal",
//               cursor: "default",
//               maxWidth: getColumnWidth("discription"),
//               fontSize: isSmall ? "0.75rem" : "0.875rem",
//               lineHeight: isSmall ? 1.2 : 1.4,
//             }}
//           >
//             {value}
//           </Box>
//         </Tooltip>
//       );
//     }

//     if (key === "priority") {
//       const value = row[key];
//       if (!value || value === "" || value === null || value === undefined) {
//         return "-";
//       }
//       return (
//         <Chip
//           label={value}
//           size={isSmall ? "small" : "medium"}
//           sx={{
//             backgroundColor: getPriorityBgColor(value),
//             color: getPriorityTextColor(value),
//             fontWeight: 500,
//             fontSize: isSmall ? "0.65rem" : "0.75rem",
//             height: isSmall ? "20px" : "24px",
//             "& .MuiChip-label": {
//               padding: isSmall ? "0 6px" : "0 8px",
//             },
//             "&::before": {
//               content: '""',
//               display: "inline-block",
//               width: isSmall ? "6px" : "8px",
//               height: isSmall ? "6px" : "8px",
//               borderRadius: "50%",
//               backgroundColor: getPriorityDotColor(value),
//               marginRight: "4px",
//             },
//           }}
//         />
//       );
//     }

//     if (key === "status") {
//       const value = row[key];
//       if (!value || value === "" || value === null || value === undefined) {
//         return "-";
//       }
//       return (
//         <Chip
//           label={value}
//           size={isSmall ? "small" : "medium"}
//           sx={{
//             backgroundColor: getStatusBgColor(value),
//             color: getStatusTextColor(value),
//             fontWeight: 500,
//             fontSize: isSmall ? "0.65rem" : "0.75rem",
//             height: isSmall ? "20px" : "24px",
//             "& .MuiChip-label": {
//               padding: isSmall ? "0 6px" : "0 8px",
//             },
//             "&::before": {
//               content: '""',
//               display: "inline-block",
//               width: isSmall ? "6px" : "8px",
//               height: isSmall ? "6px" : "8px",
//               borderRadius: "50%",
//               backgroundColor: getStatusDotColor(value),
//               marginRight: "4px",
//             },
//           }}
//         />
//       );
//     }

//     if (key === "pipelineStage") {
//       const value = row[key];
//       if (!value || value === "" || value === null || value === undefined) {
//         return "-";
//       }
//       return (
//         <Box
//           sx={{
//             display: "inline-flex",
//             alignItems: "center",
//             fontWeight: 500,
//             fontSize: isSmall ? "0.75rem" : "0.85rem",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <Box
//             sx={{
//               display: "inline-block",
//               width: isSmall ? "16px" : "24px",
//               height: "4px",
//               borderRadius: "9999px",
//               backgroundColor: getPipelineStageColor(value),
//               marginRight: isSmall ? "4px" : "8px",
//               flexShrink: 0,
//             }}
//           />
//           {value}
//         </Box>
//       );
//     }

//     // Default case - check for empty values and return "-" if empty
//     const value = row[key];
//     if (value === null || value === undefined || value === "") {
//       return "-";
//     }

//     // Handle long text for default columns
//     if (typeof value === "string" && value.length > (isSmall ? 15 : 20)) {
//       return (
//         <Tooltip title={value} arrow>
//           <Box
//             sx={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               maxWidth: isSmall ? "80px" : "150px",
//               fontSize: isSmall ? "0.75rem" : "0.875rem",
//             }}
//           >
//             {value}
//           </Box>
//         </Tooltip>
//       );
//     }

//     return (
//       <Typography
//         variant="body2"
//         sx={{
//           fontSize: isSmall ? "0.75rem" : "0.875rem",
//         }}
//       >
//         {value}
//       </Typography>
//     );
//   };

//   // Mobile Card View Component
//   const MobileCardView = ({ data }) => (
//     <Box sx={{ p: 1 }}>
//       {data.map((row, index) => (
//         <Card
//           key={row.id || index}
//           sx={{
//             mb: 2,
//             boxShadow: 1,
//             borderRadius: 2,
//             "&:hover": {
//               boxShadow: 2,
//             },
//           }}
//         >
//           <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//             <Grid container spacing={1}>
//               {columns
//                 .filter((col) => col.key !== "actions")
//                 .slice(0, isExtraSmall ? 3 : 4)
//                 .map((column, colIndex) => (
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     key={column.key}
//                     onClick={() => console.log("hiiii")}
//                   >
//                     <Box sx={{ mb: 1 }}>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           fontWeight: 600,
//                           color: "text.secondary",
//                           fontSize: "0.7rem",
//                           textTransform: "uppercase",
//                           letterSpacing: 0.5,
//                         }}
//                       >
//                         {column.label}
//                       </Typography>
//                       <Box sx={{ mt: 0.5 }}>
//                         {renderCellContent(row, column)}
//                       </Box>
//                     </Box>
//                   </Grid>
//                 ))}

//               {/* Actions for mobile */}
//               {(onEdit || onDelete) && (
//                 <Grid item xs={12}>
//                   <Divider sx={{ my: 1 }} />
//                   <Box
//                     sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
//                   >
//                     {onEdit && (
//                       <IconButton
//                         size="small"
//                         onClick={() => onEdit(row)}
//                         sx={{
//                           color: "#1976d2",
//                           backgroundColor: "rgba(25, 118, 210, 0.08)",
//                         }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                     {onDelete && (
//                       <IconButton
//                         size="small"
//                         onClick={() => onDelete(row.id)}
//                         sx={{
//                           color: "#d32f2f",
//                           backgroundColor: "rgba(211, 47, 47, 0.08)",
//                         }}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </Box>
//                 </Grid>
//               )}
//             </Grid>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );

//   // No data state
//   if (!data || data.length === 0) {
//     return (
//       <Paper
//         elevation={1}
//         sx={{
//           width: "100%",
//           overflow: "hidden",
//           height: getResponsiveHeight(),
//           minHeight: getResponsiveMinHeight(),
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: isSmall ? 1 : 2,
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             p: isSmall ? 2 : 4,
//           }}
//         >
//           <Box sx={{ textAlign: "center" }}>
//             <Typography
//               variant={isSmall ? "subtitle1" : "h6"}
//               color="text.secondary"
//               gutterBottom
//             >
//               {noDataMessage}
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.disabled"
//               sx={{ fontSize: isSmall ? "0.75rem" : "0.875rem" }}
//             >
//               There are no records to display
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     );
//   }

//   // Mobile view
//   if (isSmall && enableMobileCards) {
//     return (
//       <Paper
//         elevation={1}
//         sx={{
//           width: "100%",
//           overflow: "hidden",
//           maxHeight: getResponsiveHeight(),
//           minHeight: getResponsiveMinHeight(),
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: 1,
//         }}
//       >
//         <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//           <MobileCardView data={paginatedData} />
//         </Box>

//         <TablePagination
//           component="div"
//           count={data.length}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 8, 10]}
//           sx={{
//             borderTop: "1px solid rgba(224, 224, 224, 1)",
//             backgroundColor: "#fafafa",
//             flexShrink: 0,
//             "& .MuiTablePagination-toolbar": {
//               minHeight: isExtraSmall ? "44px" : "52px",
//               paddingLeft: 1,
//               paddingRight: 1,
//             },
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
//               {
//                 fontSize: "0.75rem",
//               },
//           }}
//         />
//       </Paper>
//     );
//   }

//   // Desktop/Tablet table view
//   return (
//     <Paper
//       elevation={1}
//       sx={{
//         width: "100%",
//         overflow: "hidden",
//         maxHeight: getResponsiveHeight(),
//         minHeight: getResponsiveMinHeight(),
//         display: "flex",
//         flexDirection: "column",
//         borderRadius: isSmall ? 1 : 2,
//       }}
//     >
//       <TableContainer
//         sx={{
//           flexGrow: 1,
//           overflowX: "auto",
//           overflowY: "auto",
//           // Custom scrollbar styling
//           "&::-webkit-scrollbar": {
//             width: isSmall ? "4px" : "6px",
//             height: isSmall ? "4px" : "6px",
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "#f1f1f1",
//             borderRadius: "4px",
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#c1c1c1",
//             borderRadius: "4px",
//             "&:hover": {
//               backgroundColor: "#a8a8a8",
//             },
//           },
//         }}
//       >
//         <Table stickyHeader size={isSmall ? "small" : "medium"}>
//           <TableHead>
//             <TableRow>
//               {columns.map(({ key, label, sortable }) => (
//                 <TableCell
//                   key={key}
//                   onClick={() => console.log("hiiii")}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#f6f6f9",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                     whiteSpace: "nowrap",
//                     padding: isSmall ? "8px 12px" : "12px 16px",
//                     fontSize: isSmall ? "0.75rem" : "0.875rem",
//                     minWidth: getColumnWidth(key),
//                     maxWidth:
//                       key === "discription" ? getColumnWidth(key) : "none",
//                   }}
//                 >
//                   {sortable ? (
//                     <TableSortLabel
//                       active={sortConfig.key === key}
//                       direction={
//                         sortConfig.key === key ? sortConfig.direction : "asc"
//                       }
//                       onClick={() => handleSort(key)}
//                       sx={{
//                         "& .MuiTableSortLabel-icon": {
//                           fontSize: isSmall ? "1rem" : "1.2rem",
//                         },
//                       }}
//                     >
//                       {label}
//                     </TableSortLabel>
//                   ) : (
//                     label
//                   )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row, idx) => (
//               <TableRow
//                 key={row.id || idx}
//                 onClick={
//                   module === "projectPage"
//                     ? () =>
//                         router("/admin/view-project", {
//                           state: { id: row?.id },
//                         })
//                     : undefined
//                 }
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "rgba(0, 0, 0, 0.02) !important",
//                   },
//                   backgroundColor:
//                     idx % 2 === 0 ? "#fff9fe !important" : "#f9f7f7 !important",
//                   "& td": {
//                     backgroundColor: "inherit",
//                   },
//                 }}
//               >
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.key}
//                     sx={{
//                       verticalAlign: "middle",
//                       padding: isSmall ? "6px 12px" : "8px 16px",
//                       borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
//                       minWidth: getColumnWidth(column.key),
//                       maxWidth:
//                         column.key === "discription"
//                           ? getColumnWidth(column.key)
//                           : "none",
//                     }}
//                   >
//                     {renderCellContent(row, column)}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={data.length}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onPageChange={(e, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(e) => {
//           setRowsPerPage(parseInt(e.target.value, 10));
//           setPage(0);
//         }}
//         rowsPerPageOptions={isSmall ? [5, 8, 10] : [5, 10, 25, 50]}
//         sx={{
//           borderTop: "1px solid rgba(224, 224, 224, 1)",
//           backgroundColor: "#fafafa",
//           flexShrink: 0,
//           "& .MuiTablePagination-toolbar": {
//             minHeight: isSmall ? "48px" : "56px",
//             paddingLeft: isSmall ? 1 : 2,
//             paddingRight: isSmall ? 1 : 2,
//           },
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
//             {
//               fontSize: isSmall ? "0.75rem" : "0.875rem",
//             },
//           "& .MuiTablePagination-select": {
//             fontSize: isSmall ? "0.75rem" : "0.875rem",
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// // Enhanced color helper functions
// const getPriorityDotColor = (priority) => {
//   switch (priority?.toLowerCase()) {
//     case "high":
//       return "#ef4444";
//     case "medium":
//       return "#f59e0b";
//     case "low":
//       return "#10b981";
//     default:
//       return "#6b7280";
//   }
// };

// const getPriorityBgColor = (priority) => {
//   switch (priority?.toLowerCase()) {
//     case "high":
//       return "rgba(239, 68, 68, 0.1)";
//     case "medium":
//       return "rgba(245, 158, 11, 0.1)";
//     case "low":
//       return "rgba(16, 185, 129, 0.1)";
//     default:
//       return "rgba(107, 114, 128, 0.1)";
//   }
// };

// const getPriorityTextColor = (priority) => {
//   switch (priority?.toLowerCase()) {
//     case "high":
//       return "#dc2626";
//     case "medium":
//       return "#d97706";
//     case "low":
//       return "#059669";
//     default:
//       return "#374151";
//   }
// };

// const getPipelineStageColor = (stage) => {
//   switch (stage?.toLowerCase()) {
//     case "plan":
//       return "#7c3aed";
//     case "develop":
//       return "#06b6d4";
//     case "completed":
//       return "#22c55e";
//     case "design":
//       return "#f59e0b";
//     default:
//       return "#6b7280";
//   }
// };

// const getStatusBgColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "to do":
//       return "rgba(107, 114, 128, 0.1)";
//     case "in progress":
//       return "rgba(59, 130, 246, 0.1)";
//     case "done":
//       return "rgba(34, 197, 94, 0.1)";
//     case "active":
//       return "rgba(16, 185, 129, 0.1)";
//     case "inactive":
//       return "rgba(239, 68, 68, 0.1)";
//     default:
//       return "rgba(107, 114, 128, 0.1)";
//   }
// };

// const getStatusTextColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "to do":
//       return "#374151";
//     case "in progress":
//       return "#1d4ed8";
//     case "done":
//       return "#166534";
//     case "active":
//       return "#047857";
//     case "inactive":
//       return "#dc2626";
//     default:
//       return "#374151";
//   }
// };

// const getStatusDotColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "to do":
//       return "#6b7280";
//     case "in progress":
//       return "#3b82f6";
//     case "done":
//       return "#22c55e";
//     case "active":
//       return "#10b981";
//     case "inactive":
//       return "#ef4444";
//     default:
//       return "#6b7280";
//   }
// };

// export default CommonTable;

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Tooltip,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Chip,
  Card,
  CardContent,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import {
  getFontSize,
  getPipelineStageColor,
  getPriorityBgColor,
  getPriorityDotColor,
  getPriorityTextColor,
  getResponsiveHeight,
  getResponsiveMinHeight,
  getStatusBgColors,
  getStatusDotColor,
  getStatusTextColor,
} from "../../utils/helpers/basicHelper";

const getColorFromName = (name) => {
  if (!name) return "#1976d2";

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 65%, 50%)`;
};

const ByNameAvatar = (name) => {
  if (!name) return "";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("");
};

const CommonTable = ({
  data = [],
  columns = [],
  itemsPerPage = 5,
  onEdit = null,
  onDelete = null,
  module,
  noDataMessage = "No data available",
  maxHeight = null,
  minHeight = null,
  enableMobileCards = true,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const router = useNavigate();
  const theme = useTheme();

  const isExtraSmall = useMediaQuery("(max-width:480px)");
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const isXXLarge = useMediaQuery(theme.breakpoints.up("xl"));

  useEffect(() => {
    setPage(0);
  }, [isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Reduced column widths
  const getColumnWidth = (columnKey, index) => {
    if (columnKey === "actions") {
      if (isExtraSmall) return "50px";
      if (isSmall) return "60px";
      if (isMedium) return "70px";
      return "80px";
    }

    if (columnKey === "discription") {
      // Increased width for project module
      if (module === "projectPage") {
        if (isExtraSmall) return "150px";
        if (isSmall && !isMedium) return "180px";
        if (isSmall) return "200px";
        if (isMedium && !isLarge) return "240px";
        if (isMedium) return "280px";
        if (isLarge && !isXXLarge) return "320px";
        if (isExtraLarge) return "360px";
        return "400px";
      }

      // Default width for other modules
      if (isExtraSmall) return "100px";
      if (isSmall && !isMedium) return "120px";
      if (isSmall) return "140px";
      if (isMedium && !isLarge) return "160px";
      if (isMedium) return "180px";
      if (isLarge && !isXXLarge) return "200px";
      if (isExtraLarge) return "220px";
      return "250px";
    }

    // Special width for project name column (with avatar) - reduced
    if (columnKey === "projectName" || columnKey === "name") {
      if (isExtraSmall) return "100px";
      if (isSmall && !isMedium) return "120px";
      if (isSmall) return "140px";
      if (isMedium && !isLarge) return "160px";
      if (isMedium) return "180px";
      if (isLarge && !isXXLarge) return "200px";
      if (isExtraLarge) return "220px";
      return "240px";
    }

    // Reduced general column widths
    if (isExtraSmall) return "60px";
    if (isSmall && !isMedium) return "70px";
    if (isSmall) return "80px";
    if (isMedium && !isLarge) return "90px";
    if (isMedium) return "100px";
    if (isLarge && !isXXLarge) return "120px";
    if (isExtraLarge) return "140px";
    return "auto";
  };

  const renderCellContent = (row, column) => {
    const { key } = column;

    if (column.render && typeof column.render === "function") {
      return column.render(row);
    }

    if (key === "actions") {
      return (
        <Box
          sx={{
            display: "flex",
            gap: isExtraSmall ? 0.25 : isSmall ? 0.5 : 0.75,
            justifyContent: "flex-start",
            flexWrap: isExtraSmall ? "wrap" : "nowrap",
          }}
        >
          {onEdit && (
            <IconButton
              size={isExtraSmall ? "small" : isSmall ? "small" : "medium"}
              onClick={() => onEdit(row)}
              sx={{
                color: "#1976d2",
                padding: isExtraSmall ? "2px" : isSmall ? "3px" : "4px",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              <EditIcon
                fontSize={isExtraSmall ? "small" : isSmall ? "small" : "medium"}
              />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size={isExtraSmall ? "small" : isSmall ? "small" : "medium"}
              onClick={() => onDelete(row.id)}
              sx={{
                color: "#d32f2f",
                padding: isExtraSmall ? "2px" : isSmall ? "3px" : "4px",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <DeleteIcon
                fontSize={isExtraSmall ? "small" : isSmall ? "small" : "medium"}
              />
            </IconButton>
          )}
        </Box>
      );
    }

    if (key === "projectName" || key === "name") {
      const value = row[key];
      if (!value || value === "" || value === null || value === undefined) {
        return "-";
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isExtraSmall ? 0.5 : isSmall ? 0.75 : 1,
          }}
        >
          <Avatar
            sx={{
              width: isExtraSmall ? 20 : isSmall ? 24 : 28,
              height: isExtraSmall ? 20 : isSmall ? 24 : 28,
              fontSize: getFontSize(
                "caption",
                isExtraSmall,
                isSmall,
                isMedium,
                isLarge,
                isXXLarge,
                isExtraLarge
              ),
              backgroundColor: getColorFromName(value),
              color: "white",
              fontWeight: 600,
            }}
          >
            {ByNameAvatar(value)}
          </Avatar>
          <Tooltip title={value} arrow>
            <Typography
              variant="body2"
              sx={{
                fontSize: getFontSize(
                  "body",
                  isExtraSmall,
                  isSmall,
                  isMedium,
                  isLarge,
                  isXXLarge,
                  isExtraLarge
                ),
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "calc(100% - 30px)",
              }}
            >
              {value}
            </Typography>
          </Tooltip>
        </Box>
      );
    }

    if (key === "discription") {
      const value = row[key];
      if (!value || value === "" || value === null || value === undefined) {
        return "-";
      }
      return (
        <Tooltip title={value} arrow>
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: isExtraSmall ? 1 : isSmall ? 1 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              cursor: "pointer",
              maxWidth: getColumnWidth("discription"),
              fontSize: getFontSize(
                "body",
                isExtraSmall,
                isSmall,
                isMedium,
                isLarge,
                isXXLarge,
                isExtraLarge
              ),
              lineHeight: isExtraSmall ? 1.1 : isSmall ? 1.2 : 1.4,
            }}
          >
            {value}
          </Box>
        </Tooltip>
      );
    }

    if (key === "priority") {
      const value = row[key];
      if (!value) return "-";

      return (
        <Chip
          label={
            <span style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
                  height: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
                  borderRadius: "50%",
                  backgroundColor: getPriorityDotColor(value),
                  marginRight: isExtraSmall ? "3px" : "4px",
                }}
              />
              {value}
            </span>
          }
          size={isExtraSmall || isSmall ? "small" : "medium"}
          sx={{
            backgroundColor: getPriorityBgColor(value),
            color: getPriorityTextColor(value),
            fontWeight: 500,
            fontSize: getFontSize(
              "caption",
              isExtraSmall,
              isSmall,
              isMedium,
              isLarge,
              isXXLarge,
              isExtraLarge
            ),
            height: isExtraSmall ? "16px" : isSmall ? "18px" : "20px",
            "& .MuiChip-label": {
              padding: isExtraSmall ? "0 3px" : isSmall ? "0 4px" : "0 6px",
            },
          }}
        />
      );
    }

    if (key === "status") {
      const value = row[key];
      if (!value || value === "" || value === null || value === undefined) {
        return "-";
      }
      return (
        <Chip
          label={value}
          size={isExtraSmall || isSmall ? "small" : "medium"}
          sx={{
            backgroundColor: getStatusBgColors(value),
            color: getStatusTextColor(value),
            fontWeight: 500,
            fontSize: getFontSize(
              "caption",
              isExtraSmall,
              isSmall,
              isMedium,
              isLarge,
              isXXLarge,
              isExtraLarge
            ),
            height: isExtraSmall ? "16px" : isSmall ? "18px" : "20px",
            "& .MuiChip-label": {
              padding: isExtraSmall ? "0 3px" : isSmall ? "0 4px" : "0 6px",
            },
            "&::before": {
              content: '""',
              display: "inline-block",
              width: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
              height: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
              borderRadius: "50%",
              backgroundColor: getStatusDotColor(value),
              marginRight: isExtraSmall ? "2px" : "3px",
            },
          }}
        />
      );
    }

    if (key === "pipelineStage") {
      const value = row[key];
      if (!value || value === "" || value === null || value === undefined) {
        return "-";
      }
      return (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: getFontSize(
              "body",
              isExtraSmall,
              isSmall,
              isMedium,
              isLarge,
              isXXLarge,
              isExtraLarge
            ),
            whiteSpace: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              width: isExtraSmall ? "8px" : isSmall ? "12px" : "16px",
              height: isExtraSmall ? "2px" : "3px",
              borderRadius: "9999px",
              backgroundColor: getPipelineStageColor(value),
              marginRight: isExtraSmall ? "2px" : isSmall ? "3px" : "4px",
              flexShrink: 0,
            }}
          />
          {value}
        </Box>
      );
    }

    const value = row[key];
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    const maxLength = isExtraSmall ? 8 : isSmall ? 12 : isMedium ? 15 : 20;
    if (typeof value === "string" && value.length > maxLength) {
      return (
        <Tooltip title={value} arrow>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: getColumnWidth(key),
              fontSize: getFontSize(
                "body",
                isExtraSmall,
                isSmall,
                isMedium,
                isLarge,
                isXXLarge,
                isExtraLarge
              ),
            }}
          >
            {value}
          </Box>
        </Tooltip>
      );
    }

    return (
      <Typography
        variant="body2"
        sx={{
          fontSize: getFontSize(
            "body",
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isXXLarge,
            isExtraLarge
          ),
        }}
      >
        {value}
      </Typography>
    );
  };

  const MobileCardView = ({ data }) => (
    <Box sx={{ p: isExtraSmall ? 0.5 : 1 }}>
      {data.map((row, index) => (
        <Card
          key={row.id || index}
          sx={{
            mb: isExtraSmall ? 1 : 2,
            boxShadow: 1,
            borderRadius: isExtraSmall ? 1 : 2,
            "&:hover": {
              boxShadow: 2,
            },
          }}
        >
          <CardContent
            sx={{
              p: isExtraSmall ? 0.75 : 1.5,
              "&:last-child": { pb: isExtraSmall ? 0.75 : 1.5 },
            }}
          >
            <Grid container spacing={isExtraSmall ? 0.5 : 1}>
              {columns
                .filter((col) => col.key !== "actions")
                .slice(0, isExtraSmall ? 2 : 4)
                .map((column, colIndex) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={column.key}
                    onClick={() => console.log("hiiii")}
                  >
                    <Box sx={{ mb: isExtraSmall ? 0.5 : 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: "text.secondary",
                          fontSize: getFontSize(
                            "caption",
                            isExtraSmall,
                            isSmall,
                            isMedium,
                            isLarge,
                            isXXLarge,
                            isExtraLarge
                          ),
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {column.label}
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {renderCellContent(row, column)}
                      </Box>
                    </Box>
                  </Grid>
                ))}

              {(onEdit || onDelete) && (
                <Grid item xs={12}>
                  <Divider sx={{ my: isExtraSmall ? 0.5 : 1 }} />
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                  >
                    {onEdit && (
                      <IconButton
                        size="small"
                        onClick={() => onEdit(row)}
                        sx={{
                          color: "#1976d2",
                          backgroundColor: "rgba(25, 118, 210, 0.08)",
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        size="small"
                        onClick={() => onDelete(row.id)}
                        sx={{
                          color: "#d32f2f",
                          backgroundColor: "rgba(211, 47, 47, 0.08)",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          overflow: "hidden",
          height: getResponsiveHeight(
            minHeight,
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isXXLarge,
            isExtraLarge
          ),
          minHeight: getResponsiveMinHeight(
            minHeight,
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isXXLarge,
            isExtraLarge
          ),
          display: "flex",
          flexDirection: "column",
          borderRadius: isExtraSmall ? 1 : isSmall ? 1 : 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isExtraSmall ? 1 : isSmall ? 2 : 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant={isExtraSmall ? "body1" : isSmall ? "subtitle1" : "h6"}
              color="text.secondary"
              gutterBottom
            >
              {noDataMessage}
            </Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{
                fontSize: getFontSize(
                  "body",
                  isExtraSmall,
                  isSmall,
                  isMedium,
                  isLarge,
                  isXXLarge,
                  isExtraLarge
                ),
              }}
            >
              There are no records to display
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  if (isSmall && enableMobileCards) {
    return (
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          overflow: "hidden",
          maxHeight: getResponsiveHeight(
            maxHeight,
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isXXLarge,
            isExtraLarge
          ),
          minHeight: getResponsiveMinHeight(
            minHeight,
            isExtraSmall,
            isSmall,
            isMedium,
            isLarge,
            isXXLarge,
            isExtraLarge
          ),
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <MobileCardView data={paginatedData} />
        </Box>

        <TablePagination
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            borderTop: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: "#fafafa",
            flexShrink: 0,
            "& .MuiTablePagination-toolbar": {
              minHeight: isExtraSmall ? "36px" : "48px",
              paddingLeft: isExtraSmall ? 0.5 : 1,
              paddingRight: isExtraSmall ? 0.5 : 1,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: getFontSize(
                  "caption",
                  isExtraSmall,
                  isSmall,
                  isMedium,
                  isLarge,
                  isXXLarge,
                  isExtraLarge
                ),
              },
          }}
        />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        overflow: "hidden",
        maxHeight: getResponsiveHeight(
          maxHeight,
          isExtraSmall,
          isSmall,
          isMedium,
          isLarge,
          isXXLarge,
          isExtraLarge
        ),
        minHeight: getResponsiveMinHeight(
          minHeight,
          isExtraSmall,
          isSmall,
          isMedium,
          isLarge,
          isXXLarge,
          isExtraLarge
        ),
        display: "flex",
        flexDirection: "column",
        borderRadius: isExtraSmall ? 1 : isSmall ? 1 : 2,
      }}
    >
      <TableContainer
        sx={{
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "auto",
          paddingRight: "6px",
          paddingLeft: "6px",
          paddingBottom: "4px",
          "&::-webkit-scrollbar": {
            width: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
            height: isExtraSmall ? "3px" : isSmall ? "4px" : "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
        }}
      >
        <Table
          stickyHeader
          size={isExtraSmall || isSmall ? "small" : "medium"}
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            "& .MuiTableBody-root .MuiTableRow-root": {
              "&:first-of-type td": {},
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map(({ key, label, sortable }) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f6f6f9",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    padding: isExtraSmall
                      ? "6px 4px"
                      : isSmall
                      ? "8px 6px"
                      : "10px 8px",
                    fontSize: getFontSize(
                      "header",
                      isExtraSmall,
                      isSmall,
                      isMedium,
                      isLarge,
                      isXXLarge,
                      isExtraLarge
                    ),
                    minWidth: getColumnWidth(key),
                    maxWidth:
                      key === "discription" ? getColumnWidth(key) : "none",
                    borderBottom: "2px solid rgba(224, 224, 224, 0.8)",
                    borderTopLeftRadius: key === columns[0].key ? "8px" : "0",
                    borderTopRightRadius:
                      key === columns[columns.length - 1].key ? "8px" : "0",
                  }}
                >
                  {sortable ? (
                    <TableSortLabel
                      active={sortConfig.key === key}
                      direction={
                        sortConfig.key === key ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort(key)}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          fontSize: isExtraSmall
                            ? "0.8rem"
                            : isSmall
                            ? "1rem"
                            : "1.2rem",
                        },
                      }}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow
                key={row.id || idx}
                onClick={
                  module === "projectPage"
                    ? () =>
                        router("/smart-HR/view-project", {
                          state: { id: row?.id },
                        })
                    : undefined
                }
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  transition: "all 0.2s ease-in-out",
                  cursor: module === "projectPage" ? "pointer" : "default",
                  position: "relative",
                  zIndex: 1,
                  "&:not(:last-child)": {
                    marginBottom: "8px",
                  },
                  "&:hover": {
                    backgroundColor: "#f4f4f7",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                    transform: "translateY(-1px)",
                    borderColor: "rgba(0, 0, 0, 0.10)",
                  },
                  "& td": {
                    backgroundColor: "transparent !important",
                    borderBottom: "none !important",
                    borderRight: "none !important",
                    borderLeft: "none !important",
                    borderTop: "none !important",
                  },
                  "& td:first-of-type": {
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    paddingLeft: isExtraSmall
                      ? "8px"
                      : isSmall
                      ? "10px"
                      : "12px",
                  },
                  "& td:last-of-type": {
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    paddingRight: isExtraSmall
                      ? "12px"
                      : isSmall
                      ? "16px"
                      : "20px",
                  },
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      cursor: module === "projectPage" ? "pointer" : "pointer",
                      verticalAlign: "middle",
                      borderBottom: "none !important",
                      borderRight: "none !important",
                      borderLeft: "none !important",
                      borderTop: "none !important",
                      minWidth: getColumnWidth(column.key),
                      maxWidth:
                        column.key === "discription"
                          ? getColumnWidth(column.key)
                          : "none",

                      paddingTop: isExtraSmall
                        ? "16px"
                        : isSmall
                        ? "20px"
                        : "24px",
                      paddingBottom: isExtraSmall
                        ? "16px"
                        : isSmall
                        ? "20px"
                        : "24px",
                      paddingLeft:
                        colIndex === 0
                          ? isExtraSmall
                            ? "16px"
                            : isSmall
                            ? "20px"
                            : "24px"
                          : isExtraSmall
                          ? "8px"
                          : isSmall
                          ? "12px"
                          : "16px",
                      paddingRight:
                        colIndex === columns.length - 1
                          ? isExtraSmall
                            ? "16px"
                            : isSmall
                            ? "20px"
                            : "24px"
                          : isExtraSmall
                          ? "8px"
                          : isSmall
                          ? "12px"
                          : "16px",
                    }}
                  >
                    {renderCellContent(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        // rowsPerPageOptions={getResponsivePaginationOptions()}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          borderTop: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: "#fafafa",
          flexShrink: 0,
          "& .MuiTablePagination-toolbar": {
            minHeight: isExtraSmall ? "40px" : isSmall ? "48px" : "56px",
            paddingLeft: isExtraSmall ? 0.5 : isSmall ? 1 : 2,
            paddingRight: isExtraSmall ? 0.5 : isSmall ? 1 : 2,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: getFontSize(
                "caption",
                isExtraSmall,
                isExtraSmall,
                isSmall,
                isMedium,
                isLarge,
                isXXLarge,
                isExtraLarge
              ),
            },
          "& .MuiTablePagination-select": {
            fontSize: getFontSize(
              "caption",
              isExtraSmall,
              isSmall,
              isMedium,
              isLarge,
              isXXLarge,
              isExtraLarge
            ),
          },
        }}
      />
    </Paper>
  );
};

export default CommonTable;
