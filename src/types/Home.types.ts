export interface HomeItemProp {
  itemType?: string
  options?: { hideTitle: boolean }

  sectionId?: string

  sectionType?: string

  title?: string

  viewType?: string
}
export interface HomeProp {
  hasMore: boolean
  total: number
  items: []
}
