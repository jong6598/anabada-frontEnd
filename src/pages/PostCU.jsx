import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postApi } from "../shared/api";

// import { storage } from "../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = useParams().postId;
  const nickname = localStorage.getItem("nickname");
  const [imgSrc, setImgSrc] = useState("");
  const [check, setCheck] = useState({ airgun: "", shower: "", shop: "" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (postId) {
      const setPost = async () => {
        try {
          const postInfo = await postApi.getPost(`${postId}`);
          if (postInfo.data.nickname !== nickname) {
            alert("수정 권한이 없습니다.");
            navigate(-1);
            return;
          }
        } catch (err){
          console.log(err)
        }
        

        const data = postInfo;
        console.log(data)
        setValue("title", data.data.title);
        setValue("area", data.data.area);
        setValue("creatAt", data.data.createAt);
        setValue("content", data.data.content);
        setValue("amenity", data.data.amenity);
        setImgSrc(data.data.thumbnailUrl);
      };
      setPost();
    }
  }, []);


  //usemutation을 사용해서 수정, 삭제, 작성 해야함
  //useRef를 사용해서 이미지(랜더링 되도 값이 초기화되지 않음.)


  const previewImage = () => {

  }

  const amenityCheck = (e) => {
    if (e.target.checked) {
      setCheck({
        ...state,
        [e.target.value]: e.target.value
      });
    }
  }



  const onSubmitPost = async (formData) => {
    let thumbnailUrl;

    if (formData.postImg.length > 0) {
      const uploaded_file = await uploadBytes(
        ref(storage, `images/${formData.postImg[0].name}`),
        formData.postImg[0],
      )
      thumbnailUrl = await getDownloadURL(uploaded_file.ref);
    } else if (postId) {
      thumbnailUrl = imgSrc;
    }

    const amenity = `${check.airgun}, ${check.shower}, ${check.shop}`


    const newPost = {
      title: formData.title,
      area: formData.area,
      content: formData.content,
      amenity,
      thumbnailUrl,
    };
    console.log("새 게시글", newPost);


    if (!postId) {
      try {
        const post = postApi.post("api/post", newPost);
        console.log(post);
        alert("게시글이 등록되었습니다!");
        navigate("/home");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    } else {
      try {
        const update = postApi.put(`/api/post/${postApi}`, newPost);
        console.log(update)
        alert("게시글이 수정되었습니다!")
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };


  return (
    <>
      <PostForm onSubmit={handleSubmit(onSubmitPost)}>
        <h2>게시글 {postId ? "수정" : "작성"}</h2>

        <Element>
          <label>제목</label>
          <input
            type="text"
            placeholder="제목을 입력해 주세요"
            autoComplete="off"
            {...register("title", {
              required: true,
            })}
          />
        </Element>

        <Element>
          <label>썸네일</label>
          <input
            type="file"
            accept="image/*"
            {...register("postImg", {
              onChange: (e) => previewImage(e)
            })}
          />
        </Element>
        {/* <ImageLabel>
                  {이미지가 있으면? <img/>:<기본이미지/>}
            </ImageLabel>  */}

        <Element>
          <label>지역</label>
          <select
            name="area"
            id="area"
            {...register("area", {
              required: true,
            })}
          >
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
        </Element>

        <Element>
          <label>어메니티</label>
          <SelectAmenity>
            {/* 체크시 value 값이 반영되도록 */}
            <input type="checkbox" name="amenity" value="airgun" onChange={amenityCheck} /> 에어건
            <input type="checkbox" name="amenity" value="shower" onChange={amenityCheck} /> 샤워부스
            <input type="checkbox" name="amenity" value="shop" onChange={amenityCheck} /> 서핑샵
          </SelectAmenity>
        </Element>

        <Element>
          <label>내용</label>
          <input></input>
          //TODO: toast ui를 사용하기
        </Element>
        <button type="submit" disabled={!isValid}>
          게시글 {postId ? "수정" : "등록"} 완료
        </button>
      </PostForm>
    </>
  )
}


export default PostCU;


const PostForm = styled.div`

`

const Element = styled.div`
  display: block;
  justify-content: center;
`

const ImageLabel = styled.label`

`

const SelectAmenity = styled.div`

`