import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "styled-components";
import styled from "styled-components";
import { postApi } from "../shared/api";
import { useSelector } from "react-redux";
import { HiOutlinePhotograph } from "react-icons/hi";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import "../App.css";
import { amenityInfo } from "../data";
import { Editor } from '@toast-ui/react-editor';
import { useQueryClient, useMutation } from "@tanstack/react-query";

const PostCU = () => {
  const navigate = useNavigate();
  const postId = useParams().postId;
  const nickname = useSelector((state) => state.auth.nickname)
  const [imgSrc, setImgSrc] = useState("");
  const [check, setCheck] = useState({ airgun: false, shower: false, shop: false, cafe: false, park: false, sleep: false });

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
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


        const data = postInfo.data;
        console.log(data)
        setValue("title", data.title);
        setValue("area", data.area);
        setValue("address", data.address);
        setValue("creatAt", data.after);
        setValue("content", data.content);
        setValue("amenity", data.amenity);
        setImgSrc(data.thumbnailUrl);

        const htmlString = data.content;
        editorRef.current?.getInstance().setHTML(htmlString);
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

  // console.log(watch())

  const amenityCheck = (el) => {

    setCheck({
      ...check,
      [el.value]: !check[el.value]
    });
  }

  console.log(check, 'check')





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


    if (!postId) {
      try {
        const post = postApi.newPost(newPost);
        alert("게시글이 등록되었습니다!");
        navigate("/posts");
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const update = postApi.updatePost(newPost);
        alert("게시글이 수정되었습니다!")
        navigate(`/api/posts/${postId}`);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };


  const onSubmitPostMutation = useMutation(onSubmitPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })


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
          {imgSrc ? <img src={imgSrc} alt="" /> : <HiOutlinePhotograph />}
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



