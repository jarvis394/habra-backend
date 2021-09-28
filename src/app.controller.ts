import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query,
	Res,
} from '@nestjs/common'
import { AppService } from './app.service'
import { MakeRequestDto } from './dto/make-request.dto'
import nodeHtmlToImage from 'node-html-to-image'
import socialPreviewHTML from './config/socialPreviewHTML'
import { Response as ExpressResponse } from 'express'
import { GetAccountAuthDataDto } from './dto/get-account-auth-data.dto'
import { AccountAuthDataResponse } from './interfaces/AccountAuthDataResponse'
import { GetCSRFTokenDto } from './dto/get-csrf-token.dto'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getRootMessage(): string {
		return this.appService.getRootMessage()
	}

	@Get('/social')
	async getSocialPreview(
		@Query('t') title: string,
		@Query('s') subtitle: string,
		@Res() response: ExpressResponse
	) {
		const image = await nodeHtmlToImage({
			html: socialPreviewHTML(title, subtitle),
		})
		return response.end(image)
	}

	@Post('/getAccountAuthData')
	async getAccountAuthData(
		@Res({ passthrough: true }) response: ExpressResponse,
		@Body() getAccountAuthDataDto: GetAccountAuthDataDto
	): Promise<AccountAuthDataResponse> {
		response.status(HttpStatus.OK)
		return await this.appService.getAccountAuthData(getAccountAuthDataDto)
	}

	@Post('/getCSRFToken')
	async getCSRFToken(
		@Res({ passthrough: true }) response: ExpressResponse,
		@Body() getCSRFTokenDto: GetCSRFTokenDto
	): Promise<string> {
		response.status(HttpStatus.OK)
		return await this.appService.getCSRFToken(getCSRFTokenDto)
	}

	@Post('/makeRequest')
	async makeRequest(
		@Res({ passthrough: true }) response: ExpressResponse,
		@Body() makeRequestDto: MakeRequestDto
	): Promise<unknown | Error> {
		response.status(HttpStatus.OK)
		return await this.appService.makeRequest(makeRequestDto)
	}
}
