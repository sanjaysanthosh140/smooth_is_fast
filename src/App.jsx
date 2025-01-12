import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import Navbar from "./Components/Navbar";
import Homeprod from "./Components/Homeprod";
import Addprod from "./Components/Addprod";

function App() {
  const darkBlueTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#0A192F',  // Rich dark blue
        paper: '#112240',    // Slightly lighter blue for elements
      },
    },
  });

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <div style={{ 
        backgroundColor: '#0A192F', 
        minHeight: '100vh',
        color: '#ffffff'
      }}>
        <BrowserRouter>
          <Navbar/>
          <div className="cont">
            <Routes>
              <Route path="/" element={<Homeprod/>} />
              <Route path="/add" element={<Addprod/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App;
