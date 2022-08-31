import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Meets from './pages/Meets';
import AddMeet from './pages/MeetAdd';
import MeetDetail from './pages/MeetDetail';
import Header from './components/Header';
import MeetsAll from './pages/MeetsAll';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import NotFound from './pages/NotFound';
import PostCU from './pages/PostCU';
import PostsDetail from './pages/PostsDetail';
import Posts from './pages/Posts';
import Welcome from './pages/Welcome';
import Mypage from './pages/Mypage';
import MyPosts from './pages/MyPosts';
import MyMeets from './pages/MyMeets';
import Chat from './pages/Chat/Chat';
import ChatRoom from './pages/Chat/ChatRoom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import { userThunk } from './redux/auth-slice';

function App() {
  const cookies = new Cookies();
  const getCookies = cookies.get('refreshToken');
  const dispatch = useDispatch();

  // 새로고침 시 유저정보 리덕스에 재설정
  useEffect(() => {
    // 로그인 한 유저가 아니면 유저정보를 요청하지 않음
    if (getCookies === undefined) {
      return;
    } else {
      // 로그인 한 유저가 유저이면 새로고침 시 유저정보를 요청함
      const getAccess = localStorage.getItem('accessToken');
      dispatch(userThunk(getAccess));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/welcome" element={<Welcome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostsDetail />} />
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/meets" element={<Meets />} />
            <Route path="/meetAdd" element={<AddMeet />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mymeets" element={<MyMeets />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/meetsAll" element={<MeetsAll />} />
          </Route>
          <Route path="/meets/:thunderPostId" element={<MeetDetail />} />
          <Route path="/chat/:nickname" element={<Chat />} />
          <Route path="/room/:roomId" element={<ChatRoom />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
