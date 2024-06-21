import { ReactNode, useContext, useEffect, useState } from "react";
import { CmsContext } from "./context";
import styled from "styled-components";
import RichTextEditor from "./RichTextEditor";
import { DragDropContext, Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { CmsImageType } from "../../types/types";
import ImageGalleryInputFields from "./ImageGalleryInputFields";

const getInputFields = (inputType: string) => {
  switch(inputType) {
    case "header": return [
      {
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5" ,"h6"],
        key: "type",
        label: "Header Type"
      },
      {
        type: "text",
        key: "text",
        label: "Text",
      }
    ];
    case "text": return [
      {
        type: "textarea",
        key: "text",
      },
    ];
    case "image": return [
      {
        type: "text",
        key: "src",
        label: "From the Web",
      },
      {
        type: "file",
        key: "upload-src",
        label: "Upload Image",
      },
      {
        type: "text",
        key: "alt",
        label: "Description",
      },
    ];
    case "image-gallery": return [
      {
        type: "text",
        key: "src",
        label: "From the Web",
      },
      {
        type: "file",
        key: "upload-src",
        label: "Upload Image",
      },
      {
        type: "submit",
        key: "upload-src",
        label: "Upload",
      },
      {
        type: "text",
        key: "alt",
        label: "Description",
      },
    ];
  }
}




const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 1rem;
`;
const Select = styled.select`
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 1rem;
`;


interface SingleInputFieldProps {
  inputField: Object,
  component: Object,
  fileUploadCallback: (files: FileList) => void,
  setValue: (field: string, newValue: any) => any
}

const SingleInputField = ({inputField, component, fileUploadCallback, setValue}: SingleInputFieldProps) => {
  const [jsxInput, setJsxInput] = useState(null);
  useEffect(() => {
    if(inputField?.["type"] === "select") {
      setJsxInput(
        <Select 
          onChange={(event) => setValue(inputField["key"], event.target.value)} 
          id={`cms-input-${inputField["key"]}`} 
          key={`cms-input-${inputField["key"]}`} 
          value={component?.[inputField["key"]]}
        >
          {inputField?.["options"]?.map(opt => (
            <option value={opt?.value || opt} key={`cms-input-${inputField["key"]}-option=${opt?.label || opt}`} >{opt?.label || opt}</option>
          ))}
        </Select>
      );
    }
    else if(inputField?.["type"] === "textarea") {
      setJsxInput(
        <RichTextEditor component={component} inputField={inputField} setValueCallback={setValue} key={`cms-input-${inputField["key"]}`} />
      );
    }
    else {
      setJsxInput(
        <Input 
          id={`cms-input-${inputField["key"]}`}
          key={`cms-input-${inputField["key"]}`} 
          type={inputField?.["type"] || "text"} 
          value={component?.[inputField?.["key"]]} 
          onChange={(event) => {
            if(inputField["key"].includes("upload-")) {
              //TODO: This might need some more work
              fileUploadCallback(event.target.files);
            }
            else {
              setValue(inputField["key"], event.target.value);
            }
          }}
          /> 
      );
    }
  }, [inputField, component]);
 

  //Return jsx
  if(inputField?.["label"]) {
    return (
      <div>
        <label htmlFor={`cms-input-${inputField["key"]}`}>{inputField["label"]}</label>
        {jsxInput}
      </div>
    )
  }
  return (<>{jsxInput}</>)
  
  
}




interface InputFieldsProps {
  type: string,
  component: Object,
}

const InputFields = ({type, component}: InputFieldsProps) => {
  const {context, setContextData, fileUploadCallback} = useContext(CmsContext);
  const inputFields = getInputFields(type);

  const updateDataField = (field: string, value: any) => {
  //`pages.${context.currentPageKey}.${component["cmsKey"]}.${field}`,
    let prevSiteData = Object.assign({}, context).siteData;
    prevSiteData["pages"][context.currentPageKey][context.selectedComponent.cmsKey][field] = value;
    setContextData("siteData", prevSiteData);
  }


  return (
    <div>
      { type !== "image-gallery" && inputFields.map( field => 
        <SingleInputField 
          key={`cms-single-input-field-${field.key}`}
          inputField={field} 
          component={component} 
          fileUploadCallback={fileUploadCallback}
          setValue={(field, newValue) => {
            updateDataField(field, newValue);
          }}
        />
      )} 
      {
        type === "image-gallery" && 
        <ImageGalleryInputFields component={component} updateSiteData={updateDataField}/>
      }
    </div>
  )
}


export default InputFields;