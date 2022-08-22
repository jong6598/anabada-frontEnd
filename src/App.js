import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Meets from './pages/Meets';
import AddMeet from './pages/MeetAdd';
import MeetDetail from './pages/MeetDetail';
import Header from './layout/Header';
import MeetsAll from './pages/MeetsAll';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Meets />} />
            <Route path="/meets" element={<Meets />} />
            <Route path="/meetAdd" element={<AddMeet />} />
            <Route path="/meetsAll" element={<MeetsAll />} />
          </Route>
          <Route path="/meets/:meetId" element={<MeetDetail />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
