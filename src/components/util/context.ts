import { createContext } from "react";

export const CmsContext = createContext({
  siteData: {},
  currentPage: {},
  selectedComponent: {},
  inEditMode: false,
});