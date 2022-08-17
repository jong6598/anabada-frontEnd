import "./App.css";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import GlobalStyle from "./styles/global";
import PostCU from './pages/PostCU';
import PostsDetail from './pages/PostsDetail';
import Posts from './pages/Posts';
import GlobalStyle from './styles/global';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts" element={<Posts/>} />
            <Route path="/postsdetail" element={<PostsDetail/>} />
            {/* <Route path="/posts/:postId" element={<PostsDetail/>} /> */}
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}


export default App;
