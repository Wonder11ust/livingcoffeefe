import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateOrder(){
    return (
        <Link href="/orders/create" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 md:ml-4" />
           Tambah Pesanan
        </Link>
    )
}