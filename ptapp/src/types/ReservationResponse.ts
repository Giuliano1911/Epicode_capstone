import UserResponse from './UserResponse'

export default interface ReservationResponse {
  id: number
  date: string
  time: string
  description: string
  customerResponse: UserResponse
}
