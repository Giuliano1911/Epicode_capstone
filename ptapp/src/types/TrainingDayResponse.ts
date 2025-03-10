import DetailedExerciseResponse from './DetailedExerciseResponse'

export default interface TrainingDayResponse {
  id: number
  day: string
  detailedExercises: DetailedExerciseResponse[]
}
