import Image from "next/image";
import Link from "next/link";

function SmallButton({ id, label, onClick, loading, href, className }) {
  return (
    <Link href={`${href}`}>
      <button
        className={`${className} text-md md:text-2xl py-1 md:py-2 w-24 md:w-32 rounded-lg font-Poppins text-white`}
        id={id}
        onClick={onClick}
        disabled={loading}
      >
        {label}
      </button>
    </Link>
  );
}

function LargeButton({ id, label, onClick, loading, className }) {
  return (
    <button
      className={`${className} w-full md:w-full lg:w-full font-Poppins text-lg md:text-2xl lg:text-2xl md:btn-md lg:btn-md py-1 rounded-lg`}
      id={id}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function GoogleButton({ id, label, onClick, loading, href }) {
  return (
    <Link href={`${href}`}>
      <button
        id={id}
        onClick={onClick}
        disabled={loading}
        className="w-72 md:w-full lg:w-full"
      >
        <div className=" bg-blue-500 flex text-white border-2 border-blue-500 items-center font-Poppins text-lg md:text-2xl lg:text-2xl font-medium">
          <div className="bg-white p-1 flex md:hidden lg:hidden">
            <Image src="/logo-google.png" alt="logo" width={20} height={20} />
          </div>
          <div className="bg-white p-1 hidden md:flex lg:flex">
            <Image src="/logo-google.png" alt="logo" width={40} height={40} />
          </div>
          <div className="w-full px-3 flex justify-center">{label}</div>
        </div>
      </button>
    </Link>
  );
}

export { SmallButton, LargeButton, GoogleButton };
