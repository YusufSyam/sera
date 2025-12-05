import { SplashAI } from "@/assets/images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className=" flex flex-col justify-between  h-full items-center">
      <Badge
        variant={"secondary"}
        className="text-base z-10 bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
      >
        AI Assistance
      </Badge>

      <div className="w-[200px] h-[200px] rounded-full hidden md:absolute bg-[#006AFF]/30 blur-2xl top-40"></div>
      <div className="w-[150px] h-[150px] rounded-full hidden md:absolute bg-[#edd500]/40 blur-2xl left-7 top-60"></div>

      <Image
        alt="Splash Screen AI"
        width={350}
        height={350}
        className="w-[230px] z-10"
        src={SplashAI.src}
      />

      <div className="flex flex-col gap-10 items-center px-7">
        <h1 className=" text-2xl md:text-2xl text-center text-white font-medium">
          Halo, Apa yang bisa saya bantu hari ini?
        </h1>

        <Button
          variant={"outline"}
          size={"lg"}
          className="w-full border-0 bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
        >
          <Link href={"/"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
