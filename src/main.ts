import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './config/keys'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.setGlobalPrefix('habra')
	await app.listen(PORT)
}
bootstrap()
