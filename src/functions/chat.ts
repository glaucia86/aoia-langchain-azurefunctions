import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { AzureOpenAI } from "@langchain/azure-openai";
import * as dotenv from 'dotenv';

dotenv.config();

export async function chat(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const requestBody: any = await request.json();

        if (!requestBody || !requestBody.question) {
            return {
                status: 400,
                jsonBody: {
                    error: 'No question provided'
                }
            };
        }

        const question = requestBody.question;

        const model = new AzureOpenAI({
            azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT || "",
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY || "",
            azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME || "",
            modelName: 'gpt-35-turbo',
            maxTokens: 50,
            maxRetries: 1,
            temperature: 0.2,
        });

        const prompt = `Question: ${question}\nAnswer: `;
        context.log(`Sending prompt to model: ${prompt}`);

        const promptResponse = await model.invoke(prompt);
        context.log(`Prompt Response: ${JSON.stringify(promptResponse)}`);

        if (promptResponse) {
            return {
                status: 200,
                jsonBody: {
                    promptResponse
                }
            }
        } else {
            return {
                status: 404,
                jsonBody: {
                    error: 'No response from the model'
                }
            }
        }
    } catch (error: unknown) {
        const err = error as Error;
        context.error(`Error when processing chat request...: ${err.message}`);

        return {
            status: 500,
            jsonBody: {
                error: 'An error occurred while processing the chat request.'
            }
        };
    }
};
