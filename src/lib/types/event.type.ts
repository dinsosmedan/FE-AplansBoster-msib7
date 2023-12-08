export interface IType {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}
export interface IEvent {
  success: boolean
  message: string
  id: string
  type: IType
  eventDescription: string
  startDate: string
  endDate: string
  isActive: boolean
  batch: string
  quota: string
  createdAt: string
  updatedAt: string
}
