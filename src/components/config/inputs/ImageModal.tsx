import { useEffect, useState } from "react";
import styled from "styled-components";
import { CmsImageType } from "../../../types/types";



const Screen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  opacity: 0.1;
  z-index: 200;
  display: block;
`;

const Modal = styled.div`
  display:block;
  position: fixed;
  z-index: 205;
  width:90%;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  max-width:750px;
  background-color: #fafafa;
  padding:1rem;
  box-sizing: border-box;

  .modal-header {
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 1rem 1rem 0;

    button {
      &:hover {
        color: #F26666;
      }
    }
    h2 {
      margin:0.5rem 0;
    }
  }
  .modal-header button, .cancel-btn {
    background-color: transparent;
    border:none;
    outline:none;
    font-weight: bold;
    cursor:pointer;
    transition: color 0.1s ease;
    display:flex;
    font-size: 1.6rem;
}

.file-input {
  display:block;
  margin:0.5rem;
}
.file-input > input {
  display:none;
}

.btn-group {
  border-top: 1px solid #ccc;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3rem;
}
.image-options {
  padding: 0 1rem;
  display:flex;

  .image-option {
    padding: 0.5rem 1rem;
    cursor:pointer;
  }
}

.image-options input:checked + .image-option {
  color: #37a0f0;
  border-bottom: 2px solid #37a0f0;
}
.image-options-container {
  border-bottom: 1px solid #ccc;
}
input[type="radio"], input[type="checkbox"] {
  display:none;
}
.upload-container {
  padding: 1rem;
  height:300px;
  overflow-x: hidden;
}
.upload-container.hidden {
  display:none;
}
.image-upload-container {
  text-align: center;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image-upload-container p {
  margin:0.5rem 0 0;
}
.image-upload-container .input-label.file-input.btn {
  margin:0.25rem auto;
}
.image-select-container {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.image-select-option {
  width:125px;
  height:125px;
  overflow:hidden;
  margin:0.5rem;
  border:2px solid #ccc;
  cursor:pointer;
}
.image-select-option.selected {
  border: 2px solid #37a0f0;
}
.image-select-option > img {
  width:100%;
  height:100%;
  object-fit: cover;
  object-position: center center;
}
`;

interface Props {
  handleAdd: (image: any) => void,
  handleClose: () => void,
}


export const ImageSelectModal = ({ handleAdd, handleClose }:Props) => {
  const [image, setImage] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [modalState, setModalState] = useState("upload");
  const [userImages, setUserImages] = useState([]);

  //TODO: Move this to webservice.ts
  const getUsersImages = async () => {
    return fetch("/api/icons/user")
      .then((result) => result.json())
      .then((data) => {
        const images = data.map((item) => item.url);
        setUserImages(images);
        return images;
      });
  };



  //TODO: Move this to webservice.ts
  const postIcon = () => {
    //TODO: catch and display error
    const formData = new FormData();
    formData.append("icon", image);
    return fetch("/api/icons", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());
  };

  const selectImage = async () => {
    if (modalState === "upload") {
      postIcon().then((img) => {
        setSelectedImageUrl(img.url);
        handleAdd(img.url);
        handleClose();
      });
    } else if (modalState === "select") {
      handleAdd(selectedImageUrl);
      handleClose();
    }
  };

  if (handleAdd) {
    return (
      <>
        <Modal className="visible">
          <div className="modal-header">
            <h2>Select Image</h2>
            <button onClick={handleClose}>
            &#xD7;
            </button>
          </div>
          <div className="modal-body">
            <div className="image-options-container">
              <div className="image-options">
                <label>
                  <input
                    type="radio"
                    name="image-option"
                    value="upload"
                    onClick={() => setModalState("upload")}
                    checked={modalState === "upload"}
                  />
                  <div className="image-option">Upload Photo</div>
                </label>
                <label>
                  <input
                    type="radio"
                    name="image-option"
                    value="select"
                    onClick={() => setModalState("select")}
                    checked={modalState === "select"}
                  />
                  <div className="image-option">Your Photos</div>
                </label>
              </div>
            </div>
            <div className="image-container">
              <div
                className={`image-upload-container upload-container ${
                  modalState === "upload" ? "" : "hidden"
                }`}
              >
                <div className="form-block">
                  <label className="input-label file-input btn blue">
                    {" "}
                    Upload Image
                    <input
                      id="imageInput"
                      onInput={(e) => setImage(e.target?.["files"][0])}
                      type="file"
                      name="newIcon"
                      accept="image/png, image/jpeg, image/jpg, image/svg"
                    />
                  </label>
                  <p>{image ? image?.["name"] : ""}</p>
                  {/* <span id="imageErrorMsg" className="error-message hidden">
                    Incorrect file type
                  </span> */}
                </div>
              </div>
              <div
                className={`image-select-container upload-container ${
                  modalState === "select" ? "" : "hidden"
                }`}
              >
                {
                  userImages?.map(({src, alt}: CmsImageType, index) => (
                      <div
                        className={`image-select-option ${
                          src === selectedImageUrl ? "selected" : ""
                        }`}
                        data-id={index}
                        onClick={() => setSelectedImageUrl(src)}
                      >
                        <img alt={alt} src={src} />
                      </div>
                  ))
                }
              </div>
            </div>
            <div className="btn-group">
              <button className="btn blue-outline" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn blue" onClick={selectImage}>
                Select
              </button>
            </div>
          </div>
        </Modal>
        <Screen></Screen>
      </>
    );
  }
  return <></>;
};
