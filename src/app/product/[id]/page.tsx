import Price from "@/components/Price";
import { singleProduct } from "@/data";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React, { cache } from "react";
import DeleteButton from "@/components/DeleteButton"
export const dynamic = "force-dynamic";

const getData = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/products/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}
const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct:ProductType = await getData(params.id)
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};

export default SingleProductPage;
