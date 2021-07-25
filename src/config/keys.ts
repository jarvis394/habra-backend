import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

type EnvConfig = Record<string, string>

/** Joi validation schema for .env file */
const envVarsSchema: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().default(3000),
})

/**
 * Validates config by Joi schema
 * @param config Enviroment config
 */
const validate = (config: EnvConfig): EnvConfig => {
  const { error, value: validatedEnvConfig } = envVarsSchema.validate(config)
  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }
  return validatedEnvConfig
}

const filePath: string = path.resolve(__dirname, '../../.env')
const env: EnvConfig = validate(dotenv.parse(fs.readFileSync(filePath)))

/**
 * Application main port
 */
export const PORT = Number(env.PORT)

export const CLIENT_ID = '85cab69095196f3.89453480'
