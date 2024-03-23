'use client'
import Image from 'next/image';
import { useScreen } from '../../Context/ScreenContext';
import Link from 'next/link';
import { GiMagicLamp } from "react-icons/gi";
import { GiBeastEye } from "react-icons/gi";

export default function HeroSection() {
    const { size } = useScreen();

    return (
        <section className="flex flex-col md:flex-row items-center justify-between py-12 px-4 ">
            {size === 'sm' ? (
                <></>
            ): (
                    <>

                    </>
                )}

            {/* Artist drawing container */}
            <div className="flex-1 h-[500px] w-full p-6 mb-8 md:mb-0">
                <Image
                    src="/artist.jpg" // Update with the correct path to your image  
                    alt="Artist Drawing"
                    width={500} // Adjust based on your preference
                    height={500} // Adjust based on your preference
                    objectFit="cover"
                />
            </div>

            {/* Text and actions container */}
            <div className="flex-1 space-y-4">
                {/* Headline */}
                <div>
                    <h2 className="text-2xl md:text-4xl p-5 font-bold">Welcome to the Artist's World</h2>
                </div>

                {/* Short paragraph */}
                <div>
                    <p className="text-md md:text-lg">
                        Discover the unique creations of our artist, blending imagination with reality through each stroke.
                    </p>
                </div>

                {/* Call to action */}
                <div className="flex  gap-4">
                    <Link  className="inline-flex items-center bt" 
                    href="/gallery" passHref>
                    
                        <GiBeastEye className="m-2 h-8 w-8"/> 
                        Explore Gallery
                    </Link>
                    <Link href="/orders" className="inline-flex items-center bt">
                        <GiMagicLamp className="m-2 h-8 w-8" />
                        Mack a which 
                    </Link>
                </div>
            </div>
        </section>
    );
}

