import { NextResponse } from "next/server";
import { getFallbackTotalStock, getInventorySnapshot } from "@/lib/inventory";

export async function GET() {
  try {
    const inventory = await getInventorySnapshot();
    const totalStock = inventory.reduce(
      (sum, item) => sum + Number(item.stock || 0),
      0
    );

    return NextResponse.json({ inventory, totalStock });
  } catch {
    return NextResponse.json({
      inventory: [],
      totalStock: getFallbackTotalStock(),
      fallback: true
    });
  }
}

