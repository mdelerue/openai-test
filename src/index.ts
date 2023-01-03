import { Dependencies } from './domain/interface/core.interface'
import { OpenAIGenerationService } from './adapters/secondary/generation/OpenAiGenerationService'

import { GetGeneratedContentUsecase } from './domain/usecases/GetGeneratedContentUsecase'
import { DefaultCommandLineService } from './adapters/primary/command/DefaultCommandLineService'
import yargs from 'yargs/yargs'
import { GetGeneratedImageUsecase } from './domain/usecases/GetGeneratedImageUsecase'

const dependencies: Dependencies = {
  generationService: new OpenAIGenerationService(),
}
const main = async (): Promise<void> => {
  const terminalService = new DefaultCommandLineService({
    generateContent: new GetGeneratedContentUsecase(dependencies),
    generateImage: new GetGeneratedImageUsecase(dependencies),
  })

  const argv = yargs(process.argv.slice(2))
    .command('textContent', 'generate text content based on input', {
      content: {
        description: 'input',
        alias: 'c',
        type: 'string',
      },
    })
    .command('imageContent', 'generate image content based on input', {
      content: {
        description: 'input',
        alias: 'i',
        type: 'string',
      },
    })
    .help().argv

  await terminalService.parseInput(argv)
}

main()
