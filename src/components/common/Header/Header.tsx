import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

const Header = () => {
    return (
        <div className="sticky h-screen pl-4 top-0 basis-32 md:basis-40 flex-shrink-0 max-w-[200px] flex flex-col justify-around bg-gray-400">
            <Link href="/" className="flex gap-4 items-center relative tooltipContainer">
                <IoHomeSharp className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Home</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Home</p>
            </Link>
            <Link href="/profile" className="flex gap-4 items-center relative tooltipContainer">
                <RiAdminLine className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Profile</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Profile</p>
            </Link>
            <Link href="/post" className="flex gap-4 items-center relative tooltipContainer">
                <MdPostAdd className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Create Post</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Post</p>
            </Link>
            <Link href="/logout" className="flex gap-4 items-center relative tooltipContainer">
                <AiOutlineLogin className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Log out</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Log out</p>
            </Link>
            <Link href="/login" className="flex gap-4 items-center relative tooltipContainer">
                <CiLogout className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Log in</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Log in</p>
            </Link>
            <Link href="/singup" className="flex gap-4 items-center relative tooltipContainer">
                <IoIosLogIn className="w-5 text-3xl " fill="white" />
                <p className="hidden md:block">Sign up</p>
                <p className="md:hidden absolute text-nowrap text-[14px] px-4 rounded-full tooltip left-1/4 bg-gray-900">Sign up</p>
            </Link>
            {/* <Link href={"#"}>hey</Link> */}
        </div>
    );
};

export default Header;