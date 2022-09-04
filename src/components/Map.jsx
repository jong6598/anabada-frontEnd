import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { memo, useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import checkedWeather from '../styles/weather';
import { Map, CustomOverlayMap, MarkerClusterer } from 'react-kakao-maps-sdk';

const { kakao } = window;

const KakaoMap = memo(() => {
  const [picker, setPicker] = useState({
    beachId: -1,
    beachName: '',
    beachNum: '',
    pcp: '',
    pop: '',
    pty: '',
    sky: '',
    tmp: '',
    wav: '',
    wsd: '',
    x: 0,
    y: 0
  });

  const handlePicker = useCallback((pickerInfo) => {
    setPicker((prev) => {
      return { ...prev, ...pickerInfo };
    });
  }, []);

  // fetcher
  const fetchingSpot = () =>
    axios.get(`http://${process.env.REACT_APP_API_SERVER}/api/beach`);
  // react-query
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['spotData'],
    fetchingSpot,
    {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        console.log('Map Data를 성공적으로 fetch했습니다. ::: ', data.data);
      },
      onError(err) {
        console.log('에러가 발생했습니다!! ::: ', err);
      }
    }
  );

  return (
    <>
      <MapWrapper center={{ lat: 36.350701, lng: 127.870667 }} level={13}>
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
          calculator={[10, 30, 50]}
          styles={[
            {
              // calculator 각 사이 값 마다 적용될 스타일을 지정한다
              width: '30px',
              height: '30px',
              background: '#b6d9ff',
              borderRadius: '15px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '31px'
            },
            {
              width: '40px',
              height: '40px',
              background: '#5dabfd',
              borderRadius: '20px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '41px'
            },
            {
              width: '50px',
              height: '50px',
              background: '#007AFF',
              backgroundImage: 'url("/assets/background.png")',

              borderRadius: '25px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '51px'
            }
          ]}
        >
          {data.data.map((el) => {
            const weatherIcons = checkedWeather(el.sky, el.pty);
            return (
              // 커스텀 오버레이가 표시될 위치입니다
              <OverlayMap
                key={el.beachId}
                position={{
                  lat: el.x,
                  lng: el.y
                }}
                xAnchor={0.3}
                yAnchor={0.5}
              >
                <MapPicker
                  onClick={() => handlePicker(el)}
                  isClicked={picker.beachId === el.beachId}
                >
                  {picker.beachId === el.beachId ? (
                    <img src="/weatherIcons/bluebg.svg" alt=""></img>
                  ) : (
                    <img src="/weatherIcons/whitebg.svg" alt=""></img>
                  )}
                  <PickerInfo>
                    <div>
                      <img src={weatherIcons} alt=""></img>
                    </div>
                    <div>{el.tmp}</div>
                  </PickerInfo>
                </MapPicker>
              </OverlayMap>
            );
          })}
        </MarkerClusterer>
        {picker.beachId !== -1 && (
          <PlaceInfo>
            <ExtraInfoContainer>
              <InfoTitle picker={picker}>
                <div className="plcae__name">
                  <h3>{picker.beachName}</h3>
                </div>
                <ExtraInfo>
                  <div>
                    <img src="/weatherIcons/map_pin.svg"></img>
                  </div>
                  <div>
                    <span>{picker.beachName}</span>
                  </div>
                </ExtraInfo>
              </InfoTitle>
            </ExtraInfoContainer>
            <ExtraInfoContainer className="extra__info">
              <ExtraInfo>
                <div>
                  <span class="material-symbols-outlined">waves</span>
                </div>
                <div>
                  <span>예상파고 : {picker.wav}M</span>
                </div>
              </ExtraInfo>
              <ExtraInfo>
                <div>
                  <span class="material-symbols-outlined">air</span>
                </div>
                <div>
                  <span>풍속 : {picker.wsd}m/s</span>
                </div>
              </ExtraInfo>
              <ExtraInfo>
                <div>
                  <span class="material-symbols-outlined">water_drop</span>
                </div>
                <div>
                  <span>강수확률 : {picker.pop}%</span>
                </div>
              </ExtraInfo>
              <ExtraInfo>
                <div>
                  <span class="material-symbols-outlined">umbrella</span>
                </div>
                <div>
                  {picker.pcp === '강수없음' ? (
                    <span>강수량 : {picker.pcp}</span>
                  ) : (
                    <span>강수량 : {picker.pcp}mm</span>
                  )}
                </div>
              </ExtraInfo>
            </ExtraInfoContainer>
          </PlaceInfo>
        )}
      </MapWrapper>
    </>
  );
});

export default KakaoMap;

const MapWrapper = styled(Map)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const OverlayMap = styled(CustomOverlayMap)``;

const MapPicker = styled.div`
  position: relative;
  /* z-index: ${(props) => (props.isClicked ? 100 : 1)}; */
`;

const PickerInfo = styled.div`
  position: absolute;
  top: 40%;
  bottom: 50%;
  left: 48%;
  right: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div:last-child {
    margin-top: -0.2rem;
  }
`;

const placeInfoAnimation = keyframes`
  0%{
    opacity: 0;
    bottom: 0;
  }
  10%{
    opacity: 1;
    bottom: 1.125rem;
  }
  100%{
    opacity: 1;
    bottom: 1.125rem;
  }
`;

const PlaceInfo = styled.div`
  position: fixed;
  width: 90%;
  z-index: 500;
  border-radius: 10px;
  padding: 0.4rem;
  animation: ${placeInfoAnimation} 3s ease-in-out forwards;

  margin: 0 auto;
  left: 0;
  right: 0;
`;

const InfoTitle = styled.div`
  h3 {
    margin: 0;
  }
`;

const ExtraInfo = styled.div`
  color: #8e8e93;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ExtraInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 1.3125rem 1rem;
  &:last-child {
    display: flex;
    flex-wrap: wrap;
    & > div {
      margin: 0.1rem;
      margin-right: 0.5rem;
      color: black;
    }
  }
`;
