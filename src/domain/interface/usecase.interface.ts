import { Either } from 'purify-ts'

export interface Usecase {
  execute: (
    params: Record<string, any>,
  ) => Promise<Either<Error, Record<string, any>>>
}
