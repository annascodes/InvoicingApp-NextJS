import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-3 my-5     py-5 max-w-5xl mx-auto "
     

    >
      <h1 className="text-5xl font-bold">
        Invoicipedia
      </h1>
       

      <p>
        <Button asChild>
          <Link href={'/dashboard'}>
            Dashboard
          </Link>
        </Button>
      </p>
    </main>
  );
}
