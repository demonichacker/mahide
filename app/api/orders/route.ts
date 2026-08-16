import { NextResponse } from "next/server"
import { getOrdersCollection } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const orderData = await req.json()

    // Validate required fields
    if (!orderData.fullName || !orderData.phone || !orderData.email || !orderData.address) {
      return NextResponse.json({ error: "Missing required delivery fields" }, { status: 400 })
    }

    const orderRecord = {
      ...orderData,
      createdAt: new Date(),
      status: "paid",
    }

    // Save to MongoDB if configured
    if (process.env.MONGODB_URI) {
      try {
        const collection = await getOrdersCollection()
        await collection.insertOne(orderRecord)
        console.log("Order saved to MongoDB successfully:", orderRecord.reference)
      } catch (dbErr) {
        console.error("Failed to save order to MongoDB:", dbErr)
      }
    } else {
      console.log("MONGODB_URI not configured. Order logged locally:", orderRecord)
    }

    return NextResponse.json({ success: true, order: orderRecord })
  } catch (error) {
    console.error("Order processing error:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}
