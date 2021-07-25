export class MakeRequestDto {
	connectSID: string
	csrfToken?: string
	method: string
	requestParams?: string
}
