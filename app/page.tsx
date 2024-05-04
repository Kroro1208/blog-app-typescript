import Image from "next/image";

export default function Home() {
  return (
    <div><Image src={"logo3.svg"} height={100} width={100} alt="logo" className="flex justify-between" /></div>
  );
}
