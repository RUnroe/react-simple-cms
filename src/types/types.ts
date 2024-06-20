export interface EditableComponentType {
  cmsKey: string,
  className?: string,
}

export interface CmsContextType {
  siteData: Object,
  currentPageKey: string,
  selectedComponent: CmsSelectedComponentType,
  inEditMode: boolean
}


export interface CmsSelectedComponentType {
  cmsKey: string,
  data: any,
  type: string,
}

export interface updateFieldType {
  field: string, 
  data: Object | String | boolean
}