import { OrangTua } from "./orang_tua";

export interface Bayi {
    id: string;
    name: string;
    age: number; // umur dalam tahun
    ageMonths?: number; // umur dalam bulan
    gender: string;
    id_orang_tua?: string;
    tanggal_lahir?: string;
    orang_tua?: OrangTua
    height: number,
    weight: number,
    status: string,
    created_at: Date | string
}
