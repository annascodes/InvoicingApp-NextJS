'use server'

import { auth } from "@clerk/nextjs/server";
import { Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAction(formData:FormData) {
     
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User is not authenticated.");
    }
  
    const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
    const description = formData.get('desc') as string;

    const results = await db.insert(Invoices).values(
        {
            value,
            description,
            userId,
            status: 'open'
        }
    ).returning(
        {
            id:Invoices.id
        }
    )
    redirect(`/invoices/${results[0].id}`)
}


export async function updateStatusAction(formData:FormData) {
    console.log('-----------------------inside updateStatusAction')
    const {userId} = await auth()
    if(!userId){
        throw new Error('no userId in (updateStatusAction) of action.ts')
    }

    const id = formData.get('id') as string;
    const status = formData.get('status') as Status;

    const results = await db.update(Invoices)
    .set({status})
    .where(
        and(
            eq(Invoices.id, parseInt(id)),
            eq(Invoices.userId, userId)
        )
    )
    revalidatePath(`/invoices/${id}`)
    console.log(results)
}