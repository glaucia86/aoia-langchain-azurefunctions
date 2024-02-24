# Azure OpenAI + LangChain.js + Azure Functions

A repository for study case how to use Azure OpenAI + LangChain + Azure Function with JavaScript/TypeScript

## How to test the sample?

1. Clone the repository

> obs.: you need to install the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash) to run the Azure Functions locally. We recommend you to install the Azure Functions extension for Visual Studio Code, which includes the Azure Functions Core Tools.

> obs.: this sample is using the V4 of Programming Model of Azure Functions. So you need to use the Node.js LTS version to run the sample.

2. Install the dependencies

```bash
npm install
```

3. Then, create a `.env` file in the root of the project and add the following environment variables:

```env
AZURE_OPENAI_API_ENDPOINT=""
AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME=""
AZURE_OPENAI_API_KEY=""
```

4. Run the sample

```bash
npm run start
```

5. Once you run the sample, you can test the Azure Function using the following URL:

```bash
http://localhost:7071/api/chat
```

6. Open the `POSTMAN` or `Insonmia` and create a new request with the following settings:

* Set the HTTP method to `POST`
* Set the URL to `http://localhost:7071/api/chat`
* Under the Headers section, set `Content-Type` to `application/json`
* In the Body section, select `raw` and enter the following JSON content:

```json
{
  "question": "What is the United States currency?"
}
```

7. Click the `Send` button and you should receive a response from the terminal where the Azure Functions is running.

[![chat-functions.gif](https://i.postimg.cc/xdVK8bFt/chat-functions.gif)](https://postimg.cc/CRJZ6d0q)





