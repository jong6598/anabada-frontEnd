import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import React, { useState, useRef } from "react";

import { storage } from "../../shared/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { myApi } from "../../shared/api";

const Mypage = () => {
  const profileImg = useSelector((state) => state.auth.profileImg);
  const nickname = useSelector((state) => state.auth.nickname);
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [imgSrc, setImgSrc] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    const cookies = new Cookies();
    cookies.remove("refreshToken");

    navigate("/");
  };

  const updateImg = async () => {
    let uploadUrl;
    const reader = new FileReader();
    const image = fileInput.current.files[0];

    if (fileInput.current.files.length) {
      const uploaded_file = await uploadBytes(
        ref(storage, `images/profile/${fileInput.current?.files[0].name}`),
        fileInput.current?.files[0]
      );
      uploadUrl = await getDownloadURL(uploaded_file.ref);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgSrc(reader.result);
      }
    };
    reader.readAsDataURL(image);

    const profileImg = {
      profileImg: uploadUrl,
    };

    const result = window.confirm("변경된 프로필 사진을 등록하시겠습니까?");
    if (result) {
      await myApi.uploadProfile(profileImg);
    } else {
      const deleteImg = ref(storage, uploadUrl);
      deleteObject(deleteImg)
        .then(() => {
          setImgSrc("");
        })
        .catch((err) => {
          alert("취소 실패!");
          console.log(err);
        });
    }
  };

  return (
    <>
      <UserDiv>
        <ProfileDiv>
          <ProfileImgDiv>
            {imgSrc ? (
              <img src={imgSrc} alt="profile"></img>
            ) : (
              <img src={profileImg} alt="profile" />
            )}
            <button
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="11.5"
                  fill="white"
                />
                <path
                  d="M5.56286 14.1813L6.89619 16.488C6.98471 16.641 7.13037 16.7526 7.30114 16.7982C7.47192 16.8438 7.65382 16.8198 7.80686 16.7313L8.73752 16.194C9.12419 16.4987 9.55153 16.7487 10.0009 16.9353V18.0007C10.0009 18.1775 10.0711 18.347 10.1961 18.4721C10.3211 18.5971 10.4907 18.6673 10.6675 18.6673H13.3342C13.511 18.6673 13.6806 18.5971 13.8056 18.4721C13.9306 18.347 14.0009 18.1775 14.0009 18.0007V16.9353C14.4537 16.7468 14.8787 16.4974 15.2642 16.194L16.1949 16.7313C16.5129 16.9147 16.9222 16.8047 17.1055 16.488L18.4389 14.1813C18.5266 14.0281 18.5503 13.8465 18.5047 13.6759C18.4591 13.5053 18.348 13.3597 18.1955 13.2707L17.2809 12.742C17.3523 12.2503 17.3519 11.7509 17.2795 11.2593L18.1942 10.7307C18.5115 10.5473 18.6215 10.1373 18.4375 9.81998L17.1042 7.51332C17.0157 7.36032 16.87 7.24873 16.6992 7.2031C16.5285 7.15747 16.3466 7.18153 16.1935 7.26998L15.2629 7.80732C14.8779 7.50357 14.453 7.25413 14.0002 7.06598V6.00065C14.0002 5.82384 13.93 5.65427 13.8049 5.52925C13.6799 5.40422 13.5103 5.33398 13.3335 5.33398H10.6669C10.49 5.33398 10.3205 5.40422 10.1955 5.52925C10.0704 5.65427 10.0002 5.82384 10.0002 6.00065V7.06598C9.54734 7.25452 9.12232 7.50393 8.73686 7.80732L7.80686 7.26998C7.7311 7.2261 7.64744 7.19758 7.56065 7.18605C7.47386 7.17453 7.38565 7.18023 7.30107 7.20283C7.21649 7.22543 7.13719 7.26449 7.06772 7.31777C6.99825 7.37104 6.93996 7.43749 6.89619 7.51332L5.56286 9.81998C5.47512 9.97319 5.45146 10.1549 5.49703 10.3254C5.54261 10.496 5.65373 10.6416 5.80619 10.7307L6.72086 11.2593C6.64895 11.7509 6.64895 12.2504 6.72086 12.742L5.80619 13.2707C5.48886 13.454 5.37886 13.864 5.56286 14.1813ZM12.0002 9.33398C13.4709 9.33398 14.6669 10.53 14.6669 12.0007C14.6669 13.4713 13.4709 14.6673 12.0002 14.6673C10.5295 14.6673 9.33352 13.4713 9.33352 12.0007C9.33352 10.53 10.5295 9.33398 12.0002 9.33398Z"
                  fill="#8E8E93"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="11.5"
                  stroke="#C7C7CC"
                />
              </svg>
            </button>

            <input
              type="file"
              accept="image/*"
              onChange={updateImg}
              ref={fileInput}
              name="profileImg"
            />
          </ProfileImgDiv>
        </ProfileDiv>

        <div>
          <Nickname>{nickname}</Nickname>
          <Email>{email}</Email>
        </div>
      </UserDiv>
      <SelectDiv>
        <h1>피드 리스트</h1>
        <BtnDiv>
          <Btn onClick={() => navigate(`/myposts`, { state: "myWritePost" })}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66224 21.7501L6.90475 21.7502L22.4611 6.1938L18.2185 1.95117L2.66211 17.5075L2.66224 21.7501Z"
                fill="#1C1B1F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4453 5.66303C13.7381 5.37014 14.213 5.37014 14.5059 5.66303L18.7486 9.90568C19.0415 10.1986 19.0415 10.6734 18.7486 10.9663C18.4557 11.2592 17.9808 11.2592 17.6879 10.9663L13.4453 6.72369C13.1524 6.4308 13.1524 5.95592 13.4453 5.66303Z"
                fill="#1C1B1F"
              />
            </svg>
            <label>작성 피드</label>
          </Btn>
          <Btn onClick={() => navigate(`/myposts`, { state: "myLikePost" })}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4C4.96244 4 2.5 6.46245 2.5 9.5C2.5 15 9 20 12.5 21.1631C16 20 22.5 15 22.5 9.5C22.5 6.46245 20.0375 4 17 4C15.1398 4 13.4953 4.92345 12.5 6.3369C11.5047 4.92345 9.86015 4 8 4Z"
                fill="#FF2D55"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.75 9.5C1.75 6.04824 4.54822 3.25 8 3.25C9.76772 3.25 11.3639 3.98438 12.5 5.16271C13.6361 3.98438 15.2323 3.25 17 3.25C20.4518 3.25 23.25 6.04824 23.25 9.5C23.25 12.5381 21.4668 15.3433 19.3454 17.4856C17.2168 19.6353 14.6191 21.2492 12.7365 21.8748C12.583 21.9259 12.417 21.9259 12.2635 21.8748C10.3809 21.2492 7.78321 19.6353 5.65457 17.4856C3.53322 15.3433 1.75 12.5381 1.75 9.5ZM8 4.75C5.37665 4.75 3.25 6.87666 3.25 9.5C3.25 11.9619 4.71678 14.4067 6.72043 16.4302C8.62163 18.3502 10.891 19.7727 12.5 20.3682C14.109 19.7727 16.3784 18.3502 18.2796 16.4302C20.2832 14.4067 21.75 11.9619 21.75 9.5C21.75 6.87666 19.6233 4.75 17 4.75C15.3941 4.75 13.9741 5.54621 13.1132 6.76872C12.9727 6.96821 12.744 7.0869 12.5 7.0869C12.256 7.0869 12.0273 6.96821 11.8868 6.76872C11.0259 5.54621 9.60588 4.75 8 4.75Z"
                fill="#FF2D55"
              />
            </svg>
            <label>좋아요 피드</label>
          </Btn>
        </BtnDiv>
        <AllBtn onClick={() => navigate("/myposts", { state: "myWritePost" })}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L8.03033 6.46967C8.32322 6.76256 8.32322 7.23744 8.03033 7.53033L2.03033 13.5303C1.73744 13.8232 1.26256 13.8232 0.96967 13.5303C0.676777 13.2374 0.676777 12.7626 0.96967 12.4697L6.43934 7L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z"
              fill="#1C1B1F"
            />
          </svg>
        </AllBtn>
      </SelectDiv>
      <SelectDiv>
        <h1>오픈 모임 리스트</h1>

        <BtnDiv>
          <Btn onClick={() => navigate(`/mymeets`, { state: "myHostMeet" })}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 12C11.706 12 13.5 10.206 13.5 8C13.5 5.794 11.706 4 9.5 4C7.294 4 5.5 5.794 5.5 8C5.5 10.206 7.294 12 9.5 12ZM11 13H8C4.691 13 2 15.691 2 19V20H17V19C17 15.691 14.309 13 11 13Z"
                fill="black"
              />
              <path
                d="M16.6036 11.048C17.2126 10.0101 17.4757 8.80528 17.3546 7.60797C17.1756 5.82397 16.1796 4.24697 14.5516 3.16797L13.4466 4.83397C14.5656 5.57597 15.2466 6.63297 15.3646 7.80797C15.419 8.35407 15.351 8.90543 15.1656 9.42195C14.9801 9.93847 14.6819 10.4072 14.2926 10.794L13.1006 11.986L14.7186 12.461C18.9506 13.701 18.9996 17.957 18.9996 18H20.9996C20.9996 16.211 20.0436 12.715 16.6036 11.048Z"
                fill="black"
              />
            </svg>
            <label>주최 모임</label>
          </Btn>
          <Btn onClick={() => navigate(`/mymeets`, { state: "myJoinMeet" })}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 12C11.706 12 13.5 10.206 13.5 8C13.5 5.794 11.706 4 9.5 4C7.294 4 5.5 5.794 5.5 8C5.5 10.206 7.294 12 9.5 12ZM11 13H8C4.691 13 2 15.691 2 19V20H17V19C17 15.691 14.309 13 11 13Z"
                fill="black"
              />
              <path
                d="M16.6036 11.048C17.2126 10.0101 17.4757 8.80528 17.3546 7.60797C17.1756 5.82397 16.1796 4.24697 14.5516 3.16797L13.4466 4.83397C14.5656 5.57597 15.2466 6.63297 15.3646 7.80797C15.419 8.35407 15.351 8.90543 15.1656 9.42195C14.9801 9.93847 14.6819 10.4072 14.2926 10.794L13.1006 11.986L14.7186 12.461C18.9506 13.701 18.9996 17.957 18.9996 18H20.9996C20.9996 16.211 20.0436 12.715 16.6036 11.048Z"
                fill="black"
              />
            </svg>
            <label>참석 모임</label>
          </Btn>

          <Btn onClick={() => navigate(`/mymeets`, { state: "myLikeMeet" })}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 4C4.46244 4 2 6.46245 2 9.5C2 15 8.5 20 12 21.1631C15.5 20 22 15 22 9.5C22 6.46245 19.5375 4 16.5 4C14.6398 4 12.9953 4.92345 12 6.3369C11.0047 4.92345 9.36015 4 7.5 4Z"
                fill="#FF2D55"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.25 9.5C1.25 6.04824 4.04822 3.25 7.5 3.25C9.26772 3.25 10.8639 3.98438 12 5.16271C13.1361 3.98438 14.7323 3.25 16.5 3.25C19.9518 3.25 22.75 6.04824 22.75 9.5C22.75 12.5381 20.9668 15.3433 18.8454 17.4856C16.7168 19.6353 14.1191 21.2492 12.2365 21.8748C12.083 21.9259 11.917 21.9259 11.7635 21.8748C9.88091 21.2492 7.28321 19.6353 5.15457 17.4856C3.03322 15.3433 1.25 12.5381 1.25 9.5ZM7.5 4.75C4.87665 4.75 2.75 6.87666 2.75 9.5C2.75 11.9619 4.21678 14.4067 6.22043 16.4302C8.12163 18.3502 10.391 19.7727 12 20.3682C13.609 19.7727 15.8784 18.3502 17.7796 16.4302C19.7832 14.4067 21.25 11.9619 21.25 9.5C21.25 6.87666 19.1233 4.75 16.5 4.75C14.8941 4.75 13.4741 5.54621 12.6132 6.76872C12.4727 6.96821 12.244 7.0869 12 7.0869C11.756 7.0869 11.5273 6.96821 11.3868 6.76872C10.5259 5.54621 9.10588 4.75 7.5 4.75Z"
                fill="#FF2D55"
              />
            </svg>
            <label>좋아요 모임</label>
          </Btn>
        </BtnDiv>
        <AllBtn onClick={() => navigate("/mymeets", { state: "myHostMeet" })}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L8.03033 6.46967C8.32322 6.76256 8.32322 7.23744 8.03033 7.53033L2.03033 13.5303C1.73744 13.8232 1.26256 13.8232 0.96967 13.5303C0.676777 13.2374 0.676777 12.7626 0.96967 12.4697L6.43934 7L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z"
              fill="#1C1B1F"
            />
          </svg>
        </AllBtn>
      </SelectDiv>
      <LogoutDiv>
        <button onClick={handleLogout}>로그아웃</button>
      </LogoutDiv>
    </>
  );
};

export default Mypage;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  div {
    margin-right: 1.25rem;
    display: flex;
    flex-direction: column;
  }
`;
const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImgDiv = styled.div`
  position: relative;
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 4rem;
  }
  button {
    position: absolute;
    border-radius: 1rem;
    right: 0;
    bottom: 0;
  }
  input {
    display: none;
  }
`;

const Nickname = styled.span`
  font-size: 1.3125rem;
  font-weight: 600;
`;

const Email = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: #8e8e93;
`;

const SelectDiv = styled.div`
  position: relative;
  margin-top: 1.5rem;
  h1 {
    font-size: 1.3125rem;
    font-weight: 600;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const Btn = styled.button`
  border: 0.0625rem solid #e5e5ea;
  border-radius: 0.625rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.91625rem 1rem;
  svg {
    margin-bottom: 0.7656rem;
  }
  label {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const AllBtn = styled.div`
  position: absolute;
  border-radius: 1rem;
  right: 0.484375rem;
  cursor: pointer;
  top: 0;
`;

const LogoutDiv = styled.div`
  button {
    font-size: 0.9375rem;
    font-weight: 600;
    text-align: center;
    color: #8e8e93;
    margin-top: 2.125rem;
    margin-bottom: 2.125rem;
  }
`;
