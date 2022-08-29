import React, { useState, useEffect } from "react";
import { refType } from "@mui/utils";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { InView, useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { myApi } from "../shared/api";
import { queryKeys } from "../react-query/constants";
import Loading from '../layout/Loading';
import Post from "../components/Post";


const MyPosts = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { ref, inView } = useInView();
    const [filter, setFilter] = useState("myWritePost");


    const getMyPosts = async (pageParam) => {
        try {
            const res = await myApi.getMyPosts(filter, pageParam)
            console.log(res);
            //FIXME: data 값과 last 값 콘솔 값 보고 고쳐서 할당하기
            const data = res
            const last = res
            // return {data, nextPage: pageParam + 1, last};
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        [queryKeys.myPostsList],
        ({ pageParam = 0 }) => getMyPosts(pageParam),
        {
            getNextPageParam: (lastPage) =>
                !lastPage.last ? lastPage.nextPage : undefined,
        }
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);


    useEffect(() => {
        queryClient.invalidateQueries([queryKeys.myPostsList])
    }, [filter]);

    

    const onClickFilter = (data) => {
        setFilter(data);
        console.log(data);
      };


    return (
        <>
            <BtnDiv>
                <Btn
                onClick={()=>{
                    onClickFilter("myWritePost");
                }}
                >
                    <label>작성 피드</label>
                </Btn>
                <Btn
                onClick={()=>{
                    onClickFilter("myLikePost");
                }}
                >
                    <label>좋아요 피드</label>
                </Btn>
            </BtnDiv>

            <PostsDiv>
                {data&&
                data.pages.map((page,idx)=>{
                    return(
                        <React.Fragment key={idx}>
                        {page.data.map((post)=>(
                            <div
                            key={post.postId}
                            style={{cursor:"poiner"}}
                            onClick={()=>{
                                navigate(`posts/${post.postId}`)
                            }}>
                                <Post data={post}/>
                            </div>
                        ))}
                        </React.Fragment>
                    )
                })}
                {isFetchingNextPage ? <Loading/> : <div ref={ref}></div>}
            </PostsDiv>

        </>

    )
}

export default MyPosts;



const BtnDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    column-gap: 0.5rem;
    margin-bottom: 0.625rem;
`

const Btn = styled.button`
    border-radius: 2.875rem;
    font-size: 0.875rem;
    font-weight: 600;
    border: 0.0625rem solid #000000;
    padding: 0.625rem 3.171875rem ;
    &:hover{
        color: white;
        background-color: black;
  }
`

const PostsDiv = styled.div`
    margin-top: 0.625rem;
    display: grid;
    /* display: flex; */
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 0.625rem;
    div{
        display: inline-block;
    }
`

