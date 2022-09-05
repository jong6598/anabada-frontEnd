import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const beachname = [
  "사계해안",
  "한담해변",
  "월정리해변",
  "구름포 해수욕장",
  "천리포 해수욕장",
  "의항 해수욕장",
  "만리포 해수욕장",
  "격포 해수욕장",
  "남열해돋이 해수욕장",
  "강문 해수욕장",
  "사근진 해수욕장",
  "순긋 해수욕장",
  "주문진 해수욕장",
  "금진 해수욕장",
  "사천 해수욕장",
  "연곡 해수욕장",
  "어달 해수욕장",
  "망상 해수욕장",
  "등대 해수욕장",
  "속초 해수욕장",
  "외옹치 해수욕장",
  "송지호 해수욕장",
  "봉수대 해수욕장",
  "가진리 해수욕장",
  "삼포 해수욕장",
  "백도 해수욕장",
  "자작도 해수욕장",
  "천진 해수욕장",
  "청간 해수욕장",
  "아야진 해수욕장",
  "교암리 해수욕장",
  "봉포 해수욕장",
  "하조대 해수욕장",
  "죽도 해수욕장",
  "갯마을 해수욕장",
  "인구 해수욕장",
  "동산 해수욕장",
  "광진리 해수욕장",
  "원포리 해수욕장",
  "남애3리 해수욕장",
  "물치 해수욕장",
  "정암 해수욕장",
  "설악 해수욕장",
  "사천진 해수욕장",
  "월포 해수욕장",
  "장사 해수욕장",
  "해운대 해수욕장",
  "송정 해수욕장",
  "광안리 해수욕장",
  "다대포 해수욕장",
  "진하 해수욕장",
  "흥남 해수욕장",
  "함목 해수욕장",
  "사촌 해수욕장",
  "표선해비치",
  "신양섭지코지 해수욕장",
  "곽지과물 해수욕장",
  "협재 해수욕장",
  "중문 해수욕장",
  "이호테우 해수욕장",
  "삼양검은모래 해수욕장",
  "함덕서우봉 해수욕장",
  "금능으뜸원 해수욕장",
  "하도 해수욕장",
  "종달 해수욕장",
  "옥계 해수욕장",
  "북분리 해수욕장",
  "38해변",
];

const MapSearch = () => {
  const inputRef = useRef(null);
  const [inputName, setInputName] = useState("");
  const debounceRef = useRef(null);

  const handleOnSubmit = () => {};

  const searchBeach = (searchValue) => {
    const length = searchBeach.length;
    const test = beachname.find(el=>);
    console.log(test);
    return (debounceRef.current = null);
  };

  const handleDebouce = (searchValue) => {
    // timeout이 있으면
    if (debounceRef.current || debounceRef.current === null) {
      // 기존의 이벤트를 해제하고 새로운 setTimeout 지정
      clearTimeout(debounceRef.current);
      setTimeout(() => searchBeach(searchValue), 1000);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log("handleOnChange ::: ", e.target.value);
    handleDebouce(e.target.value);
    return setInputName(e.target.value);
  };

  useEffect(() => {
    return () => {
      // unmount 시에 타임아웃 남아있으면 clear해주기
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <>
      <SearchBox>
        <SearchWrapper onSubmit={handleOnSubmit}>
          <span class="material-symbols-outlined">search</span>

          <input
            type="text"
            className="search__input"
            placeholder="해수욕장 이름을 검색해주세요."
            ref={inputRef}
            onChange={handleOnChange}
            value={inputName}
          ></input>

          <button type="submit" className="search__btn">
            검색
          </button>
        </SearchWrapper>
      </SearchBox>
    </>
  );
};

export default MapSearch;

const SearchBox = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;

  z-index: 999;
  width: 70vw;
  top: 150px;
`;

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  span,
  input,
  button {
    transition: all 0.3s ease-in-out;
  }

  &:focus-within span,
  &:focus-within button {
    opacity: 1;
  }

  &:focus-within span,
  &:focus-within button,
  &:focus-within input {
    transform: translateX(0);
  }
  &:focus-within input {
    width: 100%;
  }

  span {
    position: absolute;
    left: 0.2rem;
    display: flex;
    align-items: center;

    opacity: 0;
    z-index: 1;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;

    background-color: #007aff;
    width: 4rem;
    height: 2rem;

    border-radius: 10px;
    margin-left: 0;

    opacity: 0;
    z-index: 1;
  }

  input {
    height: 2rem;
    width: 80%;
    border-radius: 10px;
    padding-left: 2rem;
    transform: translateX(7vw);
    &:focus {
      outline: none;
    }
  }
`;
