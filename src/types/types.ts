export interface EditableComponent {
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