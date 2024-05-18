import { ReactNode, useState } from "react";
import { CmsContext } from "./util/context";
import ConfigPanel from "./config/ConfigPanel";
import styled from "styled-components";
import ConfigBar from "./config/ConfigBar";

export interface CmsPageProps {
  className?: string,
  inEditMode?: boolean,
  children: ReactNode,
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  grid-template-rows: 4rem 1fr;
  grid-template-areas: "config-bar config-bar" "page-content config-panel";
  position: relative;
`;

export const CmsPage = ({className = "", inEditMode = false, children, ...rest}: CmsPageProps) => {
  const [cmsData, setCmsData] = useState({
    siteData: {},
    currentPage: {},
    selectedComponent: {
      pageKey: null,
      dataKey: null,
      data: null,
    },
    inEditMode
  })
  return ( 
    <CmsContext.Provider value={cmsData}>
      <main className={`cms-page ${className} ${inEditMode ? "edit-mode": ""}`} {...rest}>
        {inEditMode ? 
          <GridLayout>
            {/* Config bar */}
            <ConfigBar />
            <section style={{gridArea: "page-content"}}>
              {children}
            </section>
            <ConfigPanel selectedComponentData={cmsData.selectedComponent} />
          </GridLayout> 
          : children}
      </main> 
    </CmsContext.Provider>
  );
}
 