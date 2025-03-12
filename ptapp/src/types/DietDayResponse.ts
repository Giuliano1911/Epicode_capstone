import MealResponse from './MealResponse'

export default interface DietDayResponse {
  id: number
  day: string
  meals: MealResponse[]
}
