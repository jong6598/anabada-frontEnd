import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  SwiperCore.use([Pagination]);
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      autoplay={{ delay: 3000 }}
      loop={false}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <IntroContainer>
          <div className="introBox">
            <div className="imgBox">
              <img src="/assets/poster.png" alt="" />
            </div>
            <div className="infoBox">
              <p>아나바다(Anabada)는</p>
              <p className="bold">커뮤니티형 서핑 라이프스타일</p>
              <p>웹 서비스입니다</p>
              <br />
              <p>이제 아나바다에서</p>
              <p>당신의 서핑 동반자를 찾으세요</p>
              <button onClick={() => navigate("/home")}>
                🌊서핑 즐기러 가기
              </button>
            </div>
          </div>
        </IntroContainer>
      </SwiperSlide>
      <SwiperSlide>
        <IntroContainer>
          <div className="introBox">
            <div className="imgBox">
              <img src="/assets/introMap.png" alt="" />
            </div>
            <div className="infoBox">
              <p>지도는 스크롤을 통해 확대가 가능합니다</p>
              <p>확대 후 해수욕장을 선택하면</p>
              <p className="bold">파고, 풍속, 날씨, 강수</p>
              <p>등의 정보를 확인할 수 있습니다.</p>
            </div>
          </div>
        </IntroContainer>
      </SwiperSlide>
      <SwiperSlide>
        <IntroContainer>
          <div className="introBox">
            <div className="imgBox">
              <img src="/assets/introChat.png" alt="" />
            </div>
            <div className="infoBox">
              <p>각 유저와의 채팅버튼은</p>
              <p className="bold">게시물 상세페이지, 댓글, 모임 상세페이지</p>
              <p>에서 볼 수 있습니다</p>
              <p>(오른쪽 상단 채팅방 보기)</p>
              <br />
              <p>채팅을 통해 함께 서핑할 사람도 찾고</p>
              <p>서핑 🍯팁도 공유해보세요!</p>
              <button onClick={() => navigate("/home")}>
                🌊서핑 즐기러 가기
              </button>
            </div>
          </div>
        </IntroContainer>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;

const IntroContainer = styled.div`
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 40vw;
  }
  .introBox {
    height: 100vh;
    /* border: 0.3rem solid #438FC5; */
    border-radius: 1.3rem;
    .imgBox {
      background-color: #007aff;
      position: relative;
      height: 70%;
      /* border-radius: 1rem; */
      overflow: hidden;
      img {
        width: 100%;
        height: 90%;
      }
    }
    .infoBox {
      height: 40%;
      position: relative;
      background: #f7faff;
      bottom: 10%;
      border-radius: 1rem;
      box-shadow: 1px 1px 8px rgba(198, 198, 198, 0.42);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .bold {
        font-weight: 600;
      }
      button {
        margin-top: 0.5rem;
        background-color: #57abf0;
        border-radius: 0.5rem;
        font-size: 1rem;
        padding: 0.3rem 0.8rem;
        color: white;
        font-weight: 600;
      }
    }
  }
`;
