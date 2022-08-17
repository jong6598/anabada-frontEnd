import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";

const PostBox = ({ data }) => {
    const regex = /(http(s))?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;
    const postArea = useSelector((state) => state.area);

    
    return (
        <>
            <PostInfoBox>
                <ImageBox>
                {data.thumbnailUrl && regex.test(data.thumbnailUrl) ? (
                    <img src={data.thumbnailUrl} alt="thumbnailimage" />
                ) : (
                    <img src="/image/logo.png" alt="thumbnailimage" />
                )}
                </ImageBox>
                <PostInfo>
                    <h2>{data.title}</h2>
                    {/* <h3>
                        {postArea[data.area]} · {data.creatAt}
                    </h3> */}
                    <h3>{data.amenity}</h3>
                </PostInfo>
            </PostInfoBox>

            <LikeCountBox>
                {data.likeCount > 0 ? (
                    <>
                        <AiOutlineHeart />
                        <p>{data.likeCount}</p>
                    </>
                ) : null}
            </LikeCountBox>
        </>
    )

}


export default Post;


const PostInfoBox = styled.div`
    
`

const ImageBox = styled.div`
    

`

const PostInfo = styled.div`
    
`

const LikeCountBox = styled.div`
    
`
