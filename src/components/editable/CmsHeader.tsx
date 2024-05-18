import { useContext } from "react";
import { HeaderType } from "../../types/enums";
import { EditableComponent } from "../../types/types";
import ComponentWrapper from "../util/ComponentWrapper";
import { CmsContext } from "../util/context";
import CmsSelectable from "../util/CmsSelectable";

export interface CmsHeaderProps extends EditableComponent {
  inputs: {
    type: HeaderType,
    text: string,
    style?: object,
  }
}


export const CmsHeader = ({
  //This components input fields
  inputs,
  //EditableComponent
  className, 
  ...rest
  
}: CmsHeaderProps) => {

  const cmsData = useContext(CmsContext);

  return (
    <CmsSelectable>
      <ComponentWrapper 
        tag={inputs.type as unknown as keyof JSX.IntrinsicElements} 
        className={`cms-component header-cms-component ${className}`}
        style={inputs.style}
        {...rest}
      >
        {inputs.text}
      </ComponentWrapper>
    </CmsSelectable>
  )
}
