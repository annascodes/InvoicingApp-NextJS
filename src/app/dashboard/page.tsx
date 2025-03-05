

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { auth } from "@clerk/nextjs/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CirclePlus } from "lucide-react"

import { db } from "@/db"
import { Invoices } from "@/db/schema"
import moment from "moment"
import { eq } from "drizzle-orm"


export default async function Dashboard() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('no userId found')
    }
    const results = await db.select().from(Invoices)
        .where(eq(Invoices.userId, userId))

    return (
        <main className="max-w-5xl mx-auto py-5">
            <div className="flex justify-between items-center">
                <h1 className="text-5xl font-bold my-5 tracking-widest">Invoices</h1>
                <Button variant={'ghost'} asChild >
                    <Link href={`/invoices/new`}>
                        <CirclePlus />
                        Create invoice
                    </Link>
                </Button>
            </div>
            <Table>
                {(results && results.length === 0) ?
                     <TableCaption className="tracking-widest my-14">No invoice added yet!</TableCaption> :
                      <TableCaption className="text-xs tracking-widest">( A list of your recent invoices. )</TableCaption>
                    } 
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        results.map(results => {
                            return (
                                <TableRow key={results.id}>
                                    <TableCell className="font-medium">
                                        <Link className="p-2" href={`/invoices/${results.id}`}>
                                            {
                                                moment(results.createTs).format('d/MM/yy')
                                            }
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/invoices/${results.id}`} className="p-2 hover:underline underline-offset-4">
                                            John F. Kenedy

                                        </Link>
                                    </TableCell>
                                    <TableCell className=' '>
                                        <Link href={`/invoices/${results.id}`} className="p-2 hover:underline underline-offset-4 ">
                                            johnfkendy@gmail.com
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        <Link href={`/invoices/${results.id}`} className="p-2 ">
                                            <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                                                {results.status}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/invoices/${results.id}`} className="p-2 hover:underline underline-offset-4">
                                            ${(results.value / 100).toFixed(2)}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }


                </TableBody>
            </Table>


        </main>
    )
}