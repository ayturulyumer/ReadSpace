import Image from "next/image.js";
import Logo from "../../../../public/readspace.jpg";
export default function Spinner() {
  return (
    <div className="h-screen w-screen flex  justify-center items-center space-x-2">
      <Image
        className="mask w-16 h-16 mask-circle mr-2 animate-spin"
        src={Logo}
        width={0}
        height={0}
        alt="Logo"
      />
      <span className="text-orange-500 text-2xl">Loading...</span>
    </div>
  );
}
