import styled from "styled-components";
import { CmsSelectedComponentType } from "../../types/types";
import { useContext } from "react";
import { CmsContext } from "../util/context";
import { toTitleCase } from "../util/shared";

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

const SmallItalicSpan = styled.span`
  font-style: italic;
  font-size: 0.85rem;
`;

const ConfigPanel = () => {
  const {context, setContextData} = useContext(CmsContext);
  console.log(context)

  return ( 
    <Panel>
      {context.selectedComponent && context.selectedComponent.cmsKey ? 
      <>
        <h3>Selected Component</h3>
        <p>{toTitleCase(context.selectedComponent.cmsKey)} <SmallItalicSpan>({context.selectedComponent.cmsKey})</SmallItalicSpan></p>
        
        {/* TODO: Add input controls */}
      </> : <h3>Select a component to edit...</h3>
      }
    </Panel>
   );
}
 
export default ConfigPanel;