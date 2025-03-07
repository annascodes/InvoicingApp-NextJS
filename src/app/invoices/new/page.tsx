"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { sql } from 'drizzle-orm'
import { db } from "@/db"

import { createAction } from "@/app/actions"
import SubmitButton from "@/components/SubmitButton"
import { startTransition, SyntheticEvent, useState } from "react"

import Form from 'next/form'


export default function Dashboard() {

    // const results = await db.execute(sql`SELECT current_database()`)
    const [state, setState] = useState('ready')

    async function handleOnSubmit(event: SyntheticEvent) {
        if (state === 'pending') {
            event.preventDefault()
            return;
        }
        setState('pending')

        // const target = event.target as HTMLFormElement // tofind

        // startTransition(async () => {
        //     const formData = new FormData(target)
        //     await createAction(formData)
        //     console.log('hey')
        // })
    }


    return (
        <main className="max-w-5xl mx-auto my-5 p-2">
            <div className="my-5">
                <h1 className="text-sm">Invoices</h1>
                <h1 className="text-2xl font-bold ">Create a new invoice</h1>
            </div>

            {/* <div className="bg-neutral-700 text-neutral-300 p-5 rounded-lg ">
                <pre>
                    {JSON.stringify(results, null, 2)}
                </pre>
            </div> */}

            

            <form action={createAction} onSubmit={handleOnSubmit} className="md:max-w-xs flex flex-col gap-2">
                <div>
                    <Label htmlFor="name" className="text-sm mb-2">Billing Name</Label>
                    <Input id='name' name="name" type="text" />
                </div>
                <div>
                    <Label htmlFor="email" className="text-sm mb-2">Billing Email</Label>
                    <Input id='email' name="email" type="text" />
                </div>
                <div>
                    <Label htmlFor="value" className="text-sm mb-2">Value</Label>
                    <Input id='value' name="value" type="text" />
                </div>
                <div>
                    <Label htmlFor="desc" className="text-sm mb-2">Description</Label>
                    <Textarea id="desc" name="desc"> </Textarea>
                </div>

                <SubmitButton />

            </form>



        </main>
    )
}