import Image from "next/image";

export default function Home() {
  return (
    <div><Image src={"icon1.svg"} height={100} width={100} alt="logo" className="hidden md:flex justify-between md:p-5 ml-5" /></div>
  );
}
