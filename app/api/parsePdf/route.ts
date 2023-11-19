import {NextRequest, NextResponse} from "next/server";

// type Data = {
//     path:string
// }

export async function POST(req:NextRequest, res:NextResponse){
    // get the json data from the request body
    try{
        // const data = await req.json();
        // const path = data.path;
        const res = await fetch("http://127.0.0.1:8000/parse_pdf_pages",{
            method:'POST'
        });
        const data = await res.json();
        return NextResponse.json({sentences:data});
    }
    catch (error:any){
        console.log(error.message);
        return {error:error.message};
    }
}
