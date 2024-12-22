import { AttributeValue, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand , DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Todo } from "./Todo";


const client = new DynamoDBClient({
	region: "us-east-2",
	credentials: {
		accessKeyId: import.meta.env.VITE_aws_access_key_id,
		secretAccessKey: import.meta.env.VITE_aws_secret_access_key,
	},
});
const docClient = DynamoDBDocumentClient.from(client);
const tableName: string = "todos-todosTable-dev";

const SORT_ORDER_ID = "_sortOrder";

class TodosTable{
	async getAllTodos(): Promise<Todo[]> {
		
		const scanCommand = new ScanCommand({
			TableName: tableName,
			FilterExpression: "id <> :id",
			ExpressionAttributeValues: {
				":id": SORT_ORDER_ID
			},
		});
		
		const response = await docClient.send( scanCommand );
		console.log(response);
		
		if( !response.Items ){
			throw new Error("failed to get stuff from DB");
		}
		
		const todos:Todo[] = response.Items as Todo[];
		return todos;
		
	}
	
}

const todosTable:TodosTable = new TodosTable();
export { todosTable }