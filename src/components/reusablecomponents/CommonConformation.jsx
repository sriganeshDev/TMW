import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmationModal = ({
  open,
  setOpen,
  module = "item",
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "delete", // delete, warning, info
  icon, // NEW: Custom icon prop
}) => {
  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  const getTitle = () => {
    if (title) return title;
    return `Delete ${module.charAt(0).toUpperCase() + module.slice(1)}`;
  };

  const getMessage = () => {
    if (message) return message;
    return `Are you sure you want to delete this ${module}? This action cannot be undone.`;
  };

  const getIconAndColors = () => {
    switch (type) {
      case "delete":
        return {
          icon: icon || <DeleteIcon sx={{ fontSize: 28 }} />, // Use custom icon if provided
          iconBg: "#fee2e2",
          iconColor: "#dc2626",
          confirmBg: "#dc2626",
          confirmHover: "#b91c1c",
        };
      case "warning":
        return {
          icon: icon || <WarningAmberIcon sx={{ fontSize: 28 }} />, // Use custom icon if provided
          iconBg: "#fef3c7",
          iconColor: "#d97706",
          confirmBg: "#d97706",
          confirmHover: "#b45309",
        };
      case "pipeline":
        return {
          icon: icon || <WarningAmberIcon sx={{ fontSize: 28 }} />, // Use custom icon if provided
          iconBg: "#e0f2fe",
          iconColor: "#0277bd",
          confirmBg: "#0277bd",
          confirmHover: "#01579b",
        };
      default:
        return {
          icon: icon || <DeleteIcon sx={{ fontSize: 28 }} />, // Use custom icon if provided
          iconBg: "#fee2e2",
          iconColor: "#dc2626",
          confirmBg: "#dc2626",
          confirmHover: "#b91c1c",
        };
    }
  };

  const {
    icon: finalIcon,
    iconBg,
    iconColor,
    confirmBg,
    confirmHover,
  } = getIconAndColors();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      {/* Header with close button */}
      <Box
        sx={{
          position: "relative",
          padding: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#64748b",
            backgroundColor: "#f1f5f9",
            width: 32,
            height: 32,
            "&:hover": {
              backgroundColor: "#e2e8f0",
              color: "#475569",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent
        sx={{
          textAlign: "center",
          paddingX: 4,
          paddingY: 0,
          paddingBottom: 3,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: iconBg,
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
          }}
        >
          <Box sx={{ color: iconColor, position: "relative", zIndex: 1 }}>
            {finalIcon}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: 2,
            fontSize: "1.5rem",
          }}
        >
          {getTitle()}
        </Typography>

        {/* Message */}
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            lineHeight: 1.6,
            fontSize: "1rem",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          {getMessage()}
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          paddingX: 4,
          paddingBottom: 4,
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          size="large"
          sx={{
            minWidth: 120,
            height: 48,
            borderRadius: 2,
            borderColor: "#d1d5db",
            color: "#6b7280",
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
              color: "#374151",
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          size="large"
          sx={{
            minWidth: 120,
            height: 48,
            borderRadius: 2,
            backgroundColor: confirmBg,
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            boxShadow: `0 4px 14px 0 ${confirmBg}30`,
            "&:hover": {
              backgroundColor: confirmHover,
              boxShadow: `0 6px 20px 0 ${confirmBg}40`,
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default ConfirmationModal;
