import { createContext } from "react";

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
  setContextData: (field: string, data: any) => {}
});