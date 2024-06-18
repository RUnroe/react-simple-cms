export interface EditableComponent {
  cmsKey: string,
  className?: string,
}

export interface CmsContextType {
  siteData: {},
  currentPage: {},
  selectedComponent: {
    pageKey: null,
    dataKey: null,
    data: null,
  },
  inEditMode: boolean
}


export interface CmsSelectedComponentType {
  pageKey: null,
  cmsKey: null,
  data: null,
}