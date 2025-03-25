import DetailedFoodResponse from './DetailedFoodResponse'

export default interface MealResponse {
  id: number
  name: string
  detailedFoods: DetailedFoodResponse[]
}
