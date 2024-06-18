import { ReactNode, useState } from "react";
import { CmsContext } from "./util/context";
import ConfigPanel from "./config/ConfigPanel";
import styled from "styled-components";
import ConfigBar from "./config/ConfigBar";
import { CmsContextType } from "../types/types";

export interface CmsPageProps {
  className?: string,
  inEditMode?: boolean,
  pageKey: string,
  children: ReactNode,
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(500px, 30%);
  grid-template-rows: 4rem 1fr;
  grid-template-areas: "config-bar config-bar" "page-content config-panel";
  position: relative;
`;

export const CmsPage = ({className = "", inEditMode = false, pageKey, children, ...rest}: CmsPageProps) => {
  const [cmsData, setCmsData] = useState({
    siteData: {},
    currentPageKey: "",
    selectedComponent: {
      cmsKey: null,
      data: null,
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
  return ( 
    <CmsContext.Provider value={{context: cmsData, setContextData: updateDataField}}>
      <main className={`cms-page ${className} ${inEditMode ? "edit-mode": ""}`} {...rest}>
        {inEditMode ? 
          <GridLayout>
            {/* Config bar */}
            <ConfigBar />
            <section style={{gridArea: "page-content"}}>
              {children}
            </section>
            <ConfigPanel />
          </GridLayout> 
          : children}
      </main> 
    </CmsContext.Provider>
  );
}
 