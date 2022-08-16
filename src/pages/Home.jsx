import { useDispatch } from "react-redux";
import Map from "../components/Map";
import { userThunk } from "../redux/auth-slice";

const Home = () => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    const getAccess = localStorage.getItem("accessToken");
    dispatch(userThunk(getAccess));
  };
  return (
    <>
      <Map />
      <button onClick={handleOnclick}>엑세스 토큰 사용해보기</button>
    </>
  );
};

export default Home;
