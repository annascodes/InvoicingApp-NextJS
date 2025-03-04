"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { boolean } from "drizzle-orm/mysql-core";
import { Heart } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { useState } from "react";

export default   function TodoList() {
    const [todos, setTodos] = useState(["Learn React"]);
    const [like, setLike] = useState(false)

    const [optimisticTodos, addOptimisticTodo] = useOptimistic(
        todos,
        (currentTodos:string[], newTodo:string) => [...currentTodos, newTodo]
    );
    const [oLike, setoLike]= useOptimistic(
        like,
        ( _ , flag:boolean)=>flag
    )

    async function addTodo(newTodo:string) {
        startTransition(() => {
            addOptimisticTodo(newTodo);
          });
      

        const response:string[] = await new Promise((resolve) =>
            setTimeout(() => resolve([...todos, newTodo]), 3000)
        );


        setTodos(response);
    }

    async function handleLike() {
        startTransition(
            ()=>{
                setoLike(like? false:true)
            }
        )

       
        const response:boolean = await new Promise((resolve)=>
        setTimeout(() => {
            resolve(like? false:true)
        }, 2000))

        setLike(response)
    }

    return (
        <div>
            <h1 className="text-center text-sm tracking-widest">( experimental page ) </h1>
            <Button asChild>
                <button onClick={() => addTodo(`Master Next.js ${todos.length+1}`)}>Add Todo</button>

            </Button>
            <ul>
                {optimisticTodos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>

            <hr className="my-5" />

            <h1>Hit like button</h1>

            <button onClick={handleLike} className={cn((oLike || like) && 'text-red-600 bg-red-400 p-1 rounded-full')}>
                <Heart/>
            </button>
        </div>
    );
}
 