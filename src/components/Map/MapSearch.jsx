import { useState } from "react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const beachname = [
  "38해변",
  "가진리 해수욕장",
  "강문 해수욕장",
  "갯마을 해수욕장",
  "격포 해수욕장",
  "곽지과물 해수욕장",
  "광안리 해수욕장",
  "광진리 해수욕장",
  "교암리 해수욕장",
  "구름포 해수욕장",
  "금능으뜸원 해수욕장",
  "금진 해수욕장",
  "남애3리 해수욕장",
  "남열해돋이 해수욕장",
  "다대포 해수욕장",
  "동산 해수욕장",
  "등대 해수욕장",
  "만리포 해수욕장",
  "망상 해수욕장",
  "물치 해수욕장",
  "백도 해수욕장",
  "봉수대 해수욕장",
  "봉포 해수욕장",
  "북분리 해수욕장",
  "사계해안",
  "사근진 해수욕장",
  "사천 해수욕장",
  "사천진 해수욕장",
  "사촌 해수욕장",
  "삼양검은모래 해수욕장",
  "삼포 해수욕장",
  "설악 해수욕장",
  "속초 해수욕장",
  "송정 해수욕장",
  "송지호 해수욕장",
  "순긋 해수욕장",
  "신양섭지코지 해수욕장",
  "아야진 해수욕장",
  "어달 해수욕장",
  "연곡 해수욕장",
  "옥계 해수욕장",
  "외옹치 해수욕장",
  "원포리 해수욕장",
  "월정리해변",
  "월포 해수욕장",
  "의항 해수욕장",
  "이호테우 해수욕장",
  "인구 해수욕장",
  "자작도 해수욕장",
  "장사 해수욕장",
  "정암 해수욕장",
  "종달 해수욕장",
  "주문진 해수욕장",
  "죽도 해수욕장",
  "중문 해수욕장",
  "진하 해수욕장",
  "천리포 해수욕장",
  "천진 해수욕장",
  "청간 해수욕장",
  "표선해비치",
  "하도 해수욕장",
  "하조대 해수욕장",
  "한담해변",
  "함덕서우봉 해수욕장",
  "함목 해수욕장",
  "해운대 해수욕장",
  "협재 해수욕장",
  "흥남 해수욕장",
];

const MapSearch = ({ setPicker, data }) => {
  const inputRef = useRef();
  const [inputName, setInputName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { alertHandler } = useOutletContext();

  /**
   * 검색 버튼 눌렀을 때, 해당 해수욕장 위치를 지도 가운데로 가져오고 확대해주기 아마도 부모 컴포넌트에서 state 만들어서 받아와야 할 듯
   * @param {Event} event
   */
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // 검색 창이 비었을 때 ""
    if (inputName === "") {
      return alertHandler("해변을 입력해주세요!");
    }

    // 일부만 입력했을 때 "해운대" || 검색결과가 없을 때 "대운해"
    if (!beachname.includes(inputName)) {
      // 검색 결과도 없으면 custom alert를 띄워주기
      if (searchResult.length === 0) {
        return alertHandler("일치하는 해변이 없습니다!");
      }
      // 완전히 일치하는 해변이 없으면 searchResult의 가장 첫 번째로 검색
      const result = data.data.find((el) => el.beachName === searchResult[0]);
      setInputName(searchResult[0]);
      setPicker((prev) => {
        return { ...prev, ...result };
      });
      return setSearchResult([]);
    }
    // "해운대 해수욕장"
    const result = data.data.find((el) => el.beachName === inputName);
    setPicker((prev) => {
      return { ...prev, ...result };
    });
    return setSearchResult([]);
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
   * 이름이 일치하는 해수욕장을 검색해서 미리 보기 보여주기
   * @param {String} searchValue
   * @returns
   */
  const searchBeach = (searchValue) => {
    setSearchResult([]);
    if (searchValue === "") return;

    const resultArr = beachname.filter((el) => el.startsWith(searchValue));
    return setSearchResult(resultArr);
  };

  /**
   * 입력을 할 때 debounce함수를 이용해서 일정 시간 마다 검색 결과를 setState해서 list태그에 map 메소드로 브라우저에 표현해주기
   * @param {Event} event
   * @returns
   */
  const handleOnChange = (event) => {
    searchBeach(event.target.value);
    return setInputName(event.target.value);
  };

  return (
    <>
      <SearchForm autoComplete="off">
        <SearchWrapper>
          <input
            type="text"
            className="search__input"
            placeholder="해수욕장 이름을 검색해주세요."
            onChange={handleOnChange}
            ref={inputRef}
            value={inputName}
          ></input>
          <button
            type="submit"
            className="search__btn"
            onClick={handleOnSubmit}
          >
            <BsSearch />
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

const SearchForm = styled.div`
  z-index: 999;
  top: 130px;
  width: 28rem;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  @media screen and (max-width: 700px) {
    width: 20rem;
  }
`;

const SearchWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  /* height: 2.5rem; */
  margin: 0 auto;
  background-color: white;
  border-radius: 14px;

  font-size: 1.5rem;
  /* padding: 0 0.5rem; */
  @media screen and (max-width: 700px) {
    /* height: 2.5rem; */
  }

  button {
    background-color: #3797ff;
    color: white;
    padding: 0.7rem 0.7rem;
    border-radius: 0 14px 14px 0;
    svg {
      font-size: 1.5rem;
    }
    &:active {
      background-color: #7cbbff;
    }
  }

  input {
    border-radius: 14px;
    height: 100%;
    flex: 1;
    /* border-radius: 10px; */
    padding: 0.7rem 1rem;
    margin: 0 auto;
    font-size: 1.1rem;
    &:focus {
      outline: none;
    }
  }
`;

const SearchResultWrapper = styled.ul`
  margin: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
`;

const SearchResultLi = styled.li`
  /* height: 3.375; */
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1.25rem 0.8rem;
  margin-bottom: 1px;
  @media screen and (max-width: 700px) {
    height: 2.7rem;
    padding: 0;
    display: flex;
    align-items: center;
    padding-left: 1.25rem;
  }

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0.3px;

  transition: all 0.3s ease;

  font-size: 1rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #edf3fd;

    box-shadow: rgba(0, 0, 0, 0.5) 0px 0.6px;
  }
`;
