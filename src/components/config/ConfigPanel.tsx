import styled from "styled-components";
import { CmsSelectedComponentType } from "../../types/types";

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

const ConfigPanel = ({selectedComponentData}: Props) => {
  console.log(selectedComponentData)

  return ( 
    <Panel>
      <h3>Selected Component</h3>
      {selectedComponentData && <>
        <p>{selectedComponentData.cmsKey}</p>
      
      </>}
    </Panel>
   );
}
 
export default ConfigPanel;