import { useContext } from "react";
import { HeaderType } from "../../types/enums";
import { EditableComponent } from "../../types/types";
import ComponentWrapper from "../util/ComponentWrapper";
import { CmsContext } from "../util/context";
import CmsSelectable from "../util/CmsSelectable";

export interface CmsHeaderProps extends EditableComponent {
  inputs?: {
    type?: HeaderType,
    // text: string,
    style?: object,
  }
}


export const CmsHeader = ({
  //This components input fields
  inputs,
  //EditableComponent
  className, 
  cmsKey,
  ...rest
  
}: CmsHeaderProps) => {

  const {context, setContextData} = useContext(CmsContext);
  return (
    <CmsSelectable isDisabled={false} inEditMode={true} cmsKey={cmsKey} type={"header"}>
      <ComponentWrapper 
        tag={(context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]?.["type"] || inputs?.type) as unknown as keyof JSX.IntrinsicElements} 
        className={`cms-component header-cms-component ${className}`}
        style={inputs?.style}
        {...rest}
      >
        {context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]?.["text"]}
      </ComponentWrapper>
    </CmsSelectable>
  )
}
