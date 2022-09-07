import React, { useState, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { InView, useInView } from "react-intersection-observer";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { myApi } from "../shared/api";
import { queryKeys } from "../react-query/constants";
import Loading from '../layout/Loading';
import Post from "../components/Post";


const MyPosts = () => {
    const navigate = useNavigate();
    const { ref, inView } = useInView();
    const location = useLocation();
    const [filter, setFilter] = useState(location.state);
    

    const getMyPosts = async (pageParam=0, filter) => {
        try {
            const res = await myApi.getMyPosts(filter, pageParam)
            console.log(res, "데이터 형식확인")
            const data = res.data.content
            const last = res.data.last
            return { data, nextPage: pageParam + 1, last };
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        [queryKeys.myPostsList, filter],
        ({ pageParam = 0 }) => getMyPosts(pageParam, filter),
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

    

    const onClickFilter = (data) => {
        setFilter(data);
    };


    return (
        <>
            <BtnDiv>
                <Btn
                    onClick={() => {
                        onClickFilter("myWritePost");
                    }}
                >
                    <label>작성 피드</label>
                </Btn>
                <Btn
                    onClick={() => {
                        onClickFilter("myLikePost");
                    }}
                >
                    <label>좋아요 피드</label>
                </Btn>
            </BtnDiv>

            <PostsDiv>
                {data &&
                    data.pages.map((page, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                {page.data.map((post) => (
                                    <div
                                        key={post.postId}
                                        style={{ cursor: "poiner" }}
                                        onClick={() => {
                                            navigate(`posts/${post.postId}`)
                                        }}>
                                        <Post data={post} />
                                    </div>
                                ))}
                            </React.Fragment>
                        )
                    })}
                {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
            </PostsDiv>

        </>

    )
}

export default MyPosts;



const BtnDiv = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  margin: 0.625rem auto;
  flex-wrap: wrap;
  ;
`

const Btn = styled.button`
    border-radius: 2.875rem;
    font-size: 0.875rem;
    font-weight: 600;
    border: 0.0625rem solid #000000;
    padding: 0.325rem 2.9rem ;
    
    &:hover{
        color: white;
        background-color: black;
  }
`

const PostsDiv = styled.div`
    margin-top: 0.625rem;
    columns: 2;
    column-gap: 1rem;    
    /* display: flex; */
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 0.625rem;
    div{
        display: inline-block;
    }
`

