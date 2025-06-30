import React from "react";
import { Box, Drawer, Button } from "@mui/material";

const CommonFilter = ({ children, openDrawer, handleFunction, onClick }) => {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={handleFunction}
      sx={{ width: "100%", zIndex: (theme) => theme.zIndex.drawer + 100 }}
      PaperProps={{
        sx: {
          width: "25%",
          zIndex: (theme) => theme.zIndex.drawer + 200,
        },
      }}
    >
      <Box role="presentation">
        <div className="absolute top-[2rem] right-0 flex items-center justify-end w-full">
          {/* <Button
            sx={{
              margin: "0rem 0.5rem 1rem 0rem",
              textTransform: "none",
            }}
            className="!text-primaryBlue hover:rotate-90 hover:text-red-500  font-extrabold text-[1.5rem]"
            onClick={onClick}
          >
            X
          </Button> */}
        </div>
        <div className="!m-[0.5rem] flex flex-col">{children}</div>
      </Box>
    </Drawer>
  );
};

export default CommonFilter;
