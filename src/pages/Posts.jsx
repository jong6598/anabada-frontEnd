import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Post from "../components/Post";
import { postApi } from "../shared/api";
import { useQuery } from "@tanstack/react-query";


const Posts = () => {
  const navigate = useNavigate();
  const area_ref = useRef();
  const [areaSelected, setAreaSelected] = useState("ALL");


  const getPosts = async (pageParam = 0) => {
    try {
      const res = await postApi.getPosts(pageParam, areaSelected)
      return res;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }


  const { data, isError, isLoading } = useQuery("posts", getPosts);


  const handleArea = () => {
    setAreaSelected(area_ref.current.value);
  };

  useEffect(() => {
    // refetch();
  }, [areaSelected]);

  return (
    <>
      <Areabar>
        <select onChange={handleArea} ref={area_ref}>
          <option value="ALL">전국</option>
          <option value="GYEONGGI">서울, 경기, 인천</option>
          <option value="GANGWON">강원</option>
          <option value="GYEONBUK">대구, 경북</option>
          <option value="GYEONGNAM">부산, 울산, 경남 </option>
          <option value="JEONBUK">전북</option>
          <option value="JEONNAM">광주, 전남</option>
          <option value="CHUNGBUK">충북</option>
          <option value="CHUNGNAM">충남</option>
          <option value="JEJU">제주</option>
        </select>
      </Areabar>

      <Post />
      {/* <Post data={post}/> */}
    </>
  )

}


export default Posts;

const Areabar = styled.div`
  
`
