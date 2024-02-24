import { app } from '@azure/functions';
import { chat } from './functions/chat';

app.http('chat', {
  methods: ['GET', 'POST'],
  route: 'chat',
  authLevel: 'anonymous',
  handler: chat
});