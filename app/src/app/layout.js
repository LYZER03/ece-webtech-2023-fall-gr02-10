import './globals.css'
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import {ContextProvider} from '../components/UserContext';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener';

 export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}  

export default async function RootLayout({ children }) {

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>  
      <div className="container mx-auto min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <ContextProvider session={session}>
           <SupabaseListener serverAccessToken={session?.access_token} />
            <Navbar/>
            {children}
            <Footer/>
         </ContextProvider>
         </div>   
      </body>
    </html>
  )
}
