import { ReactNode, useContext } from "react";
import styled from "styled-components";
import { CmsContext } from "./context";

interface Props {
  children: ReactNode,
  isDisabled?: boolean,
  inEditMode?: boolean,
  type: string,
  cmsKey: string,
}

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

const CmsSelectable = ({isDisabled = false, inEditMode = false, cmsKey, children, type, ...rest}: Props) => {
  const {context, setContextData} = useContext(CmsContext);
  const isSelected = context.selectedComponent?.cmsKey === cmsKey;
  

  const handleClick = () => {
    if(!isDisabled) {
      console.log(context, rest);
      
      setContextData("selectedComponent", {
        cmsKey: cmsKey,
        data: null,
        type
      }) //TODO
    }
  }

  return ( 
    context.inEditMode ? 
    <Selectable 
      className={`cms-selectable ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`} 
      onClick={handleClick}
    >
      {children}
    </Selectable>
    : children 
    );
}
 
export default CmsSelectable;