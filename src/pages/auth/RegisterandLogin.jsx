// import React, { useState } from "react";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   Sparkles,
//   Heart,
//   Rocket,
//   Shield,
// } from "lucide-react";
// import { loginAPI, RegisterAPI } from "../../services/auth/authServices";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function SplitScreenAuthUI() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [imageTransition, setImageTransition] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     const { userName, email, password, confirmPassword } = formData;

//     // Validation
//     if (!email || !password || (!isLogin && (!userName || !confirmPassword))) {
//       toast.error("Please fill in all required fields.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       toast.error("Passwords do not match.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = isLogin
//         ? await loginAPI({ email, password })
//         : await RegisterAPI({ userName, email, password });

//       if (response.status === 500) {
//         toast.error(response.message || "Something went wrong.", {
//           position: "top-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         return;
//       }

//       if (isLogin) {
//         localStorage.setItem("token", response.token);
//         localStorage.setItem("userName", response.findEmail.userName);
//         localStorage.setItem("role", response.findEmail.role);
//         localStorage.setItem("userId", response.findEmail._id);
//         localStorage.setItem("avatar", response.findEmail?.profileFileName);

//         toast.success("Login successful! Welcome back!", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });

//         setTimeout(() => {
//           navigate("/smart-HR/dashboard");
//         }, 1000);
//       } else {
//         toast.success("Account created successfully! You can now log in.", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         switchMode();
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("An unexpected error occurred. Please try again.", {
//         position: "top-right",
//         autoClose: 4000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const switchMode = () => {
//     setImageTransition(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       // Clear form data when switching modes
//       setFormData({
//         userName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//       setTimeout(() => setImageTransition(false), 50);
//     }, 300);
//   };

//   const loginImage = {
//     gradient: "from-blue-600 via-purple-600 to-indigo-800",
//     icon: Rocket,
//     title: "Welcome Back!",
//     subtitle: "Continue your amazing journey with us",
//     features: ["Secure Login", "Fast Access", "Your Dashboard Awaits"],
//   };

//   const signupImage = {
//     gradient: "from-pink-500 via-purple-500 to-indigo-600",
//     icon: Heart,
//     title: "Join Our Community!",
//     subtitle: "Start your incredible journey today",
//     features: ["Create Account", "Join Thousands", "Unlock Features"],
//   };

//   const currentImage = isLogin ? loginImage : signupImage;

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Left Side - Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-white relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full opacity-5">
//           <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full animate-pulse delay-300"></div>
//           <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-500 rounded-full animate-pulse delay-700"></div>
//         </div>

//         <div className="relative z-10 w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
//               <Sparkles className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin
//                 ? "Sign in to continue your journey"
//                 : "Join thousands of happy users"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             {/* Name Field */}
//             <div
//               className={`transform transition-all duration-500 ${
//                 !isLogin
//                   ? "translate-y-0 opacity-100 max-h-20"
//                   : "-translate-y-4 opacity-0 max-h-0 overflow-hidden"
//               }`}
//             >
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative group">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
//                 <input
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
//                   placeholder="Enter your full userName"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
//                   placeholder="Enter your password"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div
//               className={`transform transition-all duration-500 ${
//                 !isLogin
//                   ? "translate-y-0 opacity-100 max-h-20"
//                   : "-translate-y-4 opacity-0 max-h-0 overflow-hidden"
//               }`}
//             >
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative group">
//                 <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
//                   placeholder="Confirm your password"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             {isLogin && (
//               <div className="text-right">
//                 <button
//                   className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
//                   disabled={isLoading}
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   {isLogin ? "Signing In..." : "Creating Account..."}
//                 </div>
//               ) : (
//                 <>
//                   {isLogin ? "Sign In" : "Create Account"}
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>

//             {/* Switch Mode */}
//             <div className="text-center pt-4">
//               <p className="text-gray-600">
//                 {isLogin
//                   ? "Don't have an account? "
//                   : "Already have an account? "}
//                 <button
//                   onClick={switchMode}
//                   disabled={isLoading}
//                   className="text-purple-600 hover:text-purple-800 font-semibold transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLogin ? "Sign up" : "Sign in"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Visual Content */}
//       <div className="flex-1 relative overflow-hidden">
//         {/* Background with smooth transition */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br ${
//             currentImage.gradient
//           } transition-all duration-700 ease-in-out transform ${
//             imageTransition ? "scale-110 opacity-50" : "scale-100 opacity-100"
//           }`}
//         />

//         {/* Animated background elements */}
//         <div className="absolute inset-0">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse transition-all duration-700 ${
//                 imageTransition ? "scale-0" : "scale-100"
//               }`}
//               style={{
//                 left: `${20 + i * 15}%`,
//                 top: `${20 + i * 10}%`,
//                 animationDelay: `${i * 0.5}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Content */}
//         <div
//           className={`relative z-10 h-full flex flex-col items-center justify-center p-12 text-white transition-all duration-700 transform ${
//             imageTransition
//               ? "translate-y-8 opacity-0"
//               : "translate-y-0 opacity-100"
//           }`}
//         >
//           {/* Main Icon */}
//           <div className="mb-8">
//             <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 hover:scale-110 transition-transform duration-500">
//               <currentImage.icon className="w-16 h-16 text-white" />
//             </div>
//           </div>

//           {/* Title and Subtitle */}
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4 leading-tight">
//               {currentImage.title}
//             </h2>
//             <p className="text-xl text-white/80 max-w-md">
//               {currentImage.subtitle}
//             </p>
//           </div>

//           {/* Features List */}
//           <div className="space-y-4">
//             {currentImage.features.map((feature, index) => (
//               <div
//                 key={feature}
//                 className={`flex items-center space-x-3 transition-all duration-500 delay-${
//                   index * 100
//                 }`}
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//                 <span className="text-lg text-white/90">{feature}</span>
//               </div>
//             ))}
//           </div>

//           {/* Decorative elements */}
//           <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
//           <div className="absolute top-10 right-10 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-300" />
//           <div className="absolute top-1/3 left-8 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-700" />
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className={`absolute w-1 h-1 bg-white/30 rounded-full transition-all duration-1000 ${
//                 imageTransition ? "scale-0 rotate-180" : "scale-100 rotate-0"
//               }`}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animation: `float ${
//                   3 + Math.random() * 2
//                 }s ease-in-out infinite ${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//             opacity: 0.8;
//           }
//         }
//         .delay-100 {
//           transition-delay: 100ms;
//         }
//         .delay-200 {
//           transition-delay: 200ms;
//         }
//         .delay-300 {
//           transition-delay: 300ms;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Heart,
  Rocket,
  Shield,
} from "lucide-react";
import logo from "../../assets/logo.svg";
import { loginAPI, RegisterAPI } from "../../services/auth/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SplitScreenAuthUI() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { userName, email, password, confirmPassword } = formData;

    // Validation
    if (!email || !password || (!isLogin && (!userName || !confirmPassword))) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = isLogin
        ? await loginAPI({ email, password })
        : await RegisterAPI({ userName, email, password });

      if (response.status === 500) {
        toast.error(response.message || "Something went wrong.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      console.log(response, "response");
      if (response?.token) {
        navigate("/smart-HR/dashboard");
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.findEmail.userName);
        localStorage.setItem("role", response.findEmail.role);
        localStorage.setItem("userId", response.findEmail._id);
        localStorage.setItem("avatar", response.findEmail?.profileFileName);

        toast.success("Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate("/smart-HR/dashboard");
        }, 1000);
      } else {
        toast.success("Account created successfully! You can now log in.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        switchMode();
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setImageTransition(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Clear form data when switching modes
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => setImageTransition(false), 50);
    }, 300);
  };

  const loginImage = {
    gradient: "from-red-600 via-rose-600 to-pink-800",
    icon: Rocket,
    title: "Welcome Back!",
    subtitle: "Continue your amazing journey with us",
    features: ["Secure Login", "Fast Access", "Your Dashboard Awaits"],
  };

  const signupImage = {
    gradient: "from-red-500 via-rose-500 to-red-700",
    icon: Heart,
    title: "Join Our Community!",
    subtitle: "Start your incredible journey today",
    features: ["Create Account", "Join Thousands", "Unlock Features"],
  };

  const currentImage = isLogin ? loginImage : signupImage;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-rose-500 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-red-600 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-80  rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
              <img src={logo} alt="" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to continue your journey"
                : "Join thousands of happy users"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div
              className={`transform transition-all duration-500 ${
                !isLogin
                  ? "translate-y-0 opacity-100 max-h-20"
                  : "-translate-y-4 opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div
              className={`transform transition-all duration-500 ${
                !isLogin
                  ? "translate-y-0 opacity-100 max-h-20"
                  : "-translate-y-4 opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-right">
                <button
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </div>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={switchMode}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-800 font-semibold transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/7550886/pexels-photo-7550886.jpeg?_gl=1*soud04*_ga*ODUyNTk0NDc2LjE3NTEyNjg1NDI.*_ga_8JE65Q40S6*czE3NTEyNjg1NDEkbzEkZzEkdDE3NTEyNjg2MzIkajU5JGwwJGgw")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div />

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse transition-all duration-700 ${
                imageTransition ? "scale-0" : "scale-100"
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* <div
          className={`relative z-10 h-full flex flex-col items-center justify-center p-12 text-black transition-all duration-700 transform ${
            imageTransition
              ? "translate-y-8 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
      
          <div className="mb-8">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 hover:scale-110 transition-transform duration-500">
              <currentImage.icon className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              {currentImage.title}
            </h2>
            <p className="text-xl text-white/80 max-w-md">
              {currentImage.subtitle}
            </p>
          </div>

       
          <div className="space-y-4">
            {currentImage.features.map((feature, index) => (
              <div
                key={feature}
                className={`flex items-center space-x-3 transition-all duration-500`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-lg text-white/90">{feature}</span>
              </div>
            ))}
          </div>

    
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute top-10 right-10 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-300" />
          <div className="absolute top-1/3 left-8 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-700" />
        </div> */}

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white/30 rounded-full transition-all duration-1000 ${
                imageTransition ? "scale-0 rotate-180" : "scale-100 rotate-0"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 2
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .delay-100 {
          transition-delay: 100ms;
        }
        .delay-200 {
          transition-delay: 200ms;
        }
        .delay-300 {
          transition-delay: 300ms;
        }
      `}</style>
    </div>
  );
}
