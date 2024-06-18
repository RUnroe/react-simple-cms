import { createContext } from "react";

export const CmsContext = createContext({
  context: {
  siteData: {},
  currentPageKey: "",
  selectedComponent: {
    cmsKey: null,
    data: null,
  },
  inEditMode: false,
  }, 
  setContextData: (field: string, data: any) => {}
});