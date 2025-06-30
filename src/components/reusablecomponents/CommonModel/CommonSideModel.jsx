import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";

export default function CommonSideModel({
  children,
  openDrawer,
  handleFunction,
  onClick,
}) {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      PaperProps={{
        sx: {
          width: "35%",
          zIndex: 1300,
        },
      }}
      sx={{
        zIndex: 1300,
      }}
    >
      <Box role="presentation">
        {/* <div className="absolute top-[2rem] right-0 flex items-center justify-end w-full"></div> */}
        <div className="!m-[0.5rem] flex flex-col">{children}</div>
      </Box>
    </Drawer>
  );
}
