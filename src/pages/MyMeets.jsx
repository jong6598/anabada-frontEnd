import styled from "styled-components";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import Meet from '../components/Meet';
import { InView, useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { myApi } from "../shared/api";
import { queryKeys } from "../react-query/constants";
import Loading from '../layout/Loading';


const MyMeets=()=>{
    const { ref, inView } = useInView();
    const location = useLocation();
    const [filter, setFilter] = useState(location.state);

    
    const getMyMeets = async (pageParam=0, filter) => {
        console.log(filter, "함수 안 필터")
        try {
            const res = await myApi.getMyMeets(filter, pageParam)
            console.log(res);
            const data = res.data.content
            const last = res.data.last
            return {data, nextPage: pageParam + 1, last};
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        [queryKeys.myMeetsList,filter],
        ({ pageParam = 0 }) => getMyMeets(pageParam, filter),
        {
            getNextPageParam: (lastPage) =>
                !lastPage.last ? lastPage.nextPage : undefined,
        }
    );

    console.log(filter, "필터 확인하기")

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
                onClick={()=>{
                    onClickFilter("myHostMeet");
                }}
                >
                    <label>주최 모임</label>
                </Btn>
                <Btn
                onClick={()=>{
                    onClickFilter("myJoinMeet");
                }}
                >
                    <label>참석 모임</label>
                </Btn>
                <Btn
                onClick={()=>{
                    onClickFilter("myLikeMeet");
                }}
                >
                    <label>좋아요 모임</label>
                </Btn>
        </BtnDiv>

        <MeetAllContainer>
            {data&&
            data.pages.map((page) => { 
                 return page.data.map((meet) => (
                    <Meet key={meet.thunderpostId} meet={meet} />
                ))
            })}               
            {isFetchingNextPage ? <Loading/> : <div ref={ref}></div>}
        </MeetAllContainer>
    </>
    )
}

export default MyMeets;


const BtnDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1.1fr;
    column-gap: 0.5rem;
    margin-bottom: 0.625rem;
`

const Btn = styled.button`
    border-radius: 2.875rem;
    font-size: 0.8rem;
    font-weight: 600;
    border: 0.0625rem solid #000000;
    padding: 0.725rem 1.708125rem;
    &:hover{
        color: white;
        background-color: black;
  }
`


const MeetAllContainer = styled.div`
  padding: 0.625rem 0;
`;