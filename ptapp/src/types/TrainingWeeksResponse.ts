import TrainingDayResponse from './TrainingDayResponse'
import UserResponse from './UserResponse'

export default interface TraininWeekResponse {
  id: number
  name: string
  customerResponse: UserResponse
  trainingDays: TrainingDayResponse[]
}
