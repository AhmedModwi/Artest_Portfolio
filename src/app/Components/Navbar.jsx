'use client'
// Ensure you import necessary hooks and icons
import { useScreen } from '../../Context/ScreenContext';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoHome, IoBasket } from 'react-icons/io5';
import { GrGallery } from 'react-icons/gr';
import { MdDarkMode, MdLightMode } from 'react-icons/md'; // Import MdLightMode for light theme icon
import { useEffect, useState } from 'react';


const Navbar = () => {
  const { size, scroll, lastScroll } = useScreen();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Determine if the navbar should be sticky based on scroll direction
  const isSticky = scroll === 'up' || lastScroll === 'up'|| lastScroll === 'none';
  // Ensure component is mounted before setting theme to prevent hydration issues
   useEffect(() => {
    setMounted(true);
    // Only set the theme based on time if the user hasn't already chosen a theme
    if (!localStorage.theme) {
      const hour = new Date().getHours();
      const newTheme = hour >= 18 || hour <= 6 ? 'dark' : 'light'; // Consider dark theme from 6 PM to 6 AM
      setTheme(newTheme);
    }
  }, [setTheme]);


  // Conditional rendering to prevent SSR issues since document is not defined
  if (!mounted) return null;

  return (
     <nav className={` flex flex-row justify-between items-center top-0 mx-auto px-4 h-[15vh] z-50
     ${ isSticky ? 'sticky ' : ''} ${ size === 'sm' ? 'w-[90vw]' : "w-[75vw]" }`}>
     
      <div className="text-2xl font-bold w-4 m-2 md:m-3 lg:m-5 ored-500">
        LOGO
      </div>

      <div className="flex items-center gap-4 m-2 md:m-3 lg:m-5">
        
        
        { size === 'sm' ? (
          // Use icons for 'md' and smaller sizes
          <>
            <Link href="/"  className= {router.pathname === '/' ? 'active' : "w-8 h-8 bt"} >
              <IoHome className="full " title="Home" />
            </Link>
            <Link href="/gallery" className="w-8 h-8 bt">
              <GrGallery className="full " title="Gallery" />
            </Link>
            <Link href="/orders" className="w-8 h-8 bt">
              <IoBasket className="full" title="Orders" />
            </Link>
          </>


        ) : (
          // Use text links for 'lg' and larger sizes
          <>
            <Link href="/" className="bt">
             Home
          </Link>
          <Link href="/gallery"  className="bt">
          Gallery
          </Link>
          <Link href="/orders" className="bt">
            Orders
          </Link>
          </>
          )}
        
        

      
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center rounded-md p-2 ">
          {theme === 'dark' ? (
            <MdLightMode className="text-light-bg  " size="24" /> // Light mode icon
          ) : (
            <MdDarkMode className={`cursor-pointer ${theme === 'light' ? 'text-oblue-950' : 'text-oblue-100'}`} size="24" /> // Dark mode icon
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
