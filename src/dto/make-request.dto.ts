import { AxiosRequestConfig } from 'axios'

export class MakeRequestDto {
	connectSID: string
	csrfToken?: string
	method: string
	version?: 1 | 2
	requestParams?: AxiosRequestConfig
}