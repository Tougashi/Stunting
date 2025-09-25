'use client'

import Link from "next/link"
import { useState } from "react";
import { Bayi } from "@/types/bayi";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";


interface BayiCardProps {
    image: string;
    bayi: Bayi;
}

export default function BayiCard({ image, bayi }: BayiCardProps) {
    const [isCardOpen, setCardOpen] = useState<boolean>(false);

    return (
        <div className="border rounded-2xl py-7 px-2 shadow border-gray-300">
            <div className="flex flex-col w-full space-y-1">
                <div className="w-full flex">
                    <div className="bg-[#D9EAEF] rounded-full p-7 m-auto">
                        <Image src={image || "/image/icon/bayi-icon.svg"} alt={`Image of ${bayi.gender} bayi`} width={24} height={24}/>
                    </div>
                </div>
                <h4 className="text-xl text-center font-semibold">{bayi.name}</h4>
                <p className="text-center text-sm font-semibold text-[#397789]">{bayi.gender}</p>
                <p className="text-center text-sm text-[#397789] font-semibold">Umur: <span className="text-gray-500/70 font-normal">{bayi.age} Tahun</span> </p>
                <div className="my-7 flex flex-row justify-center w-full ">
                    <CardActions />
                </div>
            </div>
        </div>
    )
}


interface CardDialogProps {
    isOpen: boolean;
    dataBayi: Bayi;
}   

export function BayiCardDialog({ isOpen, dataBayi }: CardDialogProps) {
    return (
        <div className="max-h-dvh max-w-dvw overflow-hidden bg-black/20">
            <div className={`${isOpen ? 'absolute' : 'hidden'}`}>
                <p className="p-4">{JSON.stringify(dataBayi, null, 2)}</p>
            </div>
        </div>
    )
}

// Komponen Button Sejajar
export function CardActions() {
    return (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
                style={{
                    background: "#407A81",
                    color: "#fff",
                    border: "none",
                    borderRadius: "24px",
                    padding: "8px 32px",
                    fontWeight: 500,
                    fontSize: "18px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                }}
            >
                Scan
            </button>
            <button
                style={{
                    background: "#fff",
                    color: "#407A81",
                    border: "2px solid #407A81",
                    borderRadius: "24px",
                    padding: "8px 32px",
                    fontWeight: 500,
                    fontSize: "18px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                }}
            >
                Edit
            </button>
            <button
                style={{
                    background: "#FDEAEA",
                    border: "none",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <FaTrash color="#F87171" size={20} />
            </button>
        </div>
    );
}