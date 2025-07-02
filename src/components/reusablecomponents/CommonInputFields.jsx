import { Box, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

export default function CustomTextField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="w-full mb-4">
      <TextField
        fullWidth
        label={label}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </div>
  );
}

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ error }) => ({
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
  "& .MuiOutlinedInput-input": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333",
    "&::placeholder": {
      color: "#999",
      opacity: 1,
    },
  },

  "& .MuiOutlinedInput-inputMultiline": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333",
    "&::placeholder": {
      color: "#999",
      opacity: 1,
    },
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

export const CommonTextField = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  error = false,
  fullWidth = true,
  disabled = false,
  type,
  variant,
  rows = 4,
  minRows = 2,
  maxRows = 8,
  helperText = "",
  ...props
}) => {
  const isTextArea = variant === "textarea";

  return (
    <Box sx={{ minWidth: 200, width: fullWidth ? "100%" : "auto" }}>
      {label && (
        <RequiredLabel>
          {label}
          {required && <span className="required">*</span>}
        </RequiredLabel>
      )}
      <StyledTextField
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
        type={isTextArea ? undefined : type}
        multiline={isTextArea}
        rows={isTextArea ? rows : undefined}
        minRows={isTextArea ? minRows : undefined}
        maxRows={isTextArea ? maxRows : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        variant="outlined"
        {...props}
        InputLabelProps={{
          shrink: false,
        }}
      />
    </Box>
  );
};
