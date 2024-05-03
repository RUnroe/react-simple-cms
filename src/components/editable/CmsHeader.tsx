import { HeaderType } from "../../types/enums";
import { EditableComponent } from "../../types/types";
import ComponentWrapper from "../util/ComponentWrapper";

export interface CmsHeaderProps extends EditableComponent {
  inputs: {
    type: HeaderType,
    text: string,
    classNames?: string[],
  }
}


export const CmsHeader = ({
  //EditableComponent
  className, containerClassName, inEditMode = false,
  //This components input fields
  inputs
  
}: CmsHeaderProps,) => {


  return (
    <div className={`cms-component header-cms-component ${containerClassName} ${inEditMode ? "edit-mode" : ""}`}>
      <ComponentWrapper tag={inputs.type as unknown as keyof JSX.IntrinsicElements} className={`${className} ${inputs?.classNames?.join(" ") || ""}`}>
        {inputs.text}
      </ComponentWrapper>
    </div>
  )
}
