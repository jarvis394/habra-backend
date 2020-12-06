import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService, rootMessage } from './app.service'

describe('AppController', () => {
	let app: TestingModule

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile()
	})

	describe('getRootMessage', () => {
		it('should return root message', () => {
			const appController = app.get<AppController>(AppController)
			expect(appController.getRootMessage()).toBe(rootMessage)
		})
	})
})
