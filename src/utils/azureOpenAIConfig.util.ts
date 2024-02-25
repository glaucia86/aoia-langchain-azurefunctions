import { AzureOpenAI } from "@langchain/azure-openai";

export function getAzureOpenAIConfig(): AzureOpenAI {
  return new AzureOpenAI({
    azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT || "",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY || "",
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME || "",
    modelName: 'gpt-35-turbo',
    maxTokens: 50,
    maxRetries: 1,
    temperature: 0.2,
  });
}