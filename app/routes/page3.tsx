import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useEffect, useRef, useState } from 'react';
import { turnstileVerifyClient } from "~/server/TurnstileVerifyClient.server";

export async function action({ request }: ActionFunctionArgs ){
	
	const body = await request.formData();
	//console.log( body );
	
	const firstName = body.get("firstName");
	const lastName = body.get("lastName");
	const token = body.get("cf-turnstile-response") as string;
	
	//console.log({ firstName , lastName });
	console.log({ token });
	
	const validToken = await turnstileVerifyClient.verifyToken( token );
	if( !validToken ){
		return new Response("get fuckd" , { status: 401 });
	}
	
	console.log("sending email... ");
	 
	
	return new Response("email sent successfully!" , { status: 200 });;
	
}

export default function Page3() {
	
	const actionData = useActionData();
	console.log({ actionData });
	useEffect(() => {
		
		if( actionData ){
			refTurnstile.current?.reset(); // <------------- After each submit, recycling turnstile for next usage.
			
			// @ts-ignore
			formRef.current?.reset();//clear form
		}
		
	}, [actionData])
	
	const formRef = useRef(null);
	
	const turnstileSiteKey = import.meta.env.VITE_turnstile_site_key;
	console.log({ turnstileSiteKey });

	const [canSubmit, setCanSubmit] = useState(false); // <------------- We will use this state to enable submit button if Turnstile says all is well.
	const refTurnstile = useRef<TurnstileInstance>(null); // <------------- Ref to Turnstile component. We will use this to reset Turnstile after each submit.

	return (
		<div className="w-full max-w-[1440px] mx-auto py-10" >
			
			<h1 className="mb-5 text-2xl">Page 3</h1>
			
			<Form method="post" ref={formRef}  className="grid gap-2 grid-cols-[400px]">
				<input className="p-2 rounded-md my-2 text-slate-800 bg-white" type="text" name="firstName" placeholder="First Name" />
				<input className="p-2 rounded-md my-2 text-slate-800 bg-white" type="text" name="lastName" placeholder="Last Name" />
				
				<Turnstile
					id='turnstile-1'
					ref={refTurnstile}
					siteKey={turnstileSiteKey}
					onSuccess={() => setCanSubmit(true)}
				/>
				
				<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer disabled:bg-blue-200 disabled:text-slate-400 disabled:hover:bg-blue-200 disabled:cursor-default" type="submit" disabled={!canSubmit} >Create</button>
				
			</Form>
			
		</div>
	)
}
