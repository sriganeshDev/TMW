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
      <div className="flex justify-end bg-white h-20 px-2.5 items-center mb-4">
        <div className="flex items-center justify-end border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50 w-80 focus-within:border-blue-400 transition-colors">
          <SearchIcon className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full text-sm text-gray-700 bg-transparent placeholder-gray-500"
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
                <div className="relative w-full bg-white rounded-2xl shadow-md border border-slate-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm text-red-500 border border-red-200 rounded-full hover:bg-red-400 hover:text-white hover:scale-110 transition duration-300 shadow-sm"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                  <div className="p-5 pt-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-t-2xl flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                      {user.profileFileName ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/upload/${
                            user.profileFileName
                          }`}
                          alt={user.userName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = document.getElementById(
                              `fallback-${user._id}`
                            );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}

                      <div
                        id={`fallback-${user._id}`}
                        className={`w-full h-full bg-gradient-to-br from-red-400 to-red-500 text-white font-bold text-xl flex items-center justify-center ${
                          user.profileFileName ? "hidden" : ""
                        }`}
                      >
                        {getInitials(user.userName)}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 truncate">
                      {user.userName || "N/A"}
                    </h3>
                  </div>

                  {/* User Info - All headings always show */}
                  <div className="px-5 pt-2 pb-5 space-y-3">
                    {/* Email - Always show */}
                    <InfoItem
                      icon={
                        <EmailIcon fontSize="small" className="text-white" />
                      }
                      label="Email"
                      value={user.email || "-"}
                      bgColor="bg-red-500"
                      containerColor="bg-red-50/50 border border-red-100"
                    />

                    {/* Phone - Always show */}
                    <InfoItem
                      icon={
                        <PhoneIcon fontSize="small" className="text-white" />
                      }
                      label="Phone"
                      value={user.phoneNumber || "-"}
                      bgColor="bg-green-500"
                      containerColor="bg-green-50/50 border border-green-100"
                    />

                    {/* Address - Always show with custom layout */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl hover:bg-blue-50 transition">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center mt-0.5">
                        <LocationOnIcon fontSize="small" />
                      </div>
                      <div className="flex-1 text-sm text-slate-800">
                        <p className="text-xs font-medium text-slate-500 uppercase mb-1">
                          Address
                        </p>
                        {user.address ? (
                          <>
                            <p>{user.address}</p>
                            {(user.city || user.postalCode) && (
                              <div className="text-xs text-slate-600 mt-1">
                                {user.city || ""}
                                {user.city && user.postalCode && ", "}
                                {user.postalCode || ""}
                              </div>
                            )}
                            {user.country && (
                              <div className="mt-1 inline-block px-2 py-1 bg-slate-100 text-xs rounded-md font-medium text-slate-700">
                                {user.country}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-sm font-medium text-slate-800">
                            -
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Join Date - Always show */}
                    <InfoItem
                      icon={
                        <CalendarTodayIcon
                          fontSize="small"
                          className="text-white"
                        />
                      }
                      label="Joined"
                      value={user.createdAt ? formatDate(user.createdAt) : "-"}
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
