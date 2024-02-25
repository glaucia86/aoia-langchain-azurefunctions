import { InvocationContext } from "@azure/functions";

export function logger(context: InvocationContext, message: string): void {
  context.log(message);
}