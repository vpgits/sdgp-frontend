import GetCurrentSession from "@/lib/getCurrentSession";
import {redirect} from "next/navigation";

export default async function Page() {

    const data = await GetCurrentSession();

    //write e conditional return statement based on whether data is null or not, if data is null use next redirect to redirect to login page, if data is not null JSON stringify the data and display it on the page
    if (data.data.session === null) {
        redirect('/login');
    } else {
        return (
            <div>
                <h1>Logged In</h1>
                <p>{JSON.stringify(data)}</p>
            </div>
        )
    }


}
