import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { MakeRequestDto } from './dto/make-request.dto'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getRootMessage(): string {
		return this.appService.getRootMessage()
	}

	@Post()
	async makeRequest(@Body() makeRequestDto: MakeRequestDto): Promise<Response | Error> {
		return this.appService.makeRequest(makeRequestDto)
	}
}
