import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Client } from 'ts-postgres';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const client = new Client({
        user: 'postgres',
        host: 'database-1.czrru5xpxnql.eu-central-1.rds.amazonaws.com',
        database: '',
        password: '',
        port: 5432,
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM public.users');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'users from postgres rds',
                result: result.rows,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
