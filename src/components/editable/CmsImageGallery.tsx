import { useContext } from "react";
import { CmsImageType, EditableComponentType } from "../../types/types";
import { CmsContext } from "../util/context";
import CmsSelectable from "../util/CmsSelectable";

export interface CmsTextProps extends EditableComponentType {
  alt?: string,
}


export const CmsImageGallery = ({
  //This components input fields
  alt,
  //EditableComponent
  className = "", 
  cmsKey,
  ...rest
  
}: CmsTextProps) => {

  const {context, setContextData} = useContext(CmsContext);
  return (
    <CmsSelectable isDisabled={false} inEditMode={true} cmsKey={cmsKey} type={"image-gallery"}>
      <div className={`cms-component gallery-cms-component ${className}`}>
      { context.siteData?.["pages"]?.[context.currentPageKey]?.[cmsKey]?.["list"]?.map(({src, alt}: CmsImageType, index: number) => (
        <img 
        className={`image-cms-component ${className} image-${index}`}
        src={src}
        alt={alt || "image"}
        {...rest}
      />
      ))}
      </div>
    </CmsSelectable>
  )
}
