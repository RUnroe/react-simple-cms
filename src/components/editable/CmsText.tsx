import { useContext } from "react";
import { HeaderType } from "../../types/enums";
import { EditableComponent } from "../../types/types";
import ComponentWrapper from "../util/ComponentWrapper";
import { CmsContext } from "../util/context";
import CmsSelectable from "../util/CmsSelectable";

export interface CmsTextProps extends EditableComponent {
  inputs?: {
    style?: object,
  }
}


export const CmsText = ({
  //This components input fields
  inputs,
  //EditableComponent
  className, 
  cmsKey,
  ...rest
  
}: CmsTextProps) => {

  const {context, setContextData} = useContext(CmsContext);
  return (
    <CmsSelectable isDisabled={false} inEditMode={true} cmsKey={cmsKey} type={"text"}>
      <p 
        className={`cms-component text-cms-component ${className}`}
        style={inputs?.style}
        {...rest}
        dangerouslySetInnerHTML={{__html: context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]?.["text"]}}
      >
        {/* {context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]["text"]} */}
      </p>
    </CmsSelectable>
  )
}
