import DietDayResponse from './DietDayResponse'
import UserResponse from './UserResponse'

export default interface DietWeekResponse {
  id: number
  name: string
  customerResponse: UserResponse
  dietDays: DietDayResponse[]
}
