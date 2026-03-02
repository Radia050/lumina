import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import LogoutButton from "@/app/ui/LogoutButton";
export default async function teacherPage() {
    const supabase = await createClient();
   
    const{ data:{user},error}=await supabase.auth.getUser();
    if(error){
        console.error("Auth error :",error.message);
        redirect("/");
    }
    if(!user){
        redirect("/");
    }
     const role =user?.app_metadata?.role ?? user?.user_metadata?.role;
     if(role!=="teacher"){
        redirect("/");
     }
    return (<div>
        <p>teachers page </p>
        <LogoutButton />
    </div>
    );
}
