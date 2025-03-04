
import { db } from "@/db"
import { Invoices } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import Invoice from "./Invoice"

export default async function SingleInvoice(
    { params }: { params: { invoiceId: string } }
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('no userId found in [invoice] page.tsx')
    }
    // const invoiceId = parseInt(params.invoiceId)
    const { invoiceId } = await params; 
    const invoiceIdNumber = parseInt(invoiceId);

    const [result] = await db.select().from(Invoices)
        .where(
            and(
                eq(Invoices.id, invoiceIdNumber),
                eq(Invoices.userId, userId)
            )
        )
        .limit(1)
    if (!result) {
        notFound()
    }
    return (
       <Invoice invoice={result} />
    )
}
