import styled from "styled-components";

interface Props {
  selectedComponentData: object;
}

const Bar = styled.nav`
  background-color: #fafafa;
  padding: 1rem;
  grid-area: config-bar;
  border-bottom: 1px solid #ccc;
  position: fixed;
  z-index: 205;
  top:   0;
  left:  0;
  right: 0;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ConfigBar = () => {


  return ( 
    <Bar>
      <h2>Page Name</h2>
      <div>
        <button>Save</button>
      </div>
    </Bar>
   );
}
 
export default ConfigBar;