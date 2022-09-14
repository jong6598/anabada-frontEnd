import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Meets from './pages/Meets/Meets';
import MeetAdd from './pages/Meets/MeetAdd';
import MeetDetail from './pages/Meets/MeetDetail';
import Header from './layout/Header';
import MeetsAll from './pages/Meets/MeetsAll';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/SignUp';
import NotFound from './pages/NotFound/NotFound';
import PostDetail from './pages/Posts/PostDetail';
import Posts from './pages/Posts/Posts';
import Welcome from './pages/Auth/Welcome';
import Mypage from './pages/MyPage/Mypage';
import MyPosts from './pages/MyPage/MyPosts';
import MyMeets from './pages/MyPage/MyMeets';
import { useSelector, useDispatch } from 'react-redux';
import { useNotification } from './shared/hooks/notificationHook';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import Notification from './pages/Notification/Notification';
import { api } from './shared/api';
import Chat from './pages/Chat/Chat';
import ChatRoom from './pages/Chat/ChatRoom';
import { userThunk } from './redux/auth-slice';
import Container from './layout/Container';
import Intro from './pages/Intro/Intro';
import PostAdd from './pages/Posts/PostAdd';

function App() {
  const cookies = new Cookies();
  const getCookies = cookies.get('refreshToken');
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  const location = useLocation();

  // 새로고침 시 유저정보 리덕스에 재설정
  useEffect(() => {
    // 로그인 한 유저가 아니면 유저정보를 요청하지 않음
    if (getCookies === undefined || accessToken === undefined) {
      return;
    } else {
      // 로그인 한 유저가 유저이면 새로고침 시 유저정보를 요청함
      dispatch(userThunk(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ::: notification 연결 관련 로직 ::: */
  // 헤더에 넣을 유저정보 받아오기
  const userInfo = useSelector((state) => state.auth);

  // 커스텀 훅 사용해서 알림 소켓 연결하기
  const { notifications, setNotifications } = useNotification(userInfo.userId);

  // 최초 로그인 시 refetch하면서 badge 여부 확인하기
  useEffect(() => {
    // 로그인을 했을 때 최초 쌓인 뱃지 요청하기(이후는 소캣 이용해서 업데이트 된다)
    if (getCookies !== undefined) {
      api
        .get(`/notifications`, {
          headers: {
            Authorization: accessToken
          }
        })
        .then((res) => {
          return setNotifications((prev) => {
            return {
              ...prev,
              isBadge: res.data?.badge
            };
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCookies]);

  const test = ['/notifications', '/room', '/chat'];

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {test.filter((el) => location.pathname.startsWith(el)).length === 0 && (
          <Header notifications={notifications} />
        )}

        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/welcome" element={<Welcome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/meets" element={<Meets />} />
            <Route path="/meetsAll" element={<MeetsAll />} />
            <Route path="/meets/:thunderPostId" element={<MeetDetail />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            {accessToken && getCookies && (
              <>
                <Route path="/posts/upload" element={<PostAdd />} />
                <Route path="/posts/:postId/edit" element={<PostAdd />} />
                <Route
                  path="/meetAdd/:thunderPostId/edit"
                  element={<MeetAdd />}
                />
                <Route path="/meetAdd" element={<MeetAdd />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mymeets" element={<MyMeets />} />
                <Route path="/myposts" element={<MyPosts />} />
              </>
            )}
          </Route>
          <Route path="/intro" element={<Intro />} />
          <Route path="/chat/:nickname" element={<Chat />} />
          <Route path="/room" element={<ChatRoom />} />
          <Route
            path="/notifications"
            element={<Notification setNotifications={setNotifications} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
