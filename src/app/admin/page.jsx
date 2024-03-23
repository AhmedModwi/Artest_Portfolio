
import AddPost from '../Components/AddPost/AddPost';
import HeroSection from '../Components/HeroSection';


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AddPost
        Categories={[]}
        Tags={[]}
        className="size-12 text-white p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
      />
    </main>
  );
}

