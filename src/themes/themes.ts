import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#ab47bc",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#FFF",
      contrastText: "#000"
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'normal',
    ].join(','),
  }
});


export default theme;