'use client'


// Ensure you import necessary hooks and icons
import { useScreen } from '../../Context/ScreenContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdPostAdd , MdDashboard  } from "react-icons/md";
import { GoTasklist , GoSidebarCollapse , GoSidebarExpand } from "react-icons/go";
import { RiEdit2Fill } from "react-icons/ri";

import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { size , height } = useScreen();
  const router = useRouter();  
  const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
 

  return (
    
     <nav className={` w-fit flex flex-col justify-start h-screen top-0 sticky`}>
        
        { size === 'sm' || isCollapsed ? (
          // Use icons for 'md' and smaller sizes
          <>
            <Link href="/admin"  className= {router.pathname === '/' ? 'active' : "size-11 bt"} >
              <MdDashboard className="size-10 " title="Dashboard" />
            </Link>
            <Link href="/admin/edit" className=" size-11 bt">
              <RiEdit2Fill className="size-10" title="Edit website" />
            </Link>
            <Link href="/admin/Posts" className=" size-11 bt">
              <MdPostAdd className="size-10 " title="Edit Posts" />
            </Link>
            <Link href="/admin/orders" className=" size-11 bt">
              <GoTasklist className="size-10" title="Orders" />
            </Link>
          </>


        ) : (
          // Use text links for 'lg' and larger sizes
          <>
            <Link href="/admin" className="inline-flex gap-2 items-center bt">
             <MdDashboard className=" size-10" title="Dashboard" />
             Dashboard
          </Link>
          <Link href="/admin/edit" className=" w-fit inline-flex gap-2 items-center bt">
            <RiEdit2Fill className="size-10 m-2" title="Edit website" />
            Edit Site
          </Link>
          <Link href="/admin/posts"  className=" inline-flex gap-2 items-center bt">
          <MdPostAdd className="size-10 m-1 " title="Edit Posts" />
          Edit Posts
          </Link>
          <Link href="/admin/orders" className=" inline-flex gap-2 items-center bt">
            <GoTasklist className= "size-10" title="Orders" />
            Orders
          </Link>
          
          </>
          )}

          <div className=" flex mt-20">  
           {size !== 'sm' && (
          <button className="focus:outline-none size-11 bt" onClick={toggleSidebar}>
            {isCollapsed ? <GoSidebarCollapse className='size-10' /> : <GoSidebarExpand className='size-10' />}
          </button>
      )}
      </div>
    </nav>
  );
};

export default Sidebar ;
