import "./globals.css";
import { Providers } from '../Context/MoodContext'
import { ScreenProvider } from '../Context/ScreenContext'
import Navbar from "./Components/Navbar";

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text ">
        <Providers>
          <ScreenProvider>
            
            <Navbar/> 
            {children}
            
          </ScreenProvider>
        </Providers>
      </body>
    </html>
  )
}

