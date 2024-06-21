import { useEffect, useState } from "react";
import styled from "styled-components";



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
`;


export const ImageSelectModal = ({ setter, setSetter }) => {
  const [image, setImage] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [modalState, setModalState] = useState("upload");
  const [userImages, setUserImages] = useState([]);
  const [userImageJSX, setUserImageJSX] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getUsersImages = async () => {
    return fetch("/api/icons/user")
      .then((result) => result.json())
      .then((data) => {
        const images = data.map((item) => item.url);
        setUserImages(images);
        return images;
      });
  };
  const renderUserImagesJSX = (data, selectedId) => {
    let jsxElements = [];
    data.forEach((value, index) => {
      jsxElements.push(
        <div
          className={`image-select-option ${
            index === selectedId ? "selected" : ""
          }`}
          data-id={index}
          onClick={() => selectImageOption(index, value)}
        >
          <img alt={index} src={value} />
        </div>
      );
    });
    setUserImageJSX(jsxElements);
  };
  useEffect(() => {
    if (refresh) {
      setImage(null);
      getUsersImages();
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    renderUserImagesJSX(userImages, -1);
  }, [userImages]);

  const postIcon = () => {
    //TODO: catch and display error
    const formData = new FormData();
    formData.append("icon", image);
    return fetch("/api/icons", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());
  };
  const selectImageOption = (dataId, url) => {
    renderUserImagesJSX(userImages, dataId);
    setSelectedImageUrl(url);
  };
  const selectImage = async () => {
    if (modalState === "upload") {
      postIcon().then((img) => {
        setSelectedImageUrl(img.url);
        setter(img.url);
        setRefresh(true);
        setSetter(""); // clear the setter to hide the modal
      });
    } else if (modalState === "select") {
      setter(selectedImageUrl);
      setRefresh(true);
      setSetter(""); // clear the setter to hide the modal
    }
  };
  const closeModal = () => {
    setRefresh(true);
    setSetter(""); // clear the setter to hide the modal
  };
  if (setter || true) {
    return (
      <>
        <Modal className="visible">
          <div className="modal-header">
            <h2>Select Image</h2>
            <button onClick={closeModal}>
              <i className="fas fa-times"></i>
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
                  <span id="imageErrorMsg" className="error-message hidden">
                    Incorrect file type
                  </span>
                </div>
              </div>
              <div
                className={`image-select-container upload-container ${
                  modalState === "select" ? "" : "hidden"
                }`}
              >
                {userImageJSX}
              </div>
            </div>
            <div className="btn-group">
              <button className="btn blue-outline" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn blue" onClick={selectImage}>
                Select
              </button>
            </div>
          </div>
        </Modal>
        <Screen
          onClick={closeModal}
        ></Screen>
      </>
    );
  }
  return <></>;
};
