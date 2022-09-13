import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import KakaoMap from "../components/Map";
import MapSearch from "../components/MapSearch";

const Home = () => {
  const [latlng, setLatlng] = useState("");
  const [picker, setPicker] = useState({
    beachId: -1,
    beachName: "",
    beachNum: "",
    pcp: "",
    pop: "",
    pty: "",
    sky: "",
    tmp: "",
    wav: "",
    wsd: "",
    x: 0,
    y: 0,
  });

  // fetcher
  const fetchingSpot = () =>
    axios.get(`https://${process.env.REACT_APP_API_SERVER}/api/beach`);
  // react-query
  const { data } = useQuery(["spotData"], fetchingSpot, {
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    onError(err) {
      console.log("에러가 발생했습니다!! ::: ", err);
    },
  });

  useEffect(() => {
    console.log(data);
  }, [latlng]);

  return (
    <>
      <MapSearch setLatlng={setLatlng} />
      <KakaoMap data={data} picker={picker} setPicker={setPicker} />
    </>
  );
};

export default Home;
