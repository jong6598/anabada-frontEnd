import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postApi } from "../shared/api";
import { useSelector } from "react-redux";


import { HiOutlinePhotograph } from "react-icons/hi";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


const PostCU = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = useParams().postId;
  const nickname = useSelector((state)=>state.auth.nickname)
  const [imgSrc, setImgSrc] = useState("");
  const [check, setCheck] = useState({ airgun: "", shower: "", shop: "", park: "" });
  
  const [content,setContent]=useState("")
  const editorRef = useRef();

  

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  //FIXME: try catch

  useEffect(() => {
    if (postId) {
      const setPost = async () => {
        const postInfo = await postApi.getPost(`${postId}`);
        console.log(postInfo)

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


  //usemutation을 사용해서 수정, 작성 해야함
  //useRef를 사용해서 이미지(랜더링 되도 값이 초기화되지 않음.)


  const previewImage = async (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  console.log(watch())

  const amenityCheck = (e) => {
    if (e.target.checked) {
      setCheck({
        ...check,
        [e.target.value]: e.target.value
      });
    }
  }

  const amenity = `${check.airgun}, ${check.shower}, ${check.shop}, ${check.park}`
  // console.log(amenity)

  const onSubmitPost = async (formData)=> {
    console.log(amenity)

    let thumbnailUrl;

    if (formData.postImg.length > 0) {
      const uploaded_file = await uploadBytes(
        ref(storage, `images/${formData.postImg[0].name}`),
        formData.postImg[0],
      )
      thumbnailUrl = await getDownloadURL(uploaded_file.ref);
    } else if (postId) {
      thumbnailUrl = imgSrc;
    } else {
      thumbnailUrl = '';
    }

    

    const newPost = {
      title: formData.title,
      area: formData.area,
      address: formData.address,
      content: content,
      amenity: amenity,
      thumbnailUrl: thumbnailUrl,
    };
    console.log("새 게시글", newPost);

    
    if (!postId) {
      try {
        const post = postApi.newPost(newPost);
        console.log(post);
        alert("게시글이 등록되었습니다!");
        navigate("/posts");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    } else {
      try {
        const update = postApi.updatePost(newPost);
        console.log(update)
        alert("게시글이 수정되었습니다!")
        navigate(`/api/posts/${postId}`);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const handleChangeInput = () => {
    setContent(editorRef.current.getInstance().getHTML()
    )
    console.log(content)
  }
  


  return (
    <>
      <PostForm onSubmit={handleSubmit(onSubmitPost)}>
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
          <label>대표 이미지 등록</label>
          <input
            type="file"
            accept="image/*"
            {...register("postImg", {
              onChange: (e) => previewImage(e)
            })}
          />
        </Element>

        <ImageLabel>
          {imgSrc? <img src={imgSrc} alt=""/>:<HiOutlinePhotograph/>}
        </ImageLabel> 

        <Element>
          <label>위치 정보</label>
          <p>위치를 정확하게 입력해주세요.</p>
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
          <label>주변 정보</label>
          <SelectAmenity>
            <input type="checkbox" id="checkboxOne" name="amenity" value="airgun" onChange={amenityCheck} /> <label htmlFor="checkboxOne">에어건</label>
            <input type="checkbox" id="checkboxTwo" name="amenity" value="shower" onChange={amenityCheck} /> <label htmlFor="checkboxTwo">샤워부스</label>
            <input type="checkbox" id="checkboxThree" name="amenity" value="shop" onChange={amenityCheck} /> <label htmlFor="checkboxThree">서핑샵</label>
            <input type="checkbox" id="checkboxFour" name="amenity" value="park" onChange={amenityCheck} /> <label htmlFor="checkboxFour">주차장</label>
          </SelectAmenity>
        </Element>

        <Toastdiv>
          <Editor
            ref={editorRef}
            placeholder="내용을 입력해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            toolbarItems={[
              // 툴바 옵션 설정
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'image', 'link'],
              ['code', 'codeblock']
            ]}
            onChange={handleChangeInput}
            useCommandShortcut={true}
            hooks={{
              // addImageBlobHook: onUploadImage
            }}
            // {...register("content", {
            //   required: false,
            // })} 
          ></Editor>
        </Toastdiv>
          <button type="submit" disabled={!isValid}>
            게시글 {postId ? "수정" : "등록"} 하기
          </button>
      </PostForm>
      
    </>
  )
}

export default PostCU;



const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  button{
      height: 2.5625rem;
      width: 100%;
      border-radius: 0.3125rem;
      border: none;
      cursor: pointer;
      padding: 0.75rem, 0.625rem, 0.75rem, 0.625rem;
      background-color: #007AFF;
      color: #FFFFFF;
    }

    button:disabled{
      height: 2.5625rem;
      width: 100%;
      border-radius: 0.3125rem;
      border: none;
      padding: 0.75rem, 0.625rem, 0.75rem, 0.625rem;
      background-color: #E5E5EA;
      color: #FFFFFF;
    }
`

const Element = styled.div`
  display: block;
  text-align: left;
  flex-direction: column;
  display: flex;
  justify-content: left;
  font-size: 0.875rem;
  margin-top: 1.125rem;
  font-weight: 500;
  input {
    padding: 0.75rem 0.625rem;
    padding-left: 0.625rem;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #D1D1D6;

  }
  select{
    padding: 0.75rem 0.625rem;
    text-align: center;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #D1D1D6;
  }
  p {
    color: #FF3B30;
    font-weight: 300;
    height: 1.25rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  label{
    margin-bottom: 0.5rem;
  }
`

const ImageLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  img{
    width: 100%;
  }
  svg {
    margin: 1rem 3rem;
    font-size: 5rem;
  }

`

const SelectAmenity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Toastdiv = styled.div`
    background-color: aliceblue;
    width: 100%;
`


    
  
