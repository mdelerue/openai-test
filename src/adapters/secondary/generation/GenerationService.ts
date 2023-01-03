import { Either } from 'purify-ts'

export interface GenerationService {
  generateText: (input: string) => Promise<Either<Error, string>>
  generateImage: (input: string) => Promise<Either<Error, string>>
}
