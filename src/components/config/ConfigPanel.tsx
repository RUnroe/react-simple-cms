import styled from "styled-components";
import { CmsSelectedComponentType } from "../../types/types";
import { useContext } from "react";
import { CmsContext } from "../util/context";

interface Props {
  selectedComponentData: CmsSelectedComponentType;
}

const Panel = styled.aside`
  background-color: #fafafa;
  padding: 1rem;
  grid-area: config-panel;
  border-left: 1px solid #ccc;
  position: fixed;
  z-index: 200;
  top: 4rem;
  bottom: 0;
  width: 100%;
`;

const ConfigPanel = () => {
  const {context, setContextData} = useContext(CmsContext);
  console.log(context)

  return ( 
    <Panel>
      <h3>Selected Component</h3>
      {context.selectedComponent && <>
        <p>{context.selectedComponent.cmsKey}</p>
      
      </>}
    </Panel>
   );
}
 
export default ConfigPanel;