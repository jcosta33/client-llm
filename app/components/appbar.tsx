import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Person from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  Switch,
} from "@mui/material";
import { appConfig } from "../consts";
import { useContext } from "../hooks";

const settings = ["Settings", "Presets", "Contexts"];

function ResponsiveAppBar() {
  const { chatLoaded, selectedModel, setSelectedModel, updateConfig } =
    useContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#000",
        boxShadow: "none",
        borderBottom: "1px solid #222",
      }}
    >
      <Toolbar>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <MenuItem>
            <FormControl variant="outlined" size="small">
              <InputLabel id="language-label">Layout</InputLabel>

              <Select
                labelId="layout-label"
                label="Layout"
                value="code"
                variant="outlined"
                sx={{ marginRight: 2 }}
              >
                <MenuItem value="chat">Chat</MenuItem>
                <MenuItem value="code">Code</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small">
              <InputLabel id="llm-model-label">LLM Model</InputLabel>
              <Select
                labelId="llm-model-label"
                value={selectedModel}
                disabled={!chatLoaded}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setTimeout(() => {
                    updateConfig();
                  }, 100);
                }}
                label="LLM Model"
                sx={{ marginRight: 2 }}
              >
                {appConfig.model_list.map((model, index) => (
                  <MenuItem key={index} value={model.local_id}>
                    {model.local_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <InputLabel id="language-label">Preset</InputLabel>

              <Select
                labelId="preset-label"
                label="Preset"
                value="pp"
                variant="outlined"
                disabled={!chatLoaded}
              >
                <MenuItem value="pp">Pair programming</MenuItem>
                <MenuItem value="c">Creative</MenuItem>
                <MenuItem value="i">Interesting</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              value="start"
              control={<Switch color="secondary" defaultChecked />}
              label="Logs"
              labelPlacement="start"
            />
          </MenuItem>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Person />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
