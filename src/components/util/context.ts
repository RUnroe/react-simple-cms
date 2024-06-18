import { createContext } from "react";

export const CmsContext = createContext({
  context: {
  siteData: {},
  currentPage: {},
  selectedComponent: {
    pageKey: null,
    cmsKey: null,
    data: null,
  },
  inEditMode: false,
  }, 
  setContextData: (field: string, data: any) => {}
});