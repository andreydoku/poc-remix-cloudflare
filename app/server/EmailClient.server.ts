import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Create SES service object.
const sesClient = new SESClient({ 
	region: "us-east-2",
	credentials: {
		accessKeyId: import.meta.env.VITE_aws_access_key_id,
		secretAccessKey: import.meta.env.VITE_aws_secret_access_key,
	},
});

class EmailClient{
	async sendEmail(){
		
		const input = {
			"Source": "andreydoku@gmail.com",
			"Destination": {
				"ToAddresses": [
					"andreydoku@gmail.com"
				],
				"CcAddresses": [],
				"BccAddresses": [],
			},
			"Message": {
				"Body": {
					"Html": {
						"Data": "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
					},
				},
				"Subject": {
					"Data": "Test email"
				}
			},
			"ReplyToAddresses": [],
			
		};
		
		const command = new SendEmailCommand(input);
		const response = await sesClient.send(command);
		console.log({ response });
		return response;
	}
}

const emailClient:EmailClient = new EmailClient();
export { emailClient }