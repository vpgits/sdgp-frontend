import {NextRequest, NextResponse} from "next/server";

export async function POST(req:NextRequest) {
    try{
        const {query} = await req.json();
        const fileResponse = await fetch("http://127.0.0.1:8000/generate_embedding", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"query": query})
        })
        const data = await fileResponse.json();
        if (data.header == 200)
            return NextResponse.json({"response": data});
    } catch (error:any){
        return NextResponse.json({error:JSON.parse(error.message)}, {status: 500});
    }
}