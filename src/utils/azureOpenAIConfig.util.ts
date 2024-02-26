import { OpenAIEmbeddings } from "@langchain/openai";

export function getAzureOpenAIConfig(): OpenAIEmbeddings {
  return new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY || "",
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION || "",
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME || "",
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME || "",
    modelName: process.env.AZURE_OPENAI_MODEL_NAME || "",
  });
}