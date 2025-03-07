'use client'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Container from './Container';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Header = () => {
    const auth = useAuth()
    // console.log(auth)
    const path = usePathname()
    return (
        <header className=' mb-12 fixed top-0 w-full bg-white z-30 '>
            <Container className='shadow-md py-2 rounded-lg'>

                <div className='flex flex-row items-center justify-between'>

                    <Link href={'/dashboard'} className="hover:tracking-widest duration-300 text-2xl font-bold text-black">
                        Invoicipedia
                    </Link>

                    <div className='flex flex-row  gap-5 items-center justify-between'>
                        {
                            auth.isSignedIn && (
                                <>
                                    <Button variant={path === '/dashboard' ? 'outline' : 'link'} asChild>
                                        <Link href={'/dashboard'}>
                                            Dashboard
                                        </Link>
                                    </Button>

                                </>
                            )
                        }

                    </div>

                    <div className=' flex gap-5'>

                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                    </div>

                </div>
            </Container>
        </header>
    )
}

export default Header;