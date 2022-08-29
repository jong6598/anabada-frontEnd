import styled from "styled-components";
import { thunderposts } from "../shared/data";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Meet from '../components/Meet';
import { InView, useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { myApi } from "../shared/api";
import { queryKeys } from "../react-query/constants";
import Loading from '../layout/Loading';


const MyMeets=()=>{
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { ref, inView } = useInView();
    const [filter, setFilter] = useState("myHostMeet");


    const getMyMeets = async (pageParam) => {
        try {
            const res = await myApi.getMyMeets(filter, pageParam)
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
        [queryKeys.myMeetsList],
        ({ pageParam = 0 }) => getMyMeets(pageParam),
        {
            getNextPageParam: (lastPage) =>
                !lastPage.last ? lastPage.nextPage : undefined,
        }
    );




    useEffect(() => {
        queryClient.invalidateQueries([queryKeys.myMeetsList])
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