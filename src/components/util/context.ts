import { createContext } from "react";
import { updateFieldType } from "../../types/types";

export const CmsContext = createContext({
  context: {
  siteData: {},
  currentPageKey: "",
  selectedComponent: {
    cmsKey: null,
    data: null,
    type: "",
  },
  inEditMode: false,
  }, 
  setContextData: (field: string, data: any) => {},
  setManyContextFields: (dataFields: updateFieldType[]) => {}
});