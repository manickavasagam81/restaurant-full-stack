import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
//get single product
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const product = await prisma.product.findUnique({ where: { id: id } });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "something went wrong",
      }),
      { status: 500 }
    );
  }
};
