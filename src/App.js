import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import PostCU from './pages/PostCU';
import PostsDetail from './pages/PostsDetail';
import Posts from './pages/Posts';
import GlobalStyle from './styles/global';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
          <Routes>
            <Route path="/posts" element={<Posts/>} />
            <Route path="/postsdetail" element={<PostsDetail/>} />
            {/* <Route path="/posts/:postId" element={<PostsDetail/>} /> */}
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />  
          </Routes>
      </ThemeProvider>
    </div>
  );
}


export default App;
