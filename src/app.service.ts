import { Injectable, BadRequestException } from '@nestjs/common'
import { MakeRequestDto } from './dto/make-request.dto'
import { GetAccountAuthDataDto } from './dto/get-account-auth-data.dto'
import { makeRequest, getAccountAuthData, getCSRFToken } from 'habra-auth'
import { AxiosResponse } from 'axios'
import { GetCSRFTokenDto } from './dto/get-csrf-token.dto'
import { AccountAuthDataResponse } from './interfaces/AccountAuthDataResponse'

export const rootMessage = `<p>Hello World! This is a proxy for project called <b>\'habra.\'</b>.</p>
<p>Visit the GitHub page here: <a href="https://github.com/jarvis394/habra">click</a></p>`

@Injectable()
export class AppService {
	getRootMessage(): string {
		return rootMessage
	}

	async getAccountAuthData(
		data: GetAccountAuthDataDto
	): Promise<AccountAuthDataResponse> {
		const authData = await getAccountAuthData(data)
		return authData
	}

	async getCSRFToken(data: GetCSRFTokenDto): Promise<string> {
		const csrfToken = await getCSRFToken(data)
		return csrfToken
	}

	async makeRequest(data: MakeRequestDto): Promise<Error | unknown> {
		try {
			const {
				connectSID,
				csrfToken,
				version,
				requestParams,
				method,
			} = data
			const response = await makeRequest({
				connectSID,
				csrfToken,
				method,
				requestParams,
				version,
			})

			return response.data
		} catch (e) {
			throw new BadRequestException('Bad JSON format for `requestParams`')
		}
	}
}
