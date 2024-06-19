import { useContext, useEffect, useState } from "react";
import { CmsContext } from "./context";
import styled from "styled-components";
import RichTextEditor from "./RichTextEditor";

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
  setValue: (field: string, newValue: any) => any
}

const SingleInputField = ({inputField, component, setValue}: SingleInputFieldProps) => {
  const [jsxInput, setJsxInput] = useState(null);
  useEffect(() => {
    if(inputField?.["type"] === "select") {
      setJsxInput(
        <Select onChange={(event) => setValue(inputField["key"], event.target.value)} id={`cms-input-${inputField["key"]}`}>
          {inputField?.["options"]?.map(opt => (
            <option value={opt?.value || opt} selected={(opt?.value || opt) === component?.[inputField["key"]]}>{opt?.label || opt}</option>
          ))}
        </Select>
      );
    }
    else if(inputField?.["type"] === "textarea") {
      setJsxInput(
        <RichTextEditor component={component} inputField={inputField} setValueCallback={setValue} />
      );
    }
    else {
      setJsxInput(
        <Input 
          id={`cms-input-${inputField["key"]}`}
          type={inputField?.["type"] || "text"} 
          value={component?.[inputField["key"]]} 
          onChange={(event) => setValue(inputField["key"], event.target.value)}
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