import styled from "styled-components";
import { thunderposts } from "../shared/data";
import Meet from '../components/Meet';


const MyMeets=()=>{

    return (
        <>
        <BtnDiv>
                <Btn>
                    <label>참석 모임</label>
                </Btn>
                <Btn>
                    <label>주최 모임</label>
                </Btn>
                <Btn>
                    <label>좋아요 모임</label>
                </Btn>
        </BtnDiv>

        <MeetAllContainer>
            {thunderposts.map((meet) => (
                <Meet key={meet.thunderpostId} meet={meet} />
            ))}
            {/* {isFetchingNextPage ? <Loading/> : <div ref={ref}></div>} */}
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
    border: 1px solid #000000;
    padding: 0.725rem 1.708125rem;
    &:hover{
        color: white;
        background-color: black;
  }
`


const MeetAllContainer = styled.div`
  padding: 10px 0;
`;