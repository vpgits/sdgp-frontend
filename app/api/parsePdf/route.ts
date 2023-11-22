import {NextRequest, NextResponse} from "next/server";

// type Data = {
//     path:string
// }
/**
 * Returns the parsed PDF pages in a JSON. Key is "pages" for an array of pages[]
 * @param req NextRequest
 * @constructor
 */
export async function POST(req:NextRequest){

    try{
        const req_data  = await req.json();
        const path = req_data.path;
        const res = await fetch("http://127.0.0.1:8000/parse_pdf_pages",{
            method:'POST',
            headers: {
                    'Content-Type': 'application/json',
                },
            body:JSON.stringify({"path": path})
        }
        );
        const data = await res.json();
        return NextResponse.json({pages:data});
    }
    catch (error:any){
        console.log(error.message);
        return {error:error.message};
    }
}
