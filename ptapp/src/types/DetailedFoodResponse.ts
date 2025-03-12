import FoodResponse from './FoodResponse'

export default interface DetailedFoodResponse {
  id: number
  quantity: number
  food: FoodResponse
}
