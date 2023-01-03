import { Either } from 'purify-ts'
import { Usecase } from 'src/domain/interface/usecase.interface'
import { CommandLineService } from './CommandLineService'

export class DefaultCommandLineService implements CommandLineService {
  constructor(
    private readonly usecases: {
      generateContent: Usecase
      generateImage: Usecase
    },
  ) {}

  async parseInput(args: Record<string, any>): Promise<Either<Error, null>> {
    if (args.textContent) {
      const result = await this.usecases.generateContent.execute({
        input: args.textContent,
      })

      if (result.isLeft()) {
        return result
      }

      console.log(result.orDefault({ generated: '' }).generated)
    } else {
      const result = await this.usecases.generateImage.execute({
        input: args.imageContent,
      })

      if (result.isLeft()) {
        return result
      }

      console.log(result.orDefault({ generated: '' }).generated)
    }
  }
}
