import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

// kakao api를 호출하면 kakao가 window전역객체에 바인딩된다.
const { kakao } = window;

const Map = () => {
  const [markers, setMarkers] = useState([]);

  // fetcher
  const fetchingSpot = () =>
    axios.get(`http://${process.env.REACT_APP_API_SERVER}/api/beach`);
  // react-query
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["spotData"],
    fetchingSpot,
    {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        console.log("Map Data를 성공적으로 fetch했습니다. ::: ");
      },
      onError(err) {
        console.log("에러가 발생했습니다!! ::: ", err);
      },
    }
  );

  useEffect(() => {
    // map을 띄울 노드 객체
    const container = document.getElementById("myMap");
    // map의 options를 설정
    const options = {
      center: new kakao.maps.LatLng(36.350701, 127.870667),
      level: 13,
    };
    const temp = "24도";
    const pos = "카카오!";
    // map생성
    const map = new kakao.maps.Map(container, options);
    const content = `
    <div class="marker__wraper">
    <span>기온: ${temp}</span>
    <br/>
    <span>지역명: ${pos}</span>
    <span></span>
    </div>
    `;
    // 마커 클러스터러를 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
      calculator: [2, 4, 6], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다. 크기 구분 값에
      texts: getTexts, // texts는 배열로도 설정가능
      styles: [
        {
          // calculator 각 사이 값 마다 적용될 스타일을 지정한다
          width: "30px",
          height: "30px",
          background: "rgba(51, 204, 255, 0.1)",
          borderRadius: "15px",
          color: "#000",
          textAlign: "center",
          fontWeight: "bold",
          lineHeight: "31px",
        },
        {
          width: "40px",
          height: "40px",
          background: "rgba(255, 153, 0, 0.9)",
          borderRadius: "20px",
          color: "#000",
          textAlign: "center",
          fontWeight: "bold",
          lineHeight: "41px",
        },
        {
          width: "50px",
          height: "50px",
          // background: "rgba(255, 51, 204, .8)",
          background: 'url("/android-chrome-192x192.png")',
          opacity: 0.4,
          borderRadius: "25px",
          color: "#000",
          textAlign: "center",
          fontWeight: "bold",
          lineHeight: "51px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
        {
          width: "60px",
          height: "60px",
          background: "rgba(255, 80, 80, .8)",
          borderRadius: "30px",
          color: "#000",
          textAlign: "center",
          fontWeight: "bold",
          lineHeight: "61px",
        },
      ],
    });
    // 클러스터의 범위에 따른 문자열 생성
    function getTexts(count) {
      if (count < 2) {
        return "가";
      } else if (count < 4) {
        return "온도: 23";
      } else if (count < 6) {
        return null;
      } else {
        return "라";
      }
    }
    const markers = data.data.map((el) => {
      const marker__answer = new kakao.maps.CustomOverlay({
        content: content,
        position: new kakao.maps.LatLng(el.x, el.y),
      });
      return marker__answer;
    });
    //
    setMarkers(markers);
    clusterer.addMarkers(markers);
  }, [data]);

  return (
    <>
      <MapWrapper id="myMap"></MapWrapper>
    </>
  );
};

export default Map;

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;
