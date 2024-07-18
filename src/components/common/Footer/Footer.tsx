import Image from "next/image";

const Footer = () => {
    return (
        <div className="ab absolute top-full z-20 w-[80%] m-auto flex right-0 left-0 min-h-40 text-white text-center">
            <div className="absolute h-full w-full">
                <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
                <Image src="/img/Gaza-Destruction-1-4ee8894f9706c5c5b200f9e41b0ff537.webp" fill alt="we want justice" className="object-center" style={{ objectFit: "cover" }} />
            </div>
            <div className="flex flex-col">
                <div className="mb-4 md:mb-0 text-center w-full md:text-left z-40">
                    <h2 className="text-xl font-bold text-center">Honoring Our Martyrs</h2>
                    <p className="mt-2 text-sm" >
                        We pay our deepest respects to the brave souls who sacrificed their lives for the quota system.Your courage and dedication will always be remembered.
                    </p >
                </div >
                <div className="text-center md:text-right z-40" >
                    <h2 className="text-xl font-bold text-center" > Support Bangladesh Students</h2 >
                    <p className="mt-2 text-sm" >
                        Our students deserve better.Stand with us as we strive for justice and better opportunities.Together, we are stronger.
                    </p >
                </div >
                <div className="border-t border-gray-700 mt-8 pt-4 text-center z-40" >
                    <p className="text-sm" >
                        & copy; 2024 Bangladesh Students Movement.All rights reserved.
                    </p >

                </div >
            </div >
        </div >
    );
};

export default Footer;