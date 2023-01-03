import { Either, Right } from 'purify-ts'
import { GenerationService } from 'src/adapters/secondary/generation/GenerationService'
import { Dependencies } from '../interface/core.interface'
import { Usecase } from '../interface/usecase.interface'

export class GetGeneratedImageUsecase implements Usecase {
  generationService: GenerationService

  constructor(dependencies: Dependencies) {
    const { generationService } = dependencies
    this.generationService = generationService
  }

  async execute(
    params: Record<string, any> & { input: string },
  ): Promise<Either<Error, Record<string, any>>> {
    const result = await this.generationService.generateImage(params.input)
    if (result.isLeft()) {
      return result
    }

    return Right({
      ...params,
      generated: result.orDefault(''),
    })
  }
}
