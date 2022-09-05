import styled from "styled-components";

const MapSearch = () => {
  return (
    <>
      <SearchBox>
        <div>
          <span class="material-symbols-outlined">search</span>
        </div>
        <div>
          <input></input>
        </div>
      </SearchBox>
    </>
  );
};

export default MapSearch;

const SearchBox = styled.div`
  position: fixed;
  z-index: 999;
  top: 150px;
  left: 0;
`;
