import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";


const Post = ({ data }) => {
    const regex = /(http(s))?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/; //url
        
    return (
        <>
            <PostInfoBox>
                <ImageBox>
                {data.thumbnailUrl && regex.test(data.thumbnailUrl) ? (
                    <img src={data.thumbnailUrl} alt="thumbnailimage" />
                ) : (
                    <img src="/logo.png" alt="thumbnailimage" />
                )}
                </ImageBox>
                <PostInfo>
                    <h2>{data.title}</h2>
                    <h3>
                        {data.nickname}
                    </h3>   
                    <span>`{data.amenity}`</span>
                </PostInfo>
            </PostInfoBox>

            <LikeCountBox>
                {data.likeCount > 0 ? (
                    <>
                        <AiOutlineHeart />
                        <p>{data.likeCount}</p>
                    </>
                ) : <AiOutlineHeart />}
            </LikeCountBox>
        </>
    )

}


export default Post;


const PostInfoBox = styled.div`
    
`

const ImageBox = styled.div`
    height: 100%;

`

const PostInfo = styled.div`
    
`

const LikeCountBox = styled.div`
    
`
