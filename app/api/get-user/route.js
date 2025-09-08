import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();


        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if(user) {
            return NextResponse.json({ userId: user  }, { status: 200 });
        }
        
 
        return NextResponse.json({ messsage: "Got user data", id: user  })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}