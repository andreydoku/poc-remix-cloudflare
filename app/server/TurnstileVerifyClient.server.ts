const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = import.meta.env.VITE_turnstile_secret_key;

class TurnstileVerifyClient{
	
	
	async verifyToken( token: string|null ): Promise<boolean> {
		
		if( !token ){
			return false;
		}
		
		const res = await fetch(verifyEndpoint, {
			method: 'POST',
			body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		})
		
		const data = await res.json();
		console.log({ responseFromVerifyEndpoint: data });
		
		
		// @ts-ignore
		return data.success;
		
	}
}

export const turnstileVerifyClient = new TurnstileVerifyClient();
		