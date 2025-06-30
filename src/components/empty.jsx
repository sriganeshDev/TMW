// import React from "react";
// import {
//   Box,
//   Grid,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { CommonTextField } from "./CommonTextField";
// import { CommonDatePicker } from "./CommonDatePicker";
// import { CommonDropdown } from "./CommonDropdown";

// // Validation Schema
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   projectId: Yup.string().required("Project ID is required"),
//   projectType: Yup.string().required("Project Type is required"),
//   client: Yup.string().required("Client is required"),
//   category: Yup.string().required("Category is required"),
//   projectTiming: Yup.string().required("Project Timing is required"),
//   price: Yup.number().required("Price is required"),
//   amount: Yup.number().required("Amount is required"),
//   total: Yup.number().required("Total is required"),
//   responsiblePersons: Yup.array().min(
//     1,
//     "At least one responsible person is required"
//   ),
//   teamLeader: Yup.string().required("Team Leader is required"),
//   startDate: Yup.date().required("Start Date is required"),
//   dueDate: Yup.date().required("Due Date is required"),
//   description: Yup.string().required("Description is required"),
// });

// // Sample data for dropdowns
// const projectTypeOptions = [
//   { value: "web", label: "Web Development" },
//   { value: "mobile", label: "Mobile App" },
//   { value: "design", label: "Design" },
//   { value: "marketing", label: "Marketing" },
// ];

// const clientOptions = [
//   { value: "client1", label: "Client A" },
//   { value: "client2", label: "Client B" },
//   { value: "client3", label: "Client C" },
// ];

// const categoryOptions = [
//   { value: "category1", label: "Category 1" },
//   { value: "category2", label: "Category 2" },
//   { value: "category3", label: "Category 3" },
// ];

// const projectTimingOptions = [
//   { value: "1week", label: "1 Week" },
//   { value: "2weeks", label: "2 Weeks" },
//   { value: "1month", label: "1 Month" },
//   { value: "3months", label: "3 Months" },
// ];

// const priorityOptions = [
//   { value: "low", label: "Low" },
//   { value: "medium", label: "Medium" },
//   { value: "high", label: "High" },
//   { value: "urgent", label: "Urgent" },
// ];

// const statusOptions = [
//   { value: "pending", label: "Pending" },
//   { value: "active", label: "Active" },
//   { value: "completed", label: "Completed" },
//   { value: "on-hold", label: "On Hold" },
// ];

// const teamMembers = [
//   { id: 1, name: "Darlee Robertson", avatar: "🔷" },
//   { id: 2, name: "Sharon Roy", avatar: "👑" },
//   { id: 3, name: "John Smith", avatar: "👤" },
//   { id: 4, name: "Sarah Johnson", avatar: "👩" },
// ];

// export const AddNewProjectForm = ({ open, onClose, onSubmit }) => {
//   const initialValues = {
//     name: "",
//     projectId: "",
//     projectType: "",
//     client: "",
//     category: "",
//     projectTiming: "",
//     price: "",
//     amount: "",
//     total: "",
//     responsiblePersons: [1, 2], // Default selected persons (Darlee Robertson, Sharon Roy)
//     teamLeader: "2", // Default team leader (Sharon Roy)
//     startDate: new Date("2020-02-29"),
//     dueDate: new Date("2020-02-29"),
//     priority: "",
//     status: "",
//     description: "",
//   };

//   const handleSubmit = (values, { setSubmitting, resetForm }) => {
//     console.log("Form values:", values);
//     if (onSubmit) {
//       onSubmit(values);
//     }
//     setSubmitting(false);
//     resetForm();
//     onClose();
//   };

//   const handleRemoveResponsiblePerson = (personId, setFieldValue, values) => {
//     const updatedPersons = values.responsiblePersons.filter(
//       (id) => id !== personId
//     );
//     setFieldValue("responsiblePersons", updatedPersons);
//   };

//   const handleRemoveTeamLeader = (setFieldValue) => {
//     setFieldValue("teamLeader", "");
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "8px",
//           maxHeight: "90vh",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           fontSize: "18px",
//           fontWeight: 600,
//           color: "#333",
//           borderBottom: "1px solid #eee",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         Add New Project
//         <IconButton
//           onClick={onClose}
//           sx={{
//             color: "#999",
//             "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, errors, touched, setFieldValue, isSubmitting }) => (
//           <Form>
//             <DialogContent sx={{ padding: "24px" }}>
//               <Grid container spacing={3}>
//                 {/* Name */}
//                 <Grid item xs={12}>
//                   <CommonTextField
//                     label="Name"
//                     value={values.name}
//                     onChange={(e) => setFieldValue("name", e.target.value)}
//                     placeholder="Enter project name"
//                     required
//                     error={touched.name && !!errors.name}
//                     helperText={touched.name && errors.name}
//                   />
//                 </Grid>

//                 {/* Project ID and Project Type */}
//                 <Grid item xs={12} md={6}>
//                   <CommonTextField
//                     label="Project ID"
//                     value={values.projectId}
//                     onChange={(e) => setFieldValue("projectId", e.target.value)}
//                     placeholder="Enter project ID"
//                     required
//                     error={touched.projectId && !!errors.projectId}
//                     helperText={touched.projectId && errors.projectId}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CommonDropdown
//                     label="Project Type"
//                     value={values.projectType}
//                     onChange={(e) =>
//                       setFieldValue("projectType", e.target.value)
//                     }
//                     options={projectTypeOptions}
//                     placeholder="Choose"
//                     required
//                     error={touched.projectType && !!errors.projectType}
//                   />
//                 </Grid>

//                 {/* Client and Category */}
//                 <Grid item xs={12} md={6}>
//                   <CommonDropdown
//                     label="Client"
//                     value={values.client}
//                     onChange={(e) => setFieldValue("client", e.target.value)}
//                     options={clientOptions}
//                     placeholder="Select"
//                     required
//                     error={touched.client && !!errors.client}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CommonDropdown
//                     label="Category"
//                     value={values.category}
//                     onChange={(e) => setFieldValue("category", e.target.value)}
//                     options={categoryOptions}
//                     placeholder="Select"
//                     required
//                     error={touched.category && !!errors.category}
//                   />
//                 </Grid>

//                 {/* Project Timing, Price, Amount, Total */}
//                 <Grid item xs={12} md={3}>
//                   <CommonDropdown
//                     label="Project Timing"
//                     value={values.projectTiming}
//                     onChange={(e) =>
//                       setFieldValue("projectTiming", e.target.value)
//                     }
//                     options={projectTimingOptions}
//                     placeholder="Select"
//                     required
//                     error={touched.projectTiming && !!errors.projectTiming}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <CommonTextField
//                     label="Price"
//                     value={values.price}
//                     onChange={(e) => setFieldValue("price", e.target.value)}
//                     placeholder="0"
//                     type="number"
//                     required
//                     error={touched.price && !!errors.price}
//                     helperText={touched.price && errors.price}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <CommonTextField
//                     label="Amount"
//                     value={values.amount}
//                     onChange={(e) => setFieldValue("amount", e.target.value)}
//                     placeholder="0"
//                     type="number"
//                     required
//                     error={touched.amount && !!errors.amount}
//                     helperText={touched.amount && errors.amount}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <CommonTextField
//                     label="Total"
//                     value={values.total}
//                     onChange={(e) => setFieldValue("total", e.target.value)}
//                     placeholder="0"
//                     type="number"
//                     required
//                     error={touched.total && !!errors.total}
//                     helperText={touched.total && errors.total}
//                   />
//                 </Grid>

//                 {/* Responsible Persons */}
//                 <Grid item xs={12} md={6}>
//                   <Box>
//                     <Box
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 500,
//                         color: "#333",
//                         mb: 1,
//                       }}
//                     >
//                       Responsible Persons{" "}
//                       <span style={{ color: "#f44336" }}>*</span>
//                     </Box>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                       {values.responsiblePersons.map((personId) => {
//                         const person = teamMembers.find(
//                           (member) => member.id === personId
//                         );
//                         return person ? (
//                           <Chip
//                             key={person.id}
//                             avatar={
//                               <Avatar
//                                 sx={{ width: 24, height: 24, fontSize: "12px" }}
//                               >
//                                 {person.avatar}
//                               </Avatar>
//                             }
//                             label={person.name}
//                             onDelete={() =>
//                               handleRemoveResponsiblePerson(
//                                 person.id,
//                                 setFieldValue,
//                                 values
//                               )
//                             }
//                             sx={{
//                               backgroundColor: "#f5f5f5",
//                               "& .MuiChip-deleteIcon": {
//                                 color: "#666",
//                                 "&:hover": { color: "#f44336" },
//                               },
//                             }}
//                           />
//                         ) : null;
//                       })}
//                     </Box>
//                     {touched.responsiblePersons &&
//                       errors.responsiblePersons && (
//                         <Box
//                           sx={{ color: "#f44336", fontSize: "12px", mt: 0.5 }}
//                         >
//                           {errors.responsiblePersons}
//                         </Box>
//                       )}
//                   </Box>
//                 </Grid>

//                 {/* Team Leader */}
//                 <Grid item xs={12} md={6}>
//                   <Box>
//                     <Box
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 500,
//                         color: "#333",
//                         mb: 1,
//                       }}
//                     >
//                       Team Leader <span style={{ color: "#f44336" }}>*</span>
//                     </Box>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                       {values.teamLeader &&
//                         (() => {
//                           const leader = teamMembers.find(
//                             (member) =>
//                               member.id === parseInt(values.teamLeader)
//                           );
//                           return leader ? (
//                             <Chip
//                               avatar={
//                                 <Avatar
//                                   sx={{
//                                     width: 24,
//                                     height: 24,
//                                     fontSize: "12px",
//                                   }}
//                                 >
//                                   {leader.avatar}
//                                 </Avatar>
//                               }
//                               label={leader.name}
//                               onDelete={() =>
//                                 handleRemoveTeamLeader(setFieldValue)
//                               }
//                               sx={{
//                                 backgroundColor: "#f5f5f5",
//                                 "& .MuiChip-deleteIcon": {
//                                   color: "#666",
//                                   "&:hover": { color: "#f44336" },
//                                 },
//                               }}
//                             />
//                           ) : null;
//                         })()}
//                     </Box>
//                     {touched.teamLeader && errors.teamLeader && (
//                       <Box sx={{ color: "#f44336", fontSize: "12px", mt: 0.5 }}>
//                         {errors.teamLeader}
//                       </Box>
//                     )}
//                   </Box>
//                 </Grid>

//                 {/* Start Date and Due Date */}
//                 <Grid item xs={12} md={6}>
//                   <CommonDatePicker
//                     label="Start Date"
//                     value={values.startDate}
//                     onChange={(newValue) =>
//                       setFieldValue("startDate", newValue)
//                     }
//                     required
//                     error={touched.startDate && !!errors.startDate}
//                     helperText={touched.startDate && errors.startDate}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CommonDatePicker
//                     label="Due Date"
//                     value={values.dueDate}
//                     onChange={(newValue) => setFieldValue("dueDate", newValue)}
//                     required
//                     error={touched.dueDate && !!errors.dueDate}
//                     helperText={touched.dueDate && errors.dueDate}
//                   />
//                 </Grid>

//                 {/* Priority and Status */}
//                 <Grid item xs={12} md={6}>
//                   <CommonDropdown
//                     label="Priority"
//                     value={values.priority}
//                     onChange={(e) => setFieldValue("priority", e.target.value)}
//                     options={priorityOptions}
//                     placeholder="Select"
//                     fullWidth={true}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CommonDropdown
//                     label="Status"
//                     value={values.status}
//                     fullWidth={true}
//                     onChange={(e) => setFieldValue("status", e.target.value)}
//                     options={statusOptions}
//                     placeholder="Select"
//                   />
//                 </Grid>

//                 {/* Description */}
//                 <Grid item xs={12}>
//                   <CommonTextField
//                     label="Description"
//                     value={values.description}
//                     onChange={(e) =>
//                       setFieldValue("description", e.target.value)
//                     }
//                     placeholder="Enter project description"
//                     variant="textarea"
//                     rows={4}
//                     required
//                     error={touched.description && !!errors.description}
//                     helperText={touched.description && errors.description}
//                   />
//                 </Grid>
//               </Grid>
//             </DialogContent>

//             <DialogActions
//               sx={{
//                 padding: "16px 24px",
//                 borderTop: "1px solid #eee",
//                 gap: 2,
//               }}
//             >
//               <Button
//                 onClick={onClose}
//                 variant="outlined"
//                 sx={{
//                   borderColor: "#ddd",
//                   color: "#666",
//                   "&:hover": {
//                     borderColor: "#999",
//                     backgroundColor: "rgba(0,0,0,0.04)",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={isSubmitting}
//                 sx={{
//                   backgroundColor: "#f44336",
//                   "&:hover": {
//                     backgroundColor: "#d32f2f",
//                   },
//                 }}
//               >
//                 Create
//               </Button>
//             </DialogActions>
//           </Form>
//         )}
//       </Formik>
//     </Dialog>
//   );
// };

import React, { useState } from "react";

import { Eye, EyeOff, Mail, Lock, User, Github, Twitter } from "lucide-react";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",

    password: "",

    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate API call

    setTimeout(() => {
      setIsLoading(false);

      console.log("Login attempt:", formData);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1279502184/photo/project-management-concept-with-gantt-chart.jpg?s=612x612&w=0&k=20&c=cyH6eJgMjZPuhYwCp1mc334Y3EOngkPAibyBBokJ7To=')`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 "></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60  rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl opacity-20 blur-sm"></div>
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-red-600 hover:text-red-800 transition duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 hover:scale-105"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("GitHub")}
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 hover:scale-105"
                >
                  <Github className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Twitter")}
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 hover:scale-105"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-red-600 hover:text-red-800 transition duration-200"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Floating elements for extra visual appeal */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-300 rounded-full opacity-40 animate-pulse"></div>
      </div>
    </div>
  );
};
export default LoginScreen;
