// // import React, { useState } from "react";
// // import { Formik, Form } from "formik";
// // import * as Yup from "yup";
// // import CloseIcon from "@mui/icons-material/Close";
// // import { Button, Typography, Chip, Avatar, IconButton } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
// // import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
// // import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
// // import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
// // import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
// // import EnhancedTable from "../../components/reusablecomponents/CommonTable";
// // import ProjectTable from "../../components/reusablecomponents/CommonTable";
// // import SearchIcon from "@mui/icons-material/Search";
// // import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// // import AddIcon from "@mui/icons-material/Add";
// // import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// // import CommonTable from "../../components/reusablecomponents/CommonTable";

// // const UserManagement = () => {
// //   const [filterModal, setFilterModal] = useState(false);
// //   const [openConfirm, setOpenConfirm] = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   const validationSchema = Yup.object({
// //     username: Yup.string().required("Username is required"),
// //     email: Yup.string().email("Invalid email").required("Email is required"),
// //     phonenumber: Yup.string().required("Phone number is required"),
// //     location: Yup.string().required("Location is required"),
// //   });

// //   const filterOpenModal = () => {
// //     setFilterModal(true);
// //   };

// //   const filterCloseModal = () => {
// //     setFilterModal(false);
// //     setEditMode(false);
// //     setSelectedUser(null);
// //   };

// //   const handleEdit = (user) => {
// //     setSelectedUser(user);
// //     setEditMode(true);
// //     setFilterModal(true);
// //   };

// //   const handleDelete = (userId) => {
// //     console.log("Delete user with ID:", userId);
// //     setOpenConfirm(true);
// //     // Add your delete logic here
// //   };

// //   const columns = [
// //     { key: "username", label: "Username", sortable: true },
// //     { key: "email", label: "Email", sortable: true },
// //     { key: "phonenumber", label: "Phone Number", sortable: true },
// //     { key: "location", label: "Location", sortable: true },
// //     { key: "created", label: "Created", sortable: true },
// //     { key: "actions", label: "Actions", sortable: false },
// //   ];

// //   const sampleData = [
// //     {
// //       id: 1,
// //       username: "john_doe",
// //       email: "john.doe@example.com",
// //       phonenumber: "+1 234 567 8901",
// //       location: "New York, USA",
// //       created: "25 Sep 2023",
// //     },
// //     {
// //       id: 2,
// //       username: "jane_smith",
// //       email: "jane.smith@example.com",
// //       phonenumber: "+1 234 567 8902",
// //       location: "Los Angeles, USA",
// //       created: "29 Sep 2023",
// //     },
// //     {
// //       id: 3,
// //       username: "mike_johnson",
// //       email: "mike.johnson@example.com",
// //       phonenumber: "+1 234 567 8903",
// //       location: "Chicago, USA",
// //       created: "05 Oct 2023",
// //     },
// //     {
// //       id: 4,
// //       username: "sarah_wilson",
// //       email: "sarah.wilson@example.com",
// //       phonenumber: "+1 234 567 8904",
// //       location: "Houston, USA",
// //       created: "14 Oct 2023",
// //     },
// //     {
// //       id: 5,
// //       username: "david_brown",
// //       email: "david.brown@example.com",
// //       phonenumber: "+1 234 567 8905",
// //       location: "Phoenix, USA",
// //       created: "15 Nov 2023",
// //     },
// //     {
// //       id: 6,
// //       username: "lisa_davis",
// //       email: "lisa.davis@example.com",
// //       phonenumber: "+1 234 567 8906",
// //       location: "Philadelphia, USA",
// //       created: "25 Nov 2023",
// //     },
// //     {
// //       id: 7,
// //       username: "robert_miller",
// //       email: "robert.miller@example.com",
// //       phonenumber: "+1 234 567 8907",
// //       location: "San Antonio, USA",
// //       created: "08 Dec 2023",
// //     },
// //     {
// //       id: 8,
// //       username: "amanda_garcia",
// //       email: "amanda.garcia@example.com",
// //       phonenumber: "+1 234 567 8908",
// //       location: "San Diego, USA",
// //       created: "21 Dec 2023",
// //     },
// //     {
// //       id: 9,
// //       username: "chris_martinez",
// //       email: "chris.martinez@example.com",
// //       phonenumber: "+1 234 567 8909",
// //       location: "Dallas, USA",
// //       created: "01 Jan 2024",
// //     },
// //     {
// //       id: 10,
// //       username: "jennifer_lopez",
// //       email: "jennifer.lopez@example.com",
// //       phonenumber: "+1 234 567 8910",
// //       location: "San Jose, USA",
// //       created: "12 Jan 2024",
// //     },
// //   ];

// //   const initialValues = {
// //     username: selectedUser?.username || "",
// //     email: selectedUser?.email || "",
// //     phonenumber: selectedUser?.phonenumber || "",
// //     location: selectedUser?.location || "",
// //   };

// //   const handleSubmit = (values, { setSubmitting, resetForm }) => {
// //     console.log("Form values:", values);
// //     if (editMode) {
// //       console.log("Updating user:", selectedUser.id, values);
// //       // Add your update logic here
// //     } else {
// //       console.log("Creating new user:", values);
// //       // Add your create logic here
// //     }
// //     setSubmitting(false);
// //     resetForm();
// //     filterCloseModal();
// //   };

// //   return (
// //     <div>
// //       <div className="flex justify-between px-3 pb-3.5 items-center">
// //         <p className="text-xl flex items-center gap-2 text-gray-700  font-semibold mb-3">
// //           Users
// //           <span className="bg-gray-300  text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
// //             {sampleData.length}
// //           </span>
// //         </p>

// //         <Button
// //           variant="contained"
// //           onClick={() => setFilterModal(true)}
// //           startIcon={<AddCircleOutlineIcon />}
// //         >
// //           Add User
// //         </Button>
// //       </div>
// //       <div className="flex justify-between bg-white  h-20 px-2.5 items-center">
// //         <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 bg-white w-64">
// //           <SearchIcon className="text-gray-400 mr-2" />
// //           <input
// //             type="text"
// //             placeholder="Search users..."
// //             className="outline-none w-full text-sm text-gray-700 bg-transparent"
// //           />
// //         </div>

// //         <Button
// //           variant="contained"
// //           // onClick={() => setFilterModal(true)}
// //         >
// //           Filter
// //         </Button>
// //       </div>
// //       <CommonTable
// //         data={sampleData}
// //         columns={columns}
// //         itemsPerPage={10}
// //         onEdit={handleEdit}
// //         onDelete={handleDelete}
// //       />
// //       <div className="relative">
// //         <CommonSideModel
// //           openDrawer={filterModal}
// //           handleFunction={filterOpenModal}
// //         >
// //           <div className="flex  justify-between gap-3 border-b border-gray-200  !ml-[1rem] px-1.5 !pb-[1rem]">
// //             <p className="text-[1rem] font-semibold">
// //               {editMode ? "Edit User" : "Add New User"}
// //             </p>
// //             <p className=" cursor-pointer" onClick={filterCloseModal}>
// //               <CloseIcon />
// //             </p>
// //           </div>
// //           <Formik
// //             initialValues={initialValues}
// //             validationSchema={validationSchema}
// //             onSubmit={handleSubmit}
// //             enableReinitialize={true}
// //             key={selectedUser?.id || "new"}
// //           >
// //             {({ values, errors, touched, setFieldValue, isSubmitting }) => (
// //               <Form>
// //                 <div className="px-6 pt-3 h-[84vh] overflow-auto">
// //                   <div className="space-y-6">
// //                     <div className="w-full">
// //                       <CommonTextField
// //                         label="Username"
// //                         value={values.username}
// //                         onChange={(e) =>
// //                           setFieldValue("username", e.target.value)
// //                         }
// //                         placeholder="Enter username"
// //                         required
// //                         error={touched.username && !!errors.username}
// //                         helperText={touched.username && errors.username}
// //                       />
// //                     </div>

// //                     <div className="w-full">
// //                       <CommonTextField
// //                         label="Email"
// //                         value={values.email}
// //                         onChange={(e) => setFieldValue("email", e.target.value)}
// //                         placeholder="Enter email address"
// //                         type="email"
// //                         required
// //                         error={touched.email && !!errors.email}
// //                         helperText={touched.email && errors.email}
// //                       />
// //                     </div>

// //                     <div className="w-full">
// //                       <CommonTextField
// //                         label="Phone Number"
// //                         value={values.phonenumber}
// //                         onChange={(e) =>
// //                           setFieldValue("phonenumber", e.target.value)
// //                         }
// //                         placeholder="Enter phone number"
// //                         required
// //                         error={touched.phonenumber && !!errors.phonenumber}
// //                         helperText={touched.phonenumber && errors.phonenumber}
// //                       />
// //                     </div>

// //                     <div className="w-full">
// //                       <CommonTextField
// //                         label="Location"
// //                         value={values.location}
// //                         onChange={(e) =>
// //                           setFieldValue("location", e.target.value)
// //                         }
// //                         placeholder="Enter location"
// //                         required
// //                         error={touched.location && !!errors.location}
// //                         helperText={touched.location && errors.location}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className=" px-6 mt-2.5  flex justify-end gap-4">
// //                   <Button
// //                     onClick={filterCloseModal}
// //                     variant="outlined"
// //                     sx={{
// //                       borderColor: "#ddd",
// //                       color: "#666",
// //                       "&:hover": {
// //                         borderColor: "#999",
// //                         backgroundColor: "rgba(0,0,0,0.04)",
// //                       },
// //                     }}
// //                   >
// //                     Cancel
// //                   </Button>
// //                   <Button
// //                     type="submit"
// //                     variant="contained"
// //                     disabled={isSubmitting}
// //                     sx={{
// //                       backgroundColor: "#f44336",
// //                       "&:hover": {
// //                         backgroundColor: "#d32f2f",
// //                       },
// //                     }}
// //                   >
// //                     {editMode ? "Update" : "Create"}
// //                   </Button>
// //                 </div>
// //               </Form>
// //             )}
// //           </Formik>
// //         </CommonSideModel>
// //       </div>
// //       {openConfirm && (
// //         <ConfirmationModal
// //           open={openConfirm}
// //           setOpen={setOpenConfirm}
// //           module="user"
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default UserManagement;

// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FilterListIcon from "@mui/icons-material/FilterList";

// import CloseIcon from "@mui/icons-material/Close";
// import { Button, Typography, Chip, Avatar, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
// import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
// import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
// import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";
// import { CommonDatePicker } from "../../components/reusablecomponents/CommonDatePicker";
// import EnhancedTable from "../../components/reusablecomponents/CommonTable";
// import ProjectTable from "../../components/reusablecomponents/CommonTable";
// import SearchIcon from "@mui/icons-material/Search";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import AddIcon from "@mui/icons-material/Add";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import CommonTable from "../../components/reusablecomponents/CommonTable";
// import CommonFilter from "../../components/reusablecomponents/CommonModel/CommonFilterModel";

// const UserManagement = () => {
//   const [filterModal, setFilterModal] = useState(false);
//   const [addEditModal, setAddEditModal] = useState(false);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [filtersData, setFiltersData] = useState({
//     username: "",
//     email: "",
//     location: "",
//     dateFrom: null,
//     dateTo: null,
//   });

//   const validationSchema = Yup.object({
//     username: Yup.string().required("Username is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phonenumber: Yup.string().required("Phone number is required"),
//     location: Yup.string().required("Location is required"),
//   });

//   const filterOpenModal = () => {
//     setFilterModal(true);
//   };

//   const filterCloseModal = () => {
//     setFilterModal(false);
//   };

//   const addEditOpenModal = () => {
//     setAddEditModal(true);
//   };

//   const addEditCloseModal = () => {
//     setAddEditModal(false);
//     setEditMode(false);
//     setSelectedUser(null);
//   };

//   const handleFilterChange = (field, value) => {
//     setFiltersData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const clearFilter = () => {
//     setFiltersData({
//       username: "",
//       email: "",
//       location: "",
//       dateFrom: null,
//       dateTo: null,
//     });
//     setFilterModal(false);
//   };

//   const handleFilterSubmit = () => {
//     console.log("Filter data:", filtersData);
//     // Add your filter logic here
//     setFilterModal(false);
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setEditMode(true);
//     setAddEditModal(true);
//   };

//   const handleDelete = (userId) => {
//     console.log("Delete user with ID:", userId);
//     setOpenConfirm(true);
//     // Add your delete logic here
//   };

//   const columns = [
//     { key: "username", label: "Username", sortable: true },
//     { key: "email", label: "Email", sortable: true },
//     { key: "phonenumber", label: "Phone Number", sortable: true },
//     { key: "created", label: "Created", sortable: true },
//     { key: "actions", label: "Actions", sortable: false },
//   ];

//   const sampleData = [
//     {
//       id: 1,
//       username: "john_doe",
//       email: "john.doe@example.com",
//       phonenumber: "+1 234 567 8901",
//       location: "New York, USA",
//       created: "25 Sep 2023",
//     },
//     {
//       id: 2,
//       username: "jane_smith",
//       email: "jane.smith@example.com",
//       phonenumber: "+1 234 567 8902",
//       location: "Los Angeles, USA",
//       created: "29 Sep 2023",
//     },
//     {
//       id: 3,
//       username: "mike_johnson",
//       email: "mike.johnson@example.com",
//       phonenumber: "+1 234 567 8903",
//       location: "Chicago, USA",
//       created: "05 Oct 2023",
//     },
//     {
//       id: 4,
//       username: "sarah_wilson",
//       email: "sarah.wilson@example.com",
//       phonenumber: "+1 234 567 8904",
//       location: "Houston, USA",
//       created: "14 Oct 2023",
//     },
//     {
//       id: 5,
//       username: "david_brown",
//       email: "david.brown@example.com",
//       phonenumber: "+1 234 567 8905",
//       location: "Phoenix, USA",
//       created: "15 Nov 2023",
//     },
//     {
//       id: 6,
//       username: "lisa_davis",
//       email: "lisa.davis@example.com",
//       phonenumber: "+1 234 567 8906",
//       location: "Philadelphia, USA",
//       created: "25 Nov 2023",
//     },
//     {
//       id: 7,
//       username: "robert_miller",
//       email: "robert.miller@example.com",
//       phonenumber: "+1 234 567 8907",
//       location: "San Antonio, USA",
//       created: "08 Dec 2023",
//     },
//     {
//       id: 8,
//       username: "amanda_garcia",
//       email: "amanda.garcia@example.com",
//       phonenumber: "+1 234 567 8908",

//       created: "21 Dec 2023",
//     },
//     {
//       id: 9,
//       username: "chris_martinez",
//       email: "chris.martinez@example.com",
//       phonenumber: "+1 234 567 8909",
//       location: "Dallas, USA",
//       created: "01 Jan 2024",
//     },
//     {
//       id: 10,
//       username: "jennifer_lopez",
//       email: "jennifer.lopez@example.com",
//       phonenumber: "+1 234 567 8910",
//       location: "San Jose, USA",
//       created: "12 Jan 2024",
//     },
//   ];

//   const initialValues = {
//     username: selectedUser?.username || "",
//     email: selectedUser?.email || "",
//     phonenumber: selectedUser?.phonenumber || "",
//     location: selectedUser?.location || "",
//   };

//   const handleSubmit = (values, { setSubmitting, resetForm }) => {
//     console.log("Form values:", values);
//     if (editMode) {
//       console.log("Updating user:", selectedUser.id, values);
//       // Add your update logic here
//     } else {
//       console.log("Creating new user:", values);
//       // Add your create logic here
//     }
//     setSubmitting(false);
//     resetForm();
//     addEditCloseModal();
//   };

//   return (
//     <div>
//       <div className="flex justify-between px-3 pb-3.5 items-center">
//         <p className="text-xl flex items-center gap-2  text-gray-700  font-semibold mb-3">
//           <p className="orange-underline">Users List</p>
//           <span className="bg-gray-300  text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
//             {sampleData.length}
//           </span>
//         </p>

//         <Button
//           variant="contained"
//           onClick={() => setAddEditModal(true)}
//           startIcon={<AddCircleOutlineIcon />}
//           sx={{
//             backgroundColor: "#ef4444",
//             "&:hover": {
//               backgroundColor: "#f74531",
//             },
//             "&:active": {
//               backgroundColor: "#e93e0d",
//             },
//             textTransform: "none",
//           }}
//         >
//           Add User
//         </Button>
//       </div>
//       <div className="flex justify-between bg-white  h-20 px-2.5 items-center">
//         <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 bg-white w-64">
//           <SearchIcon className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="outline-none w-full text-sm text-gray-700 bg-transparent"
//           />
//         </div>

//         <Button
//           variant="contained"
//           onClick={() => setFilterModal(true)}
//           startIcon={<FilterListIcon />}
//           sx={{
//             backgroundColor: "#ef4444",
//             "&:hover": {
//               backgroundColor: "#f74531",
//             },
//             "&:active": {
//               backgroundColor: "#e93e0d",
//             },
//             textTransform: "none",
//           }}
//         >
//           Filter
//         </Button>
//       </div>

//       {/* <----------------------Common Table-------------------> */}
//       <CommonTable
//         data={sampleData}
//         columns={columns}
//         itemsPerPage={10}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//       {/* <----------------------FilterModel-------------------> */}
//       <div className="relative">
//         <CommonFilter
//           openDrawer={filterModal}
//           handleFunction={filterOpenModal}
//           onClick={filterCloseModal}
//         >
//           <div className="flex flex-col w-[100%]  !mr-[1rem]">
//             <div className="flex justify-between gap-3  mb-2 !ml-[1rem] px-1.5 !py-[1rem]">
//               <p className="text-[1.2rem] orange-underline font-semibold">
//                 User Filter
//               </p>
//               <p
//                 className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
//                 onClick={() => setFilterModal(false)}
//               >
//                 <CloseIcon />
//               </p>
//             </div>
//             <div className="flex flex-col justify-between items-center w-[100%] !mr-[1rem]">
//               <div className="w-[90%] grid grid-col gap-4">
//                 <div>
//                   <CommonTextField
//                     label="User Name"
//                     value={filtersData.username}
//                     onChange={(e) =>
//                       handleFilterChange("username", e.target.value)
//                     }
//                     placeholder="Search by username"
//                     size="small"
//                   />
//                 </div>

//                 <div>
//                   <CommonTextField
//                     label="Email"
//                     value={filtersData.email}
//                     onChange={(e) =>
//                       handleFilterChange("email", e.target.value)
//                     }
//                     placeholder="Search by email"
//                     type="email"
//                     size="small"
//                   />
//                 </div>

//                 <div>
//                   <CommonTextField
//                     label="Location"
//                     value={filtersData.location}
//                     onChange={(e) =>
//                       handleFilterChange("location", e.target.value)
//                     }
//                     placeholder="Search by location"
//                     size="small"
//                   />
//                 </div>

//                 <div>
//                   <CommonDatePicker
//                     label=" Created Date From"
//                     value={filtersData.dateFrom}
//                     onChange={(newValue) =>
//                       handleFilterChange("dateFrom", newValue)
//                     }
//                     size="small"
//                   />
//                 </div>

//                 <div>
//                   <CommonDatePicker
//                     label="Created Date To"
//                     value={filtersData.dateTo}
//                     onChange={(newValue) =>
//                       handleFilterChange("dateTo", newValue)
//                     }
//                     size="small"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="absolute bottom-0 right-0 w-full px-2 pb-2 flex justify-end gap-2">
//             <Button
//               variant="outlined"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#f1753b",
//                 },
//               }}
//               className="!border !border-[#f44336] hover:!text-white !text-black"
//               onClick={clearFilter}
//             >
//               Clear
//             </Button>
//             <Button
//               variant="contained"

//               sx={{
//                 backgroundColor: "#f44336",
//               }}
//               className="!text-white"
//               onClick={handleFilterSubmit}
//             >
//               Submit
//             </Button>
//           </div>
//         </CommonFilter>
//       </div>
//       {/* <----------------------Create User Model-------------------> */}
//       <div className="relative">
//         <CommonSideModel
//           openDrawer={addEditModal}
//           handleFunction={addEditOpenModal}
//         >
//           <div className="flex justify-between gap-3  mb-2 !ml-[1rem] px-1.5 !py-[1rem]">
//             <p className="text-[1.2rem] orange-underline font-semibold">
//               {editMode ? "Edit User" : "Add New User"}
//             </p>
//             <p
//               className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
//               onClick={addEditCloseModal}
//             >
//               <CloseIcon />
//             </p>
//           </div>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize={true}
//             key={selectedUser?.id || "new"}
//           >
//             {({ values, errors, touched, setFieldValue, isSubmitting }) => (
//               <Form>
//                 <div className="px-6 pt-3 h-[84vh] overflow-auto">
//                   <div className="space-y-6">
//                     <div className="w-full">
//                       <CommonTextField
//                         label="Username"
//                         value={values.username}
//                         onChange={(e) =>
//                           setFieldValue("username", e.target.value)
//                         }
//                         placeholder="Enter username"
//                         required
//                         error={touched.username && !!errors.username}
//                         helperText={touched.username && errors.username}
//                       />
//                     </div>

//                     <div className="w-full">
//                       <CommonTextField
//                         label="Email"
//                         value={values.email}
//                         onChange={(e) => setFieldValue("email", e.target.value)}
//                         placeholder="Enter email address"
//                         type="email"
//                         required
//                         error={touched.email && !!errors.email}
//                         helperText={touched.email && errors.email}
//                       />
//                     </div>

//                     <div className="w-full">
//                       <CommonTextField
//                         label="Phone Number"
//                         value={values.phonenumber}
//                         onChange={(e) =>
//                           setFieldValue("phonenumber", e.target.value)
//                         }
//                         placeholder="Enter phone number"
//                         required
//                         error={touched.phonenumber && !!errors.phonenumber}
//                         helperText={touched.phonenumber && errors.phonenumber}
//                       />
//                     </div>

//                     <div className="w-full">
//                       <CommonTextField
//                         label="Location"
//                         value={values.location}
//                         onChange={(e) =>
//                           setFieldValue("location", e.target.value)
//                         }
//                         placeholder="Enter location"
//                         required
//                         error={touched.location && !!errors.location}
//                         helperText={touched.location && errors.location}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className=" px-6 mt-2.5  flex justify-end gap-4">
//                   <Button
//                     onClick={addEditCloseModal}
//                     variant="outlined"
//                     sx={{
//                       "&:hover": {
//                         backgroundColor: "#f1753b",
//                       },
//                     }}
//                     className="!border !border-[#f44336] hover:!text-white !text-black"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={isSubmitting}
//                     sx={{
//                       backgroundColor: "#f44336",
//                       "&:hover": {
//                         backgroundColor: "#d32f2f",
//                       },
//                     }}
//                   >
//                     {editMode ? "Update" : "Create"}
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </CommonSideModel>
//       </div>
//       {openConfirm && (
//         <ConfirmationModal
//           open={openConfirm}
//           setOpen={setOpenConfirm}
//           module="user"
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Box, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationModal from "../../components/reusablecomponents/CommonConformation";
import CommonSideModel from "../../components/reusablecomponents/CommonModel/CommonSideModel";
import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { getAllUser, DeleteUser } from "../../services/user/UserServices";
import { RegisterAPI } from "../../services/auth/authServices";
import { PhoneIcon } from "lucide-react";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [addModal, setAddModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Fetch users with search and pagination
  const fetchUsers = async (search = "", page = 1) => {
    try {
      setLoading(true);
      const response = await getAllUser(search, page, usersPerPage);
      if (response && response.data) {
        if (response.pagination) {
          // If backend returns pagination info
          setUsers(response.data);
          setFilteredUsers(response.data);
        } else {
          // If backend returns all data
          setUsers(response.data);
          setFilteredUsers(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search functionality with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchUsers(searchTerm, 1);
    }, 500); // 500ms delay for debouncing

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const addOpenModal = () => {
    setAddModal(true);
  };

  const addCloseModal = () => {
    setAddModal(false);
  };

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await DeleteUser(selectedUserId);
      await fetchUsers(searchTerm, currentPage);
      toast.success("User deleted successfully!"); // Refresh with current search and page
      setOpenConfirm(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        userName: values.userName,
        email: values.email,
        password: values.password,
      };

      await RegisterAPI(payload);
      await fetchUsers(searchTerm, 1);
      toast.success("User created successfully!");
      resetForm();
      addCloseModal();
    } catch (error) {
      toast.error("Failed to create user.");
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Pagination - now we don't slice since backend handles pagination
  const currentUsers = filteredUsers;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchUsers(searchTerm, value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (userName) => {
    return userName
      ? userName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";
  };

  const InfoItem = ({ icon, label, value, bgColor, containerColor }) => (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl hover:translate-x-1 transition ${containerColor}`}
    >
      <div
        className={`w-8 h-8 ${bgColor} text-white rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-800 break-words line-clamp-2 leading-tight">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between px-3 pb-3.5 items-center">
        <p className="text-xl flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <p className="orange-underline">Users List</p>
          <span className="bg-gray-300 text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
            {filteredUsers.length}
          </span>
        </p>

        <Button
          variant="contained"
          onClick={addOpenModal}
          startIcon={<AddCircleOutlineIcon />}
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
          Add User
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-start bg-white h-20 px-2.5 items-center mb-4">
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 bg-white w-64">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-sm text-gray-700 bg-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="w-full h-[85vh] flex justify-center items-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="loader "></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {currentUsers.map((user) => (
              <div key={user._id} className="flex justify-center">
                <div className="relative w-full  bg-white rounded-2xl shadow-md border border-slate-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm text-red-500 border border-red-200 rounded-full hover:bg-red-400 hover:text-white hover:scale-110 transition duration-300 shadow-sm"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>

                  <div className="p-5 pt-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-t-2xl flex flex-col items-center">
                    <div className="relative w-14 h-14 flex rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {user.profileFileName ? (
                        <>
                          <img
                            src={`${import.meta.env.VITE_API_URL}/upload/${
                              user.profileFileName
                            }`}
                            alt={user.userName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-red-300 to-red-400 text-white font-bold text-xl flex items-center justify-center">
                            {getInitials(user.userName)}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-500 text-white font-bold text-xl flex items-center justify-center">
                          {getInitials(user.userName)}
                        </div>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-slate-800 text-center truncate w-full">
                      {user.userName || "N/A"}
                    </h3>
                  </div>

                  {/* User Info */}
                  <div className="px-5 pt-2 pb-5 space-y-3">
                    {/* Email */}
                    <InfoItem
                      icon={
                        <EmailIcon fontSize="small" className="text-white" />
                      }
                      label="Email"
                      value={user.email}
                      bgColor="bg-red-500"
                      containerColor="bg-red-50/50 border border-red-100"
                    />

                    {/* Phone */}
                    {user.phoneNumber && (
                      <InfoItem
                        icon={
                          <PhoneIcon fontSize="small" className="text-white" />
                        }
                        label="Phone"
                        value={user.phoneNumber}
                        bgColor="bg-green-500"
                        containerColor="bg-green-50/50 border border-green-100"
                      />
                    )}

                    {user.address && (
                      <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl hover:bg-blue-50 transition">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center mt-0.5">
                          <LocationOnIcon fontSize="small" />
                        </div>
                        <div className="flex-1 text-sm text-slate-800">
                          <p className="text-xs font-medium text-slate-500 uppercase mb-1">
                            Address
                          </p>
                          <p>{user.address}</p>
                          <div className="text-xs text-slate-600 mt-1">
                            {user.city}
                            {user.city && user.postalCode && ", "}
                            {user.postalCode}
                          </div>
                          {user.country && (
                            <div className="mt-1 inline-block px-2 py-1 bg-slate-100 text-xs rounded-md font-medium text-slate-700">
                              {user.country}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Join Date */}
                    <InfoItem
                      icon={
                        <CalendarTodayIcon
                          fontSize="small"
                          className="text-white"
                        />
                      }
                      label="Joined"
                      value={formatDate(user.createdAt)}
                      bgColor="bg-indigo-500"
                      containerColor="bg-indigo-50/50 border border-indigo-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    "&.Mui-selected": {
                      backgroundColor: "#ef4444",
                      "&:hover": {
                        backgroundColor: "#dc2626",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      <div className="relative">
        <CommonSideModel openDrawer={addModal} handleFunction={addOpenModal}>
          <div className="flex justify-between gap-3 mb-2 !ml-[1rem] px-1.5 !py-[1rem]">
            <p className="text-[1.2rem] orange-underline font-semibold">
              Add New User
            </p>
            <p
              className="cursor-pointer rounded-full bg-[#f4f4f7] p-1 transition-all duration-300 hover:rotate-720 hover:bg-[#f1753b] hover:text-white"
              onClick={addCloseModal}
            >
              <CloseIcon />
            </p>
          </div>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="px-6 pt-3 h-[84vh] overflow-auto">
                  <div className="space-y-6">
                    <div className="w-full">
                      <CommonTextField
                        label="Username"
                        value={values.userName}
                        onChange={(e) =>
                          setFieldValue("userName", e.target.value)
                        }
                        placeholder="Enter username"
                        required
                        error={touched.userName && !!errors.userName}
                        helperText={touched.userName && errors.userName}
                      />
                    </div>

                    <div className="w-full">
                      <CommonTextField
                        label="Email"
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        placeholder="Enter email address"
                        type="email"
                        required
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </div>

                    <div className="w-full">
                      <CommonTextField
                        label="Password"
                        value={values.password}
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        placeholder="Enter password"
                        type="password"
                        required
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </div>

                    <div className="w-full">
                      <CommonTextField
                        label="Confirm Password"
                        value={values.confirmPassword}
                        onChange={(e) =>
                          setFieldValue("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm password"
                        type="password"
                        required
                        error={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 mt-2.5 flex justify-end gap-4">
                  <Button
                    onClick={addCloseModal}
                    variant="outlined"
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
                    Create User
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CommonSideModel>
      </div>

      {/* Confirmation Modal */}
      {openConfirm && (
        <ConfirmationModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          module="user"
          onConfirm={confirmDelete}
          onCancel={() => {
            setOpenConfirm(false);
            setSelectedUserId(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
