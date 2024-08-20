"use client";

/*ログインUIの追加（下2行）*/
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

// generate the data client 
const client = generateClient<Schema>();

/*ラベルの出力をするために記述？*/
/*todos:状態値、setTodos:更新関数*/
export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]["label"]>>([]);
  /*const [labels, setlabels] = useState([]);*/


  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
      /*next: (data) => setlabels([...data.items]),*/
    });
  }

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
      <button onClick={createTodo}>new task</button>
      <ul>
        {todos.map((todo) => (
          /*delete処理追加*/
          <li onClick={() => deleteTodo(todo.id)}
          /*label表示追加*/
          key={todo.id}>{todo.content}{todo.label}</li>
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
