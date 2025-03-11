import ExerciseResponse from './ExerciseResponse'

export default interface DetailedExerciseResponse {
  id: number
  reps: number
  sets: number
  rest: number
  exercise: ExerciseResponse
}
