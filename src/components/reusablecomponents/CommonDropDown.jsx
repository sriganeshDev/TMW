import React from "react";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ error }) => ({
  width: "100%",
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
      borderColor: "#f44336",
      borderWidth: "2px",
    },
  },
  "& .MuiSelect-select": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#666",
  },
  "& .MuiSelect-icon": {
    color: "#666",
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  fontSize: "14px",
  padding: "10px 16px",
  "&.Mui-selected": {
    backgroundColor: "#f44336 !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "#ee5d4a !important",
    },
  },
  "&:hover": {
    backgroundColor: "#f9f9f9 !important",
    color: "white !important",
  },

  "&.Mui-selected:hover": {
    backgroundColor: "#d32f2f !important",
  },
}));

const RequiredLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#333",
  marginBottom: "8px",
  "& .required": {
    color: "#f44336",
    marginLeft: "2px",
  },
});

export const CommonDropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  required,
  error,
  fullWidth,
  disabled,
  ...props
}) => {
  return (
    <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
      {label && (
        <RequiredLabel>
          {label}
          {required && <span className="required">*</span>}
        </RequiredLabel>
      )}
      <StyledFormControl
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
      >
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          {...props}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "#f44336 !important",
                  color: "white !important",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "#f9f9f9 !important",
                  color: "black !important",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  backgroundColor: "#d32f2f !important",
                  color: "white !important",
                },
              },
            },
          }}
        >
          <MenuItem
            value=""
            disabled
            sx={{
              color: "#999",
              fontStyle: "italic",
              "&:hover": {
                backgroundColor: "transparent !important",
                color: "#999 !important",
              },
            }}
          >
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};
