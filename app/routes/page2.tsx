import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { emailClient } from "~/server/EmailClient.server";


export async function action({ request, params }: ActionFunctionArgs) {

	await emailClient.sendEmail();
	
	const responseBody = {
		emailSentSuccess: true
	}
    return responseBody;
    
}


export default function Page1() {
	
	const actionData = useActionData<typeof action>();
	
	
	return (
		<div className="w-full max-w-[1440px] mx-auto py-10" >
			<h1 className="mb-5 text-2xl">Page 2</h1>

			<Form method="post">
					
				<button className="inline-flex h-12 items-center justify-center rounded-md bg-blue-400 hover:bg-blue-300 px-6 font-medium text-neutral-900 shadow-lg shadow-neutral-500/20 transition active:scale-95"  type="submit" >
					Send Email
				</button>
				
			</Form>
			
			
			
		</div>
	)
}
