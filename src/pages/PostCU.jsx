import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postApi } from "../shared/api";
import ToastEditor from "../components/ToastEditor";


import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const PostCU = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = useParams().postId;
  const nickname = localStorage.getItem("nickname");
  const [imgSrc, setImgSrc] = useState("");
  const [check, setCheck] = useState({ airgun: "", shower: "", shop: "", park: "" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  //FIXME: try catch

  useEffect(() => {
    if (postId) {
      const setPost = async () => {
        const postInfo = await postApi.getPost(`${postId}`);
        if (postInfo.data.nickname !== nickname) {
          alert("수정 권한이 없습니다.");
          navigate(-1);
          return;
        }


        //FIXME: 구조분해 할당 
        // const {title,area,createAt,content} = data;
        // const dataSet = {"title":title}
        const data = postInfo;
        console.log(data)
        setValue("title", data.data.title);
        setValue("area", data.data.area);
        setValue("address", data.data.address);
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
        ...check,
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
      address: formData.address,
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
      <BackDiv>
        <button onClick={()=>(navigate('-1'))}>
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.03033 13.5303C7.73744 13.8232 7.26256 13.8232 6.96967 13.5303L0.96967 7.53033C0.676777 7.23744 0.676777 6.76256 0.96967 6.46967L6.96967 0.46967C7.26256 0.176777 7.73744 0.176777 8.03033 0.46967C8.32322 0.762563 8.32322 1.23744 8.03033 1.53033L2.56066 7L8.03033 12.4697C8.32322 12.7626 8.32322 13.2374 8.03033 13.5303Z" fill="#1C1B1F" />
          </svg>
        </button>
        <p>포스트</p>
      </BackDiv>
      <PostForm onSubmit={handleSubmit(onSubmitPost)}>
        {/* <h2>게시글 {postId ? "수정" : "작성"}</h2> */}

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
          <label>위치정보</label>
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
          <input
            type="text"
            placeholder="상세주소를 입력해 주세요"
            autoComplete="off"
            {...register("address", {
              required: true,
            })}
          />
        </Element>

        <Element>
          <label>어메니티</label>
          <SelectAmenity>
            <input type="checkbox" id="checkboxOne" name="amenity" value="airgun" onChange={amenityCheck} /> <label htmlFor="checkboxOne">에어건</label>
            <input type="checkbox" id="checkboxTwo" name="amenity" value="shower" onChange={amenityCheck} /> <label htmlFor="checkboxTwo">샤워부스</label>
            <input type="checkbox" id="checkboxThree" name="amenity" value="shop" onChange={amenityCheck} /> <label htmlFor="checkboxThree">서핑샵</label>
            <input type="checkbox" id="checkboxFour" name="amenity" value="park" onChange={amenityCheck} /> <label htmlFor="checkboxFour">주차장</label>
          </SelectAmenity>
        </Element>
        <Toastdiv>
          <ToastEditor
            {...register("content", {
              required: true,
            })} />
        </Toastdiv>

        <button type="submit" disabled={!isValid}>
          게시글 {postId ? "수정" : "등록"} 완료
        </button>
      </PostForm>
    </>
  )
}


export default PostCU;

const BackDiv = styled.div`
  display: flex;
  height: 3.25rem;
  width: 100vw;
  padding: 1rem, 1rem, 0.75rem, 0.375rem;
  border: 0.0625rem solid #E5E5EA;
  font-size: 1.25rem;
  line-height: 1.491875rem;
  button{
    background-color: transparent;
    display: flex;
    border: 0;
    font-size: 1.25rem;
    svg{
      padding: 1.5rem 0rem;
    }
  }
`

const PostForm = styled.div`
  display: flex;
  flex-direction: column;
`

const Element = styled.div`
  display: block;
  text-align: left;
  flex-direction: column;
  display: flex;
  justify-content: left;
  margin-left: 1rem;
`

const ImageLabel = styled.label`

`

const SelectAmenity = styled.div`

`

const Toastdiv = styled.div`
    background-color: aliceblue;
    width: 100vw;
`