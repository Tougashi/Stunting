import Link from "next/link"
import { BsRobot } from "react-icons/bs"
import { useAuth } from "@/contexts/AuthContext"


export default function ConsultationBtn(){

    const { user } = useAuth();

    if(!user){
        return null;
    }

    return (
        <div className="fixed bottom-10 right-10 p-2 z-20">
            <Link href={'/konsultasi'} className="bg-white rounded-lg p-3 text-lg shadow-lg wave-background-bottom text-white font-semibold border border-2 hover:cursor-pointer flex gap-x-4 items-center"><BsRobot className="size-7"/> Konsultasi</Link>
        </div>
    )
}