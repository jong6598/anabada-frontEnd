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
].sort();

const MapSearch = ({ setLatlng }) => {
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const [inputName, setInputName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  /**
   * 검색 버튼 눌렀을 때, 해당 해수욕장 위치를 지도 가운데로 가져오고 확대해주기 아마도 부모 컴포넌트에서 state 만들어서 받아와야 할 듯
   * @param {Event} event
   */
  const handleOnSubmit = (event) => {
    event.preventDefault();
    return setLatlng(inputName);
  };

  /**
   * ul의 li를 클릭했을 때 밑에 ul 없어지면서 input 값 그걸로 바뀌게 하기
   * @param {Event} event
   */
  const handleOnclickList = (event) => {
    setInputName(event.target.innerText);
    return setSearchResult([]);
  };

  /**
   * debouncing function으로부터 Input value를 이어받아서 이름이 일치하는 해수욕장을 검색해주기
   * @param {String} searchValue
   * @returns
   */
  const searchBeach = (searchValue) => {
    console.log("test");
    setSearchResult([]);
    if (searchValue === "") return;

    const resultArr = beachname.filter((el) => el.startsWith(searchValue));
    return setSearchResult(resultArr);
  };

  /**
   * debouncing을 해서 setState이 과도하게 일어나지 않도록 하기
   * @param {String} searchValue
   */
  const handleDebouce = (searchValue) => {
    // timeout이 있으면,
    if (debounceRef.current || debounceRef.current === null) {
      // 기존의 이벤트를 해제하고 새로운 setTimeout 지정
      clearTimeout(debounceRef.current);
      return (debounceRef.current = setTimeout(
        () => searchBeach(searchValue),
        1000
      ));
    }
  };

  /**
   * 입력을 할 때 debounce함수를 이용해서 일정 시간 마다 검색 결과를 setState해서 list태그에 map 메소드로 브라우저에 표현해주기
   * @param {Event} event
   * @returns
   */
  const handleOnChange = (event) => {
    handleDebouce(event.target.value);
    return setInputName(event.target.value);
  };

  useEffect(() => {
    return () => {
      // unmount 시에 타임아웃 남아있으면 clear해주기
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <>
      <SearchForm autoComplete="off">
        <SearchWrapper>
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            className="search__input"
            placeholder="해수욕장 이름을 검색해주세요."
            ref={inputRef}
            onChange={handleOnChange}
            value={inputName}
          ></input>
          <button
            type="submit"
            className="search__btn"
            onClick={handleOnSubmit}
          >
            검색
          </button>
        </SearchWrapper>
        <SearchResultWrapper>
          {searchResult.map((el) => (
            <SearchResultLi key={el} onClick={handleOnclickList}>
              {el}
            </SearchResultLi>
          ))}
        </SearchResultWrapper>
      </SearchForm>
    </>
  );
};

export default MapSearch;

const SearchForm = styled.form`
  z-index: 999;
  top: 150px;
  width: 25rem;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  &:focus-within {
    width: 30rem;
  }
`;

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 3.5rem;
  margin: 0 auto;

  &:focus-within button {
    background-color: #007aff;
  }
  &:focus-within span {
    opacity: 1;
  }

  span {
    position: absolute;
    left: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 2rem;

    opacity: 0;
    z-index: 1;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;

    background-color: #2b91ff;
    width: 4rem;
    height: 100%;

    border-radius: 10px;
    margin-left: 0;

    opacity: 1;
    z-index: 1;

    font-size: 1rem;

    &:active {
      background-color: #7cbbff;
    }
  }

  input {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    padding-left: 3rem;
    margin: 0 auto;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const SearchResultWrapper = styled.ul`
  margin: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
`;

const SearchResultLi = styled.li`
  height: 3.375;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1.25rem 0.8rem;
  margin-bottom: 1px;

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0.3px;

  transition: all 0.3s ease;

  font-size: 1rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0.6px;
  }
`;
