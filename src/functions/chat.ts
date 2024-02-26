import { ChatRequestBody } from './../model/chatRequestBody.model';
import { HttpRequest, InvocationContext } from "@azure/functions";
import { chatService } from "../services/chat.services";
import { badRequest, internalServerError, ok } from "../utils/httpResponse.util";
import { logger } from "../utils/logging.util";

import * as dotenv from 'dotenv';

dotenv.config();

export async function chat(request: HttpRequest, context: InvocationContext) {
  try {
    const requestBody = await request.json() as ChatRequestBody;

    if (!requestBody.question) {
      return badRequest('No question provided');
    }

    const promptResponse = await chatService.getAnswer(requestBody.question, context);

    return ok({ promptResponse });
  } catch (error) {
    logger(context, `Error when processing chat request: ${error}`);
    return internalServerError('An error occurred while processing the chat request!');
  }
};
