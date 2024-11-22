import Link from "next/link"
import AuthModal from "./auth-modal"
import { authUser } from "@/lib/hooks"
import SignOut from "./sign-out"
import { redirect } from "next/navigation"
import { auth } from "@/auth"


const Header = async () => {
    const session = await auth()

  return (
    <header className="w-full border-b">
        <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-7 flex py-5 items-center justify-between">
            <div className="flex items-center">
                <Link href={'/'}>Logo</Link>
                <h4>
                    Trainee <span>Paradise</span>
                </h4>
            </div>
            {
                session ? (
                    <>
                    <SignOut />
                    </>
                ): (
                  <>
                      <div>
                        <AuthModal />
                      </div>
                  </>
                )
            }
        </nav>
    </header>
  )
}

export default Header