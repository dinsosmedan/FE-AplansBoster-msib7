import { type IArea } from '@/api/area.api'

export interface IWorshipPlace {
  id: string
  name: string
  type: string
  address: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
  picName: string
  picPhone: string
  status: null | string
  note: null | string
  createdAt: string
  updatedAt: string
}
