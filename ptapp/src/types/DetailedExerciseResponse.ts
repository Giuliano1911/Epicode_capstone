import ExerciseResponse from './ExerciseResponse'

export default interface DetailedExerciseResponse {
  id: number
  reps: string
  sets: string
  rest: string
  exerciseResponse: ExerciseResponse
}
