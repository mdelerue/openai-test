import { Either } from 'purify-ts'

export interface CommandLineService {
  parseInput: (args: string[]) => Promise<Either<Error, null>>
}
