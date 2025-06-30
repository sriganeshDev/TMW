import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const StyledDatePicker = styled(DatePicker)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      borderColor: error ? "#f44336" : "#ddd",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: error ? "#f44336" : "#999",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f44336", // Red when focused/open
      borderWidth: "2px",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "4px 8px", // Further reduced padding to reduce input height
    fontSize: "12px", // Reduced font size
    color: "#333",
    height: "auto", // Ensuring text field height is auto-adjusted
    lineHeight: "1.4", // Reduced line-height for better compactness
    "&::placeholder": {
      color: "#999",
      opacity: 1,
    },
  },
  "& .MuiInputAdornment-root": {
    "& .MuiIconButton-root": {
      color: "#666",
      "&:hover": {
        backgroundColor: "rgba(244, 67, 54, 0.04)", // Light red hover for icon
      },
    },
  },
}));

const RequiredLabel = styled(Typography)({
  fontSize: "12px", // Reduced font size for a more compact label
  fontWeight: 500,
  color: "#333",
  marginBottom: "4px", // Reduced margin between label and input
  "& .required": {
    color: "#f44336",
    marginLeft: "2px",
  },
});

export const CommonDatePicker = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  required = false,
  error = false,
  fullWidth = true,
  disabled = false,
  helperText = "",
  format = "MM/dd/yyyy",
  minDate = null,
  maxDate = null,
  disablePast = false,
  disableFuture = false,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minWidth: 200, width: fullWidth ? "100%" : "auto" }}>
        {label && (
          <RequiredLabel>
            {label}
            {required && <span className="required">*</span>}
          </RequiredLabel>
        )}
        <StyledDatePicker
          value={value}
          onChange={onChange}
          disabled={disabled}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          {...props}
          slotProps={{
            textField: {
              fullWidth: fullWidth,
              error: error,
              helperText: helperText,
              placeholder: placeholder,
              variant: "outlined",
              InputLabelProps: {
                shrink: false,
              },
            },
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "& .MuiPickersDay-root": {
                  "&:hover": {
                    backgroundColor: "#f44336",
                    color: "white",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#f44336 !important",
                    color: "white !important",
                    "&:hover": {
                      backgroundColor: "#d32f2f !important",
                    },
                  },
                },

                "& .MuiPickersCalendarHeader-root": {
                  "& .MuiIconButton-root": {
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.04)",
                    },
                  },
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
