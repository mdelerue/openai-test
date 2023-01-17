import { Configuration, OpenAIApi } from 'openai'
import { Either, Left, Right } from 'purify-ts'
import { config } from '../../../config/config'
import { GenerationService } from './GenerationService'

export class OpenAIGenerationService implements GenerationService {
  configuration: Configuration
  openAi: OpenAIApi

  constructor() {
    this.configuration = new Configuration({
      apiKey: config.get('OPENAI_API_KEY'),
    })
    this.openAi = new OpenAIApi(this.configuration)
  }

  async generateText(input: string): Promise<Either<Error, string>> {
    try {
      const {
        data: { usage, choices },
      } = await this.openAi.createCompletion({
        model: 'text-davinci-003',
        prompt: input,
        temperature: 0.3,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

      console.log(`Total tokens spent: ${usage.total_tokens}`)

      return Right(choices[0].text)
    } catch (err) {
      console.log(err)
      return Left(err)
    }
  }

  async generateImage(input: string): Promise<Either<Error, string>> {
    try {
      const {
        data: { data: urls },
      } = await this.openAi.createImage(
        {
          prompt: input,
          n: 1,
          size: '512x512',
          //response_format: 'b64_json',
          response_format: 'url',
        },
        {
          validateStatus: function (status) {
            return status < 500 // Resolve only if the status code is less than 500
          },
        },
      )

      return Right(urls[0].url)
    } catch (err) {
      console.log(err)
      return Left(err)
    }
  }
}
