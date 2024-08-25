import dotenv from 'dotenv';
import { OpenAIEmbeddings, ChatOpenAI} from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getStorage, ref, getBytes } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


dotenv.config({ path: './.env.local' });

const fs = require('fs');
const path = require('path');
const os = require('os');

  // Load data from document and create vector store
  const createVectorStore = async  (fileContent)=> {
    const tempFilePath = path.join(os.tmpdir(), 'tempfile.txt');
    fs.writeFileSync(tempFilePath, fileContent);
    const loader = new TextLoader(tempFilePath);

    // const loader = new TextLoader(fileContent);
  const docs = await loader.load();

    // Text Splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  
  const documents = [{ text: fileContent }];
//   const splitDocs = await splitter.splitDocuments([documents]);
  const splitDocs = await splitter.splitDocuments(docs);
    // Instantiate Embeddings function
  const embeddings = new OpenAIEmbeddings();
  
  // Create Vector Store
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  return vectorstore
};

//create retrieval chains

const createChain = async (vectorStore) =>{
    const model = new ChatOpenAI({
        modelName:"gpt-4o-mini",
        temperature: 0,
    });
    // Create prompt
    
    const prompt = ChatPromptTemplate.fromTemplate(
        `Answer the user's question from the following context: 
        Context: {context}
        chat History: {chat_history}
        Question: {input}`
      );
      
    
    // Create Chain
    const chain = await createStuffDocumentsChain({
        llm: model,
        prompt: prompt,
      });

        // Create a retriever from vector store
     const retriever = vectorStore.asRetriever({ k: 2 });

  // Create a retrieval chain
    const conversationChain = await createRetrievalChain({
  combineDocsChain: chain,
  retriever,
});
    return conversationChain;
    
};

export async function POST(req){
    try {
       

        const {question, fileContent } = await req.json();
         // Create vector store from file content
         const vectorStore = await createVectorStore(fileContent);
         const chain = await createChain(vectorStore);

        const response = await chain.invoke({
            input: question,
        });
        return new Response(JSON.stringify({ answer: response.answer }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        } catch(error){
            console.error('Error:', error);
            return new Response(JSON.stringify({ error: 'Error processing the request.' }), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        }
}
  
