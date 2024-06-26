import { ReactNode, useState } from "react";
import { CmsContextType, updateFieldType } from "../types/types";
import { CmsContext } from "./util/context";

interface Props {
  siteData: Object,
  children: ReactNode,
  fileUploadCallback?: (files: FileList) => void,
}

export const CmsProvider = ({siteData, children, fileUploadCallback = (files: FileList) => {window.alert("Developer has not set up a way to upload files. Please contact your developer for further support.")}}: Props) => {
  const [cmsData, setCmsData] = useState({
    siteData: siteData,
    currentPageKey: "",
    selectedComponent: {
      cmsKey: null,
      data: null,
      type: "",
    },
    inEditMode: false,
  });
  
  const updateDataField = (field: string, data: Object | String | boolean) => {
    if(cmsData.hasOwnProperty(field)) {
      let tempCmsData: CmsContextType = Object.assign({}, cmsData);
      tempCmsData[field as keyof CmsContextType || ""] = data;
      setCmsData(tempCmsData);
    }
  }

  const updateManyDataFields = (dataFields: updateFieldType[]) => {
    let tempCmsData: CmsContextType = Object.assign({}, cmsData);
    dataFields.forEach(({field, data}) => {
      if(cmsData.hasOwnProperty(field)) {
        tempCmsData[field as keyof CmsContextType || ""] = data;
      }
    });
    setCmsData(tempCmsData);
  }
  return ( 
    <CmsContext.Provider value={{context: cmsData, setContextData: updateDataField, setManyContextFields: updateManyDataFields, fileUploadCallback: fileUploadCallback}}>  
      {children}
    </CmsContext.Provider> 
  );
}
 
