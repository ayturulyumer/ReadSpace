import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import Logo from "../../public/readspace.jpg";
import Image from "next/image.js";

export default function NotFound() {
  return (
    <div
      data-theme="retro"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary"
    >
      <Image
        src={Logo}
        className="w-24 h-24 mask mask-circle mb-8 text-gray-600 animate-bounce"
      />

      {/* <IoBookSharp className="w-24 h-24 mb-8 text-gray-600 animate-pulse" /> */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Oops! It seems this page has been lost between the shelves.
      </p>
      <Link href="/">
        <button className="btn btn-accent  text-white">
          Return to Homepage
        </button>
      </Link>
    </div>
  );
}
