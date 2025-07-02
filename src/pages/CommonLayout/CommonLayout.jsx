import React, { useState, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../assets/logo.svg";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const CommonLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentPath = location.pathname;

  const storedName = localStorage.getItem("userName") || "User";
  const storedAvatar = localStorage.getItem("avatar") || "";
  const role = localStorage.getItem("role") || "Admin";

  const formattedName = storedName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopCollapsed(!desktopCollapsed);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    setLogoutDialogOpen(true);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");

    setLogoutDialogOpen(false);
    navigate("/", { replace: true });
  };

  const allMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardOutlinedIcon />,
      path: "/smart-HR/dashboard",
      allowedRoles: ["Admin", "Member"],
      label: "dashboard",
    },
    {
      text: "ToDo",
      icon: <ChecklistOutlinedIcon />,
      path: "/smart-HR/todo",
      allowedRoles: ["Member"],
      label: "todo",
    },
    {
      text: "Projects",
      icon: <FolderOpenOutlinedIcon />,
      path: "/smart-HR/project",
      allowedRoles: ["Admin", "Member"],
      label: "project",
    },
    {
      text: "Tasks",
      icon: <ChecklistIcon />,
      path: "/smart-HR/tasks",
      allowedRoles: ["Admin"],
      label: "tasks",
    },
    {
      text: "Users Management",
      icon: <GroupOutlinedIcon />,
      path: "/smart-HR/users",
      allowedRoles: ["Admin"],
      label: "users",
    },
    {
      text: "Profile",
      icon: <AccountCircleOutlinedIcon />,
      path: "/smart-HR/profile",
      allowedRoles: ["Admin", "Member"],
      label: "profile",
    },
  ];

  const menuItems = useMemo(() => {
    return allMenuItems.filter((item) => item.allowedRoles.includes(role));
  }, [role]);

  const currentDrawerWidth = isMobile
    ? drawerWidth
    : desktopCollapsed
    ? collapsedDrawerWidth
    : drawerWidth;

  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const isActive = currentPath.includes(item.label);
          const isCollapsed = !isMobile && desktopCollapsed;

          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                cursor: "pointer",
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: isActive ? "#fce9e6" : "transparent",
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: isCollapsed ? 1 : 2,
                "&:hover": {
                  backgroundColor: isActive ? "#fee2e2" : "rgba(0, 0, 0, 0.04)",
                  color: isActive ? "#fee2e2" : "#ed2812",
                },
              }}
              title={isCollapsed ? item.text : ""}
            >
              <ListItemIcon
                sx={{
                  backgroundColor: isActive ? "#ef4444" : "rgba(0, 0, 0, 0.04)",
                  color: isActive ? "#fff" : "inherit",
                  borderRadius: "15%",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                  marginRight: isCollapsed ? 0 : 1,
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!isCollapsed && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: isActive ? "#ef4444" : "inherit",
                      fontWeight: isActive ? 400 : 400,
                    },
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{ color: "#000", fontWeight: 600 }}
          >
            <img src={logo} alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                role === "Admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {role}
            </span>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={handleProfileMenuOpen}
            >
              <Typography variant="body2" sx={{ mr: 1, color: "#000" }}>
                {formattedName}
              </Typography>
              <Avatar
                alt={formattedName}
                src={`${import.meta.env.VITE_API_URL}/upload/${storedAvatar}`}
                sx={{
                  width: 32,
                  height: 32,
                  mr: 0.5,
                }}
              >
                {formattedName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <ExpandMoreIcon sx={{ color: "#666", fontSize: 20 }} />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <MenuItem
                onClick={handleLogoutClick}
                sx={{
                  py: 1.5,
                  color: "#ef4444",
                  "&:hover": {
                    backgroundColor: "#fee2e2",
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: currentDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.3s ease-in-out",
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              color: "#000",
              borderRight: "1px solid #e5e7eb",
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: currentDrawerWidth,
              color: "#000",
              borderRight: "1px solid #e5e7eb",
              transition: "width 0.3s ease-in-out",
              overflowX: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f6f6f9",
          p: 3,
          // width: {
          //   md: `calc(100% - ${currentDrawerWidth}px)`,
          // },
          paddingLeft: {
            md: `${currentDrawerWidth + 20}px`,
          },
          minHeight: "100vh",
          transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: { xs: 320, sm: 450 },
            maxWidth: 500,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            overflow: "visible",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            pt: 4,
            pb: 2,
            px: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              border: "3px solid #fecaca",
            }}
          >
            <LogoutIcon
              sx={{
                color: "#ef4444",
                fontSize: 28,
              }}
            />
          </Box>

          <DialogTitle
            sx={{
              p: 0,
              mb: 1,
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1f2937",
            }}
          >
            Confirm Logout
          </DialogTitle>
        </Box>

        <DialogContent
          sx={{
            textAlign: "center",
            pb: 1,
            px: 3,
          }}
        >
          <DialogContentText
            sx={{
              color: "#6b7280",
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Are you sure you want to log out of your account?
          </DialogContentText>
          <DialogContentText
            sx={{
              color: "#9ca3af",
              fontSize: "0.875rem",
              fontStyle: "italic",
            }}
          >
            You will need to sign in again to access your Site.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 2,
            gap: 2,
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={handleLogoutCancel}
            variant="outlined"
            size="large"
            sx={{
              minWidth: { xs: "100%", sm: 120 },
              height: 48,
              borderColor: "#d1d5db",
              color: "#374151",
              fontWeight: 500,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            size="large"
            sx={{
              minWidth: { xs: "100%", sm: 120 },
              height: 48,
              backgroundColor: "#ef4444",
              fontWeight: 500,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
              "&:hover": {
                backgroundColor: "#dc2626",
                boxShadow: "0 6px 8px -1px rgba(239, 68, 68, 0.3)",
              },
            }}
            autoFocus
          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommonLayout;
