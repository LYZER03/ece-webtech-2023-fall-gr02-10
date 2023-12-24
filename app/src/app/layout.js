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
      <div className="">
          <ContextProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
            <Navbar/>
            {children}
          </ContextProvider>
          <Footer/>
        </div>   
      </body>
    </html>
  )
}


