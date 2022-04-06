import { createTheme } from "@mui/material";

var primary = "#3c3d96";
var secondary = "#ef3444";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 16,
  },
});

export default theme;
