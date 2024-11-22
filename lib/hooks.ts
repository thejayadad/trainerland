import { auth } from "@/auth";
import { redirect } from "next/navigation";


export async function authUser(){
    const session = await auth()
    if(!session?.user){
        return redirect('/')
    }
    return session
}