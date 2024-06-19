import { useContext, useEffect } from "react";
import { CmsContext } from "./context";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from "styled-components";

const getInputFields = (inputType: string) => {
  switch(inputType) {
    case "header": return [
      {
        type: "text",
        key: "text",
      },
      {
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5" ,"h6"],
        key: "type",
      }
    ];
    case "text": return [
      {
        type: "textarea",
        key: "text",
      },
    ];
  }
}






interface SingleInputFieldProps {
  inputField: Object,
  component: Object,
  setValue: (field: string, newValue: any) => any
}

const SingleInputField = ({inputField, component, setValue}: SingleInputFieldProps) => {
  if(inputField?.["type"] === "select") {
    return (
      <select onChange={(event) => setValue(inputField["key"], event.target.value)}>
        {inputField?.["options"]?.map(opt => (
          <option value={opt?.value || opt}>{opt?.label || opt}</option>
        ))}
      </select>
    );
  }
  if(inputField?.["type"] === "textarea") {
    const { quill, quillRef } = useQuill({modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
    
        [{ list: 'ordered'}, { list: 'bullet' }],
        // [{ indent: '-1'}, { indent: '+1' }],
    
        // [{ size: ['small', false, 'large', 'huge'] }],
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link'],
        [{ color: [] }, { background: [] }],
    
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }});
    useEffect(() => {
      if (quill) {
        //Default value
        quill.clipboard.dangerouslyPasteHTML(component?.[inputField["key"]]);
        //On Change
        quill.on("text-change", (delta, oldDelta, source) => {
          // console.log(quill.getText()); // Get text only
          // console.log(quill.root.innerHTML); // Get innerHTML using quill
          setValue(inputField["key"], quill.root.innerHTML)
        });
      }
    }, [quill]);
    return (
      <div style={{minHeight: 300 }}>
        <div ref={quillRef} />
      </div>
    );
  }
  return (
    <input type={inputField?.["type"] || "text"} value={component?.[inputField["key"]]} onChange={(event) => setValue(inputField["key"], event.target.value)}/> 
  )
  
}




interface InputFieldsProps {
  type: string,
  component: Object,
}

const InputFields = ({type, component}: InputFieldsProps) => {
  const {context, setContextData} = useContext(CmsContext);
  const inputFields = getInputFields(type);

  const updateDataField = (field: string, value: any) => {
  //`pages.${context.currentPageKey}.${component["cmsKey"]}.${field}`,
    let prevSiteData = Object.assign({}, context).siteData;
    prevSiteData["pages"][context.currentPageKey][context.selectedComponent.cmsKey][field] = value;
    setContextData("siteData", prevSiteData);
  }


  return (
    <div>
      { inputFields.map(field => 
      <SingleInputField inputField={field} component={component} setValue={(field, newValue) => {
          updateDataField(field, newValue);
        }}
      />
    )} 
    </div>
  )
}


export default InputFields;