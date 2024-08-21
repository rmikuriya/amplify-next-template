"use client";

/*ログインUIの追加（下2行）*/
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
// Path to your backend resource definition
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
//outputs.json file contains your API's endpoint information and auth configurations
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

// generate the data client 
//定義されたスキーマに従ってDynamoDBとの連携（書き込み）が行われる
const client = generateClient<Schema>({
  //To apply the same authorization mode on all requests from a Data client, specify the "authMode" parameter on the "generateClient" function.
  //authMode: 'apiKey'
  //authMode: 'userPool'
});

/*todos:状態値、setTodos:更新関数*/
export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]/*["label"]*/>>([]);
  /*const [labels, setlabels] = useState([]);*/


  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  //コンポーネントを外部システムと同期
  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("追加したいタスク"),
      label: window.prompt("ラベルの種類"),
      //追加（仮）
      //isDone:false
    });
    //userPoolの認証の場合はここに記載。
    //Set authorization mode on the request-level?
    authMode: 'userPool'

    //追加（仮）
    listTodos();
        
    /*.secondaryIndexes((index) => [index("txtlabel")])*/
  }
  
  /*delete関数追加*/
  function deleteTodo(id: string){
  	client.models.Todo.delete({ id })
  }

  return (
    /*ログインUIの追加*/
    <Authenticator>
      {({ signOut, user }) => (
  
    <main>
      <h1>Todoリストの追加</h1>
      <h2>{user?.signInDetails?.loginId}</h2>
      <button onClick={createTodo}>new task</button>
      <ul>
        {todos.map((todo) => (
          /*delete処理追加*/
          <li onClick={() => deleteTodo(todo.id)}
          /*label表示追加*/
          key={todo.id}>{todo.content}  [{todo.label}]</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
     /*ログインUIの追加*/ 
     <button onClick={signOut}>Sign out</button>
    </main>
    )}
    </Authenticator>
    
  );
}
