import styled from "styled-components";

interface Props {
  selectedComponentData: object;
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


  return ( 
    <Panel>
      <h3>Selected Component</h3>

    </Panel>
   );
}
 
export default ConfigPanel;