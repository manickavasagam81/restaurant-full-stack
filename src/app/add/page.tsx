"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: number;
};
type Option = {
  title: string;
  additionalPrice: number;
};
const AddPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });
  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || !session?.user.isAdmin)
    return router.push("/");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };
  const upload = async () => {
    console.log("iam")
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");
    const res = await fetch("https://api.cloudinary.com/v1_1/manick/image", {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      body: data,
    });
    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const url = await upload();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
        method: "POST",
        body: JSON.stringify({ img: url, ...inputs, options }),
      });
      const data = await res.json();
      console.log(data);
      toast.success("Product Added Successfully");
      // router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-wrap gap-4 p-8"
      >
        <h2>Add Product</h2>
        <div className="w-full flex flex-col gap-2">
          <label>Image</label>
          <input
            onChange={handleChangeImg}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="file"
            type="file"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Title</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="title"
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="desc"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Price</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="price"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Category</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="catSlug"
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Options</label>
          <div>
            {" "}
            <input
              onChange={changeOptions}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              name="title"
              type="text"
              placeholder="Title"
            />
            <input
              onChange={changeOptions}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              name="additionalPrice"
              type="number"
              placeholder="Price"
            />
          </div>
          <div
            className="w-52 bg-red-500 text-white"
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Options
          </div>
        </div>
        <div>
          {options.map((item) => (
            <div
              key={item.title}
              onClick={() =>
                setOptions(options.filter((opt) => opt.title !== item.title))
              }
              className="rounded-md ring-1 ring-red-500 p-2"
            >
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}
        </div>
        <button className=" w-full bg-red-500 text-white p-2 ">Submit</button>
      </form>
    </div>
  );
};

export default AddPage;
