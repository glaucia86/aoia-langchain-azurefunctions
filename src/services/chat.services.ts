import { getAzureOpenAIConfig } from '../utils/azureOpenAIConfig.util';
import { logger } from '../utils/logging.util';
import { InvocationContext } from '@azure/functions';

export const chatService = {
  async getAnswer(question: string, context: InvocationContext): Promise<number[] | null> {
    const embeddings = getAzureOpenAIConfig();
    const prompt = `Question: ${question}`;
    logger(context, `Sending prompt to model: ${prompt}`);

    try {
      const promptChatResponse = await embeddings.embedQuery(prompt);

      return promptChatResponse;
    } catch (error) {
      logger(context, `Error in chatService.getAnswer: ${error}`);
      throw error;
    }
  }
}
