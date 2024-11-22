import { authUser } from "@/lib/hooks";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";




export default async function Home() {
  return (
    <div>
      homePage
    </div>
  );
}


