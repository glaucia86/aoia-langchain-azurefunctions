import { getAzureOpenAIConfig } from '../utils/azureOpenAIConfig.util';
import { logger } from '../utils/logging.util';
import { InvocationContext } from '@azure/functions';

export const chatService = {
  async getAnswer(question: string, context: InvocationContext): Promise<string | null> {
    const model = getAzureOpenAIConfig();
    const prompt = `Question: ${question}\nAnswer`;
    logger(context, `Sending prompt to model: ${prompt}`);

    try {
      const response = await model.invoke(prompt);
      logger(context, `Model response: ${response}`);

      return response;
    } catch (error) {
      logger(context, `Error in chatService.getAnswer: ${error}`);
      throw error;
    }
  }
}
