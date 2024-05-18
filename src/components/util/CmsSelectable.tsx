import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode,
  isDisabled?: boolean,
  inEditMode?: boolean,
  isSelected?: boolean,
}



const CmsSelectable = ({isDisabled = false, inEditMode = false, isSelected = true, children, ...rest}: Props) => {

  const Selectable = styled.div`
    border: 2px dashed #37a0f044;
    transition: border-color 0.1s ease; 
    &.selected {
      border-color: #37cc7d;
    }
    &:hover:not(.disabled) {
      border-color: #37a0f0;
      cursor: pointer;
    }
    &.disabled {
      border-color: #ddd;
    }
  `;

  const handleClick = () => {
    if(!isDisabled) {
      console.log("TODO: Set as selected")
    }
  }

  return ( 
    <Selectable 
      className={`cms-selectable ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`} 
      onClick={handleClick}
    >
      {children}
    </Selectable> 
    );
}
 
export default CmsSelectable;