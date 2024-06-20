import { useContext } from "react";
import { EditableComponentType } from "../../types/types";
import { CmsContext } from "../util/context";
import CmsSelectable from "../util/CmsSelectable";

export interface CmsTextProps extends EditableComponentType {
  alt?: string,
}


export const CmsImage = ({
  //This components input fields
  alt,
  //EditableComponent
  className = "", 
  cmsKey,
  ...rest
  
}: CmsTextProps) => {

  const {context, setContextData} = useContext(CmsContext);
  return (
    <CmsSelectable isDisabled={false} inEditMode={true} cmsKey={cmsKey} type={"image"}>
      <img 
        className={`cms-component image-cms-component ${className}`}
        src={context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]?.["src"]}
        alt={alt || "image"}
        {...rest}
      />
    </CmsSelectable>
  )
}
