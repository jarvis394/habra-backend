import { Injectable, BadRequestException } from '@nestjs/common'
import { MakeRequestDto } from './dto/make-request.dto'
import { makeRequest } from 'habra-auth'

export const rootMessage = `<p>Hello World! This is a proxy for project called <b>\'habra.\'</b>.</p>
<p>Visit the GitHub page here: <a href="https://github.com/jarvis394/habra">click</a></p>`

@Injectable()
export class AppService {
	getRootMessage(): string {
		return rootMessage
	}

	async makeRequest(data: MakeRequestDto): Promise<Error | Response> {
		try {
			const requestParams: Record<string, any> = JSON.parse(data.request || '{}')
			const response = await makeRequest({
				token: data.token,
				method: data.method,
				requestParams
			})

			return response
		} catch (e) {
			throw new BadRequestException('Wrong JSON format for `request` field')
		}
	}
}
