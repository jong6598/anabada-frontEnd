import "./App.css";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import theme from "./styles/theme";
import GlobalStyle from "./styles/global";
import Meets from "./pages/Meets";
import AddMeet from "./pages/MeetAdd";
import MeetDetail from "./pages/MeetDetail";
import Header from "./components/Header";
import MeetsAll from "./pages/MeetsAll";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import PostCU from "./pages/PostCU";
import PostsDetail from "./pages/PostsDetail";
import Posts from "./pages/Posts";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostsDetail/>} />
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/meets" element={<Meets />} />
            <Route path="/meetAdd" element={<AddMeet />} />
            <Route path="/meets/:meetId" element={<MeetDetail />} />
          </Route>
          <Route path="/meetsAll" element={<MeetsAll />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
