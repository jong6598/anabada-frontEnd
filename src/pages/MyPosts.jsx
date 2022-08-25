import styled from "styled-components";


const MyPosts=()=>{

    return (
        <BtnDiv>
            <Btn>
                <label>작성 피드</label>
            </Btn>
            <Btn>
                <label>좋아요 피드</label>
            </Btn>
        </BtnDiv>
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