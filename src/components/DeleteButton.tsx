"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }:{id:string}) => {
  const { data: session, status } = useSession()
  console.log(id)
    const router = useRouter()
    if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return;
  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/products/${id}`, { method: "DELETE" })
    if (res.status === 200) {
      router.push("/menu")
      toast("Product deleted successfully")
    }
    else{
      const data = await res.json()
      toast(data.message)
    }
  }
  return (
    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 absolute top-4 right-4 rounded-full text-white font-bold p-2  ">
    <Image
        src="/delete.png"
              alt="delete"
              height={20}
              width={20}
     
      />
    </button>
  );
};
export default DeleteButton;
