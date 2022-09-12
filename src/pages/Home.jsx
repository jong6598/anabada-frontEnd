import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import KakaoMap from "../components/Map";
import MapSearch from "../components/MapSearch";

const Home = () => {
  const [latlng, setLatlng] = useState("");

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

  return (
    <>
      <MapSearch setLatlng={setLatlng} />
      <KakaoMap data={data} />
    </>
  );
};

export default Home;
