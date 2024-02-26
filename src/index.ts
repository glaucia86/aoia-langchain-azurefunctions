import { app } from '@azure/functions';
import { chat } from './functions/chat';

app.http('chat', {
  methods: ['POST'],
  route: 'chat',
  authLevel: 'anonymous',
  handler: chat
});