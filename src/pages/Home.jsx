import Map from "../components/Map";

const Home = () => {
  // 새로고침 시 리덕스 state 재설정 확인 TEST용도!!!
  // const userInfo = useSelector((state) => state.auth);
  // console.log(userInfo);

  // Refresh Token TEST용도!!!
  // const dispatch = useDispatch();
  // const handleOnclick = () => {
  //   const getAccess = localStorage.getItem("accessToken");
  //   dispatch(userThunk(getAccess));
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   const cookies = new Cookies();
  //   cookies.remove("refreshToken");
  // };

  return (
    <>
      <Map />
      {/* <button onClick={handleOnclick}>리프레시 토큰 실험</button>
      <button onClick={handleLogout}>로그아웃 실험</button> */}
    </>
  );
};

export default Home;
