import { NextRequest, NextResponse } from "next/server";

export default function POST(req:NextRequest, res: NextResponse){
    return NextResponse.json({message: 'Hello World'})
}