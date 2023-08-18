import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { FC, ReactNode, useState } from "react";
import { Typography } from "@mui/material";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface PersistentDrawerLeftProps {
  children: ReactNode;
  drawerContent: ReactNode; // <-- Add this line
}

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  background: "none",
  boxShadow: "none",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  justifyContent: "flex-start",
}));

const PersistentDrawerLeft: FC<PersistentDrawerLeftProps> = ({
  children,
  drawerContent,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "block" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: 12,
            boxSizing: 'border-box',

          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box padding={2}>{drawerContent}</Box>
      </Drawer>
      <main>
        <DrawerHeader />
        {children}
      </main>
    </Box>
  );
};

export default PersistentDrawerLeft;
