import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Meets from './pages/Meets';
import AddMeet from './pages/MeetAdd';
import MeetDetail from './pages/MeetDetail';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Meets />} />
          <Route path="/meets" element={<Meets />} />
          <Route path="/meets/:meetId" element={<MeetDetail />} />
          <Route path="/meetAdd" element={<AddMeet />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
