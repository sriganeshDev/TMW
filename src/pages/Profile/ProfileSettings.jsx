import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Upload,
  User,
  Edit,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  X,
  Loader,
} from "lucide-react";
import { CommonTextField } from "../../components/reusablecomponents/CommonInputFields";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileWithImage,
} from "../../services/user/UserServices";

// Validation Schema
const validationSchema = Yup.object({
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[+]?[\d\s\-\(\)]+$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),
  country: Yup.string()
    .min(2, "Country must be at least 2 characters")
    .required("Country is required"),
  postalCode: Yup.string().matches(
    /^[A-Za-z0-9\s\-]+$/,
    "Invalid postal code format"
  ),
  address: Yup.string().max(200, "Address must be less than 200 characters"),
});

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  const role = localStorage.getItem("role");
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Initial form values
  const getInitialValues = () => ({
    userName: initialData?.userName || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    country: initialData?.country || "",
    postalCode: initialData?.postalCode || "",
    address: initialData?.address || "",
  });

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getUserProfile();
      if (res?.status === "200") {
        setInitialData(res.Data);

        if (res.Data?.profileFileName) {
          const imageUrl = `${API_BASE_URL}/upload/${res.Data.profileFileName}`;
          setProfileImage(imageUrl);
        }
      } else {
        console.error("Failed to fetch profile:", res?.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setNewImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    if (!initialData?._id) return;

    try {
      setStatus(null);
      let response;

      if (newImageFile) {
        // If there's a new image, send as FormData
        const uploadData = new FormData();
        uploadData.append("image", newImageFile);

        // Add all form fields
        Object.keys(values).forEach((key) => {
          if (
            values[key] !== null &&
            values[key] !== undefined &&
            values[key] !== ""
          ) {
            uploadData.append(key, values[key]);
          }
        });

        response = await updateUserProfileWithImage(
          initialData._id,
          uploadData
        );
      } else {
        // No new image, send regular JSON
        response = await updateUserProfile(initialData._id, values);
      }

      if (response?.status === "200") {
        setStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
        setIsEditing(false);
        setNewImageFile(null);
        setImagePreview("");
        setInitialData(response.Data);

        // Update profile image if new one was uploaded
        if (response.Data?.profileFileName) {
          const imageUrl = `${API_BASE_URL}/upload/${response.Data.profileFileName}`;
          setProfileImage(imageUrl);
        }

        // Show success message
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus({
          type: "error",
          message: response?.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setStatus({
        type: "error",
        message: "An error occurred while updating profile",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel editing
  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setNewImageFile(null);
    setImagePreview("");
  }, []);

  // Remove image
  const handleRemoveImage = useCallback(() => {
    setNewImageFile(null);
    setImagePreview("");
  }, []);

  // Utility function for displaying values
  const displayValue = useCallback((value) => value?.trim() || "-", []);

  // Get current image source
  const getCurrentImageSrc = () => {
    if (imagePreview) return imagePreview;
    if (profileImage) return profileImage;
    return null;
  };

  // Loading statev
  if (isLoading) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader "></div>
        </div>
      </div>
    );
  }
  // Error state
  if (!initialData) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load profile data</p>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Custom FormikField component for better integration with original UI
  const FormikField = ({
    name,
    label,
    type = "text",
    placeholder,
    variant,
    rows,
    required = false,
  }) => (
    <Field name={name}>
      {({ field, meta }) => (
        <CommonTextField
          label={label}
          name={name}
          type={type}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          variant={variant}
          required={required}
          placeholder={placeholder}
          rows={rows}
          error={meta.touched && meta.error ? meta.error : ""}
        />
      )}
    </Field>
  );

  // Profile View Component - Using Original UI Design
  const ProfileView = () => (
    <div className="w-full h-[85vh] bg-gray-50">
      <div className="bg-white h-full">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl orange-underline mb-5 font-semibold text-gray-800">
              Profile Settings
            </h1>
            <p className="text-gray-600 text-sm">
              View your profile information
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-5 py-2 text-sm bg-[#ef4444] text-white rounded-md hover:bg-[#f74531]"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="p-4 space-y-8">
          <div className="flex flex-col md:flex-row bg-gray-100 p-6 md:p-10 items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
              {getCurrentImageSrc() ? (
                <img
                  src={getCurrentImageSrc()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full text-gray-400" />
              )}
            </div>
            <div className="text-center md:text-left space-y-2">
              <p className="text-lg md:text-2xl text-gray-500 font-semibold">
                {displayValue(initialData?.userName)}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  role === "Admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {role || "User"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Address Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <label className="text-gray-500">Email</label>
                <p className="flex items-center text-gray-600 text-sm">
                  <Mail className="w-4 h-4 mr-2" />{" "}
                  {displayValue(initialData?.email)}
                </p>
              </div>
              <div>
                <label className="text-gray-500">Phone Number</label>
                <p className="flex items-center text-gray-600 text-sm">
                  <Phone className="w-4 h-4 mr-2" />{" "}
                  {displayValue(initialData?.phoneNumber)}
                </p>
              </div>
              <div>
                <label className="text-gray-500">Address</label>
                <p className="text-gray-900 whitespace-pre-line mt-2 text-sm">
                  {displayValue(initialData?.address)}
                </p>
              </div>
              <div>
                <label className="text-gray-500">City</label>
                <p className="text-gray-900 font-medium">
                  {displayValue(initialData?.city)}
                </p>
              </div>
              <div>
                <label className="text-gray-500">Postal Code</label>
                <p className="text-gray-900 font-medium">
                  {displayValue(initialData?.postalCode)}
                </p>
              </div>
              <div>
                <label className="text-gray-500">Country</label>
                <p className="text-gray-900 font-medium flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {initialData?.country === "US"
                    ? "United States"
                    : displayValue(initialData?.country)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Profile Component - Using Original UI Design
  const EditProfile = () => (
    <div className="w-full h-[85vh] bg-gray-50">
      <div className="w-full h-full bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 orange-underline">
          Edit Profile
        </h1>

        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, status, isValid, dirty }) => (
            <Form>
              {/* Status Messages */}
              {status && (
                <div
                  className={`p-4 rounded-md mb-6 ${
                    status.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden bg-gray-100">
                    {getCurrentImageSrc() ? (
                      <img
                        src={getCurrentImageSrc()}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full text-gray-400" />
                    )}
                  </div>
                  <label className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#f74531] bg-white text-[#f74531] text-sm font-medium shadow-sm hover:bg-[#fee2e2] hover:border-[#ef4444] transition-all cursor-pointer">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#fee2e2] text-[#ef4444] rounded-full group-hover:bg-[#ef4444] group-hover:text-white transition">
                      <Upload className="w-4 h-4" />
                    </div>
                    <span className="whitespace-nowrap">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {newImageFile && (
                    <div className="text-center space-y-2">
                      <p className="text-xs text-green-600">
                        Selected: {newImageFile.name}
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-xs text-red-600 hover:text-red-800 underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormikField
                    name="userName"
                    label="Username"
                    placeholder="Enter username"
                    required
                  />
                  <FormikField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                  <FormikField
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    required
                  />
                  <FormikField
                    name="city"
                    label="City"
                    placeholder="Enter city"
                    required
                  />
                  <FormikField
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                  />
                  <FormikField
                    name="country"
                    label="Country"
                    placeholder="Enter country"
                    required
                  />
                  <div className="md:col-span-2">
                    <FormikField
                      name="address"
                      label="Address"
                      variant="textarea"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm border border-[#ef4444] text-gray-700 rounded-md hover:text-[#fff] hover:bg-[#f74531]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || !isValid || (!dirty && !newImageFile)
                  }
                  className="px-5 py-2 text-sm bg-[#f74531] text-white rounded-md hover:bg-[#ef4444] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  return isEditing ? <EditProfile /> : <ProfileView />;
};

export default ProfileSettings;
