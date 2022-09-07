import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "styled-components";
import styled from "styled-components";
import { postApi } from "../shared/api";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import "../App.css";
import { Editor } from '@toast-ui/react-editor';

import { amenityInfo } from "../shared/data";

import { useAddPost } from "../react-query/hooks/post/useAddPost";

const PostCU = () => {
  const onAdd = useAddPost()

  const navigate = useNavigate();
  const postId = useParams().postId;
  const nickname = useSelector((state) => state.auth.nickname)
  const [imgSrc, setImgSrc] = useState("");
  const [check, setCheck] = useState({ airgun: false, shower: false, shop: false, cafe: false, park: false, sleep: false });


  const [content, setContent] = useState("");
  const editorRef = useRef();

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
        const postInfo = await postApi.getPost(`${postId}`);

        if (postInfo.data.nickname !== nickname) {
          alert("수정 권한이 없습니다.");
          navigate(-1);
          return;
        }


        const data = postInfo.data;
        console.log(data)
        setValue("title", data.title);
        setValue("area", data.area);
        setValue("address", data.address);
        setValue("createAt", data.createAt);
        setValue("content", data.content);
        setValue("amenity", data.amenity);
        setImgSrc(data.thumbnailUrl);

        const htmlString = data.content;
        editorRef.current?.getInstance().setHTML(htmlString);
      };
      setPost();
    }
  }, []);


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


  const amenityCheck = (el) => {

    setCheck({
      ...check,
      [el.value]: !check[el.value]
    });
  }


  const onSubmit = async(formData) => {
   
    let thumbnailUrl;

    if (formData.postImg.length > 0) {
      console.log(formData.postImg[0],"test")
      const uploaded_file = await uploadBytes(
        ref(storage, `images/post/${formData.postImg[0].name}`),
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
      amenity: `${check.airgun} ${check.shower} ${check.shop} ${check.cafe} ${check.park} ${check.sleep}`,
      thumbnailUrl: thumbnailUrl,
    };

    onAdd({newPost, postId})
  }

//toast ui 
  const handleChangeInput = () => {
    setContent(editorRef.current.getInstance().getHTML()
    )

  }

  const onUploadImage = async (blob, callback) => {
      let formData= new FormData();
      formData.append('file', blob); 
      const {data:url} = await postApi.uploadImages(formData)
      callback(url.url, "콜백 이미지 URL")
    }


  return (
    <>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
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
          <ImageLabel>
            {imgSrc ? <img src={imgSrc} alt="" /> : <div className="noneImg" />}
            <div className="buttonDiv">
                <input
                type="file"
                accept="image/*"
                id="img_input"
                {...register("postImg", {
                  onChange: (e) => previewImage(e)
                })}
                />
                <label className="uploadBtn" htmlFor="img_input">첨부</label>
              </div>
          </ImageLabel>
        </Element>

      

        <Element>
          <label>위치 정보</label>
          <p className="warningtext">위치를 정확하게 입력해주세요.</p>
          <select
            name="area"
            id="area"
            {...register("area", {
              required: true,
            })}
          >
          <option value="서울·경기·인천">서울·경기·인천</option>
          <option value="강원">강원</option>
          <option value="대구·경북">대구·경북</option>
          <option value="부산·울산·경남">부산·울산·경남</option>
          <option value="전북">전북</option>
          <option value="광주·전남">광주·전남</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="제주">제주</option>
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
            {
              amenityInfo.map((it, idx) => { return <div key={idx}>{it.map((el) => { return <AmenityButton type="button" active={check[el.value]} check={check[el.value]} className="amenityBtn" onClick={() => amenityCheck(el)} key={el.id}>{el.text}</AmenityButton> })}</div> })
            }
          </SelectAmenity>
        </Element>

        <Toastdiv>
          <label>본문</label>
          <Editor
            ref={editorRef}
            placeholder="내용을 입력해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            onChange={handleChangeInput}
            useCommandShortcut={true}
            // colorSyntax 플러그인 적용
            plugins={[
              [
                colorSyntax,
                // 기본 색상 preset 적용
                {
                  preset: ['#1F2E3D', '#4c5864', '#ED7675']
                }
              ]
            ]}
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "image", "bold", "italic", "strike"],
              ["hr", "quote"],
              ['ul', 'ol'],
              ["link"],
            ]}
            //FIXME:DOMPURIFY
            // customHTMLSanitizer={
            //   html=>{return DOMPuri}
            // }
            previewHighlight={false}
            hooks={{
              addImageBlobHook: onUploadImage
            }}
          ></Editor>
        </Toastdiv>
        <PostBtnDiv>
          <button type="submit" disabled={!isValid}>
            게시글 {postId ? "수정" : "등록"} 하기
          </button>
        </PostBtnDiv>
      </PostForm>

    </>
  )
}

export default PostCU;



const PostForm = styled.form`
  display: flex;
  flex-direction: column;
`

const PostBtnDiv = styled.div`
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
  flex-direction: column;
  display: flex;
  font-size: 0.875rem;
  margin-top: 1.125rem;
  font-weight: 500;
  input {
    padding: 0.72rem 0.625rem;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #D1D1D6;
    width:100%;
  }
  select{
    padding: 0.75rem 0.625rem;
    text-align: center;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #D1D1D6;
  }
  .warningtext {
    color: #FF3B30;
    font-weight: 400;
    height: 1.25rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  label{
    margin-bottom: 0.5rem;
  }
`

const ImageLabel = styled.div`
  display: flex;
  border-radius: 1rem;
  cursor: pointer;

  img{
    width: 6rem;
    height: 5.8rem; 
    background-color:  #D9D9D9;
    border-radius: 0.5rem;
    border:none;
  }
  .noneImg{
    width: 6rem;
    height: 5.8rem; 
    background-color:  #D9D9D9;
    border-radius: 0.5rem;
    border: 0.0625rem solid  #D9D9D9 ;
  }
  
  .buttonDiv{
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    width: 100%;
    input{
      width: 100%;
    }
    input::-webkit-file-upload-button{
    display: none;
  }
    .uploadBtn{
      background-color: #EFF7FF;
      margin-top: 0.75rem;
      height: 2rem;
      width: 4.25rem;
      border-radius: 0.25rem;
      border: none;
      text-align: center;
      padding-top: 0.5rem;
    }
  }
`

const SelectAmenity = styled.div`
    display:flex;
    flex-direction: column;
    gap: 0.5rem;
    div{
      display: flex;
      gap: 0.5rem;
    }
`

const AmenityButton = styled.button`
  align-items: center;
  padding: 0.625rem 0.875rem;
  border-radius: 2.875rem;
  border: 0.0625rem solid #000000;

  font-size: 0.875rem;
  font-weight: 600;
${({ active }) => active && css`
background-color:#007AFF;
color:white;
border:none;
`}
  &:hover{
    color:${(props) => (props.check ? 'white' : 'black')};
    background-color: ${(props) => (props.check ? '#007AFF' : 'transparent')};
    border:${(props) => (props.check ? 'none' : '0.0625rem solid #000000')};
  }
`

const Toastdiv = styled.div`
  margin-top: 1.125rem;
  margin-bottom: 1.875rem;
  label{
    font-size: 0.875rem;
    font-weight: 500;
  }
`



