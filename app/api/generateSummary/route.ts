import {NextRequest, NextResponse} from "next/server";

export async function POST(req:NextRequest){
    try{
        // const searchParams = req.nextUrl.searchParams;
        // const filePath = searchParams.get("path");
        const body =  await req.json();
        const filePath = body.path;
        const fileResponse = await fetch("http://127.0.0.1:8000/generate_summary",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({"path": filePath})
        })
        const data = await fileResponse.json();
        return NextResponse.json({"summary":data});
    } catch (error:any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}