"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { LoaderCircle, Shell, Loader } from 'lucide-react';

const SubmitButton = () => {
    const { pending } = useFormStatus(); // tofind
    console.log('pending:', pending)
    const x = useFormStatus()
    console.log(x)

    return (
        <Button disabled={pending} className="disabled:cursor-not-allowed" >

            {
                pending ?
                    <span className="flex flex-row gap-2 items-center justify-center">
                        <LoaderCircle style={{ animationDuration: '1s' }} className="animate-spin " />
                         <span className="animate-pulse">Submitting...</span>
                    </span> :
                     "Submit it."
            }

        </Button>
    )
}

export default SubmitButton;