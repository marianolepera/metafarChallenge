import { CssBaseline } from '@mui/material';
import './App.css'
import Home from './pages/Home'
import theme from './themes/themes'
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App