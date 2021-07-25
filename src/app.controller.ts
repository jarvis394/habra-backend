import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { MakeRequestDto } from './dto/make-request.dto'
import nodeHtmlToImage from 'node-html-to-image'
import socialPreviewHTML from './config/socialPreviewHTML'
import { Response as ExpressResponse } from 'express'
import { GetAccountAuthDataDto } from './dto/get-account-auth-data.dto'
import { AxiosResponse } from 'axios'
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
	async getSocialPreview(@Query('t') title: string, @Query('s') subtitle: string, @Res() response: ExpressResponse) {
		const image = await nodeHtmlToImage({
			html: socialPreviewHTML(title, subtitle)
		})
		return response.end(image)
	}
	
	@Post()
	async getAccountAuthData(@Body() getAccountAuthDataDto: GetAccountAuthDataDto): Promise<AccountAuthDataResponse> {
		return this.appService.getAccountAuthData(getAccountAuthDataDto)
	}

	@Post()
	async getCSRFToken(@Body() getCSRFTokenDto: GetCSRFTokenDto): Promise<string> {
		return this.appService.getCSRFToken(getCSRFTokenDto)
	}

	@Post()
	async makeRequest(@Body() makeRequestDto: MakeRequestDto): Promise<AxiosResponse | Error> {
		return this.appService.makeRequest(makeRequestDto)
	}
}
