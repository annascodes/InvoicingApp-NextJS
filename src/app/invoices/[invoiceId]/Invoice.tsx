'use client'
import { Badge } from "@/components/ui/badge"
import { db } from "@/db"
import { Invoices } from "@/db/schema"
import { cn } from "@/lib/utils"
import { and, eq } from "drizzle-orm"
import moment from "moment"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AVAILABLE_STATUSES } from "@/data/invoices"
import { updateStatusAction } from "@/app/actions"
import { ChevronDown } from "lucide-react"
import { useOptimistic } from "react"

interface InvoiceProps {
    invoice: typeof Invoices.$inferSelect // tofind
}

export default function Invoice({ invoice }: InvoiceProps) {

    const [currentStatus, setCurrentStatus] = useOptimistic(invoice.status,
        (state, newStatus) => {
            return String(newStatus)
        }
    )

    async function handleOnUpdateStatus(formData: FormData) {
        const originalStatus = currentStatus;
        setCurrentStatus(formData.get('status'))
        try {
            await updateStatusAction(formData)
        } catch (error) {
            setCurrentStatus(originalStatus)
        }   
    }

    return (
        <main className="max-w-5xl mx-auto my-5 p-2 flex flex-row  justify-between">
            <div className="my-5">
                <div className=" flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold ">Invoice # {invoice?.id}</h1>

                    <div>
                        <Badge className={cn(
                            "bg-blue-500 text-white hover:bg-blue-600",
                            currentStatus === 'open' && 'bg-blue-600',
                            currentStatus === 'uncollectible' && 'bg-red-600',
                            currentStatus === 'void' && 'bg-gray-600',
                            currentStatus === 'paid' && 'bg-green-600',
                        )}>
                            {currentStatus}
                        </Badge>
                    </div>
                </div>

                <h1 className="text-2xl my-4"> ${(invoice?.value / 100).toFixed(2)}</h1>

                <h1 className="text-xl font-bold">Billing details</h1>

                <div className="flex mt-3  max-w-xs">
                    <h1 className="w-1/2">Invoice Id</h1>
                    <p className="w-1/2">{invoice?.id}</p>
                </div>
                <div className="flex mt-3  max-w-xs">
                    <h1 className="w-1/2">Billing date </h1>
                    <p className="w-1/2">{
                        moment(invoice?.createTs).format('DD/MM/yy')
                    }</p>
                </div>




                {/* <pre>
                    {JSON.stringify(result, null, 2)}
                </pre> */}
            </div>

            <div className="my-5">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className="flex flex-row items-center">
                            <span className="text-xs  font-light tracking-widest">Current status </span> {currentStatus}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel className="text-xs font-thin ">Change to </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {
                            AVAILABLE_STATUSES.map(status => {
                                return (
                                    // NOTE: excluding current status in below line
                                    // status.id !== invoice.status &&
                                    (
                                        <DropdownMenuItem asChild className="bg-none" key={status.id} >
                                            <form action={handleOnUpdateStatus} className="flex flex-col ">
                                                <input type="hidden" name='id' value={invoice?.id} />
                                                <input type="hidden" name='status' value={status.id} />
                                                <button className="text-start w-full ">
                                                    {status.label}
                                                </button>

                                            </form>
                                        </DropdownMenuItem>
                                    )
                                )

                            })
                        }

                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </main>
    )
}