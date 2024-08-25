# AI Learning Platform

Welcome to the AI Learning Platform! This Next.js application enhances your learning experience by leveraging the power of AI. Our platform offers two primary functionalities:

1. **Flashcard Generation**: Utilize the OpenAI API to automatically generate flashcards on any topic, making your study sessions more effective and efficient.
2. **Document Interaction**: Use Retrieval-Augmented Generation (RAG) to interact with your documents, allowing you to ask questions and gain a deeper understanding of your study material.

## Backend
The backend of the AI Learning Platform is designed to support various functionalities that enhance the learning experience. It leverages OpenAI’s API for flashcard generation and uses Retrieval-Augmented Generation (RAG) for interacting with document content. The backend is implemented using JavaScript (Node.js) and provides several key routes.

#### 1. ** Flashcard Generation**

- Uses the OpenAI API to generate flashcards.
- Sends a request with the topic to OpenAI and processes the response to extract flashcards.

#### 2. **Document Interaction**

- **RAG System:**
    - TextLoader: Loads document content into a suitable format.
    - Vector Store: Creates vector representations of document content for querying.
    - Retriever and Generator: Uses RAG to retrieve relevant information and generate responses based on user queries.
- **File Handling:**
    - Manages file uploads, extracts content, and converts it for RAG processing.

## Technology Stack
- **Node.js:** Runtime environment for executing JavaScript on the server side.
- **Next.js:** Web framework for handling routing and middleware.
- **OpenAI API:** Used for generating flashcards and processing natural language queries.
- **Langchain RAG System:** Combines document retrieval and generation for answering user questions based on uploaded content.

## Prerequisites

Before running this application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MelissaMak-03/AI_Learning.git

2. **Install Dependencies**

     ```bash
   yarn install or npm install

3. **Configure Environment Variables**

    OPENAI_API_KEY=your_openai_api_key
    LANGCHAIN_API_KEY= your_langchain_api_key

4. **Run the Development Server**
    First, run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
