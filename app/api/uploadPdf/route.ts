import supabase from "@/config/supabase_service";
import {NextRequest, NextResponse} from "next/server";


export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req: NextRequest) {
    if (!req.body) {
        return NextResponse.json({error: 'Missing body'}, {status: 400});
    }

    try {
        const file = await req.formData()
        const {data, error} = await supabase.storage.from('pdf').upload('superuser/sample.pdf', file)
        if (error) {
            console.error('Upload error:', error.message);
            return NextResponse.json({error: error.message}, {status: 500});
        }
        return NextResponse.json(data);
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
