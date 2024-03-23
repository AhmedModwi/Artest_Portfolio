import Sidebar from '@/app/Components/Sidebar'

const Layout = ({ children }) => {
  return (
    <div className=" flex justify-between relative">
      <Sidebar />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;