'use server'

import { auth } from "@clerk/nextjs/server";
import { Customers, Invoices, Status } from "@/db/schema";
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
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;


    // though we inserting one but still gonna get an array 
    const [customer] = await db.insert(Customers).values(
        {
            name,
            email,
            userId,    
        }
    ).returning(
        {
            id:Customers.id,
            name: Customers.name,
        }
    )

    const results = await db.insert(Invoices).values(
        {
            value,
            description,
            userId,
            customerId:customer.id,
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
    revalidatePath(`/invoices/${id}`,'page')
    console.log(results)
}

export async function deleteInvoiceAction(formData:FormData) {
    console.log('-----------------------inside deleteInvoiceAction')
    const {userId} = await auth()
    if(!userId){
        throw new Error('no userId in (updateStatusAction) of action.ts')
    }

    const id = formData.get('id') as string;

    const results = await db.delete(Invoices)
    .where(
        and(
            eq(Invoices.id, parseInt(id)),
            eq(Invoices.userId, userId)
        )
    )
    console.log('^^^^^^^^^^^^^^',results)
    redirect(`/dashboard`)
}