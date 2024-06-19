import { useContext } from "react";
import { CmsContext } from "./context";

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
  }
}



const renderInputField = (inputField: Object, component: Object, setValue: (field: string, newValue: any) => any) => {
  if(inputField?.["type"] === "select") {
    return (
      <select onChange={(event) => setValue(inputField["key"], event.target.value)}>
        {inputField?.["options"]?.map(opt => (
          <option value={opt?.value || opt}>{opt?.label || opt}</option>
        ))}
      </select>
    );
  }
  return (
    <input type={inputField?.["type"] || "text"} value={component?.[inputField["key"]]} onChange={(event) => setValue(inputField["key"], event.target.value)}/> 
  )
  
}




interface Props {
  type: string,
  component: Object,
}

const InputFields = ({type, component}: Props) => {
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
      {inputFields.map(field => renderInputField(field, component, (field, newValue) => {
        updateDataField(field, newValue);
      }))}
    </div>
  )
}


export default InputFields;