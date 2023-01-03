import convict from 'convict'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const config = convict({
  OPENAI_API_KEY: {
    doc: 'Key for OpenAI API',
    format: String,
    default: '',
    env: 'OPENAI_API_KEY',
  },
})

export { config }
