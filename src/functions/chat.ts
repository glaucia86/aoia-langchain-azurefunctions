import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { OpenAIEmbeddings } from "@langchain/openai";
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

        const embeddings = new OpenAIEmbeddings({
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY || "",
            azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION || "",
            azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME || "",
            azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME || "",
            modelName: process.env.AZURE_OPENAI_MODEL_NAME || "",
        });

        const prompt = `Question: ${question}`;
        context.log(`Sending prompt to model: ${prompt}`);

        const promptResponse = await embeddings.embedQuery(prompt);

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
