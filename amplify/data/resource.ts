//データバックエンドを構成する中心的な場所
//バックエンドのデータモデルであるa.model()などを定義
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a.model({
      content: a.string(),
      /*ラベルの属性をスキーマに追加*/
      label: a.string(),
      //追加（仮）
      //isDone: a.boolean()
    })
    //allow.publicApiKey() rule designates that anyone authenticated using an API key can create, read, update, and delete todos.
    // If you use a allow.publicApiKey() authorization rules for your data models, you need to use "apiKey" as an authorization mode.
    //.authorization((allow) => [allow.publicApiKey()]),

    //Per-user/per-owner data access
    //to restrict a record's access to a specific user. When owner authorization is configured, only the record's owner is allowed the specified operations.
    .authorization((allow) => [allow.owner()]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    /*defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },*/
   defaultAuthorizationMode: 'userPool'
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
