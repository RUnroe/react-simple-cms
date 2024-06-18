export interface EditableComponent {
  cmsKey: string,
  className?: string,
}

export interface CmsContextType {
  siteData: Object,
  currentPageKey: string,
  selectedComponent: {
    cmsKey: string,
    data: any,
  },
  inEditMode: boolean
}


export interface CmsSelectedComponentType {
  cmsKey: null,
  data: null,
}