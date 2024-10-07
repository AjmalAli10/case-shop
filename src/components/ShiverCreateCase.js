"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const ShiverCreateCase = () => {
  const pathname = usePathname();

  return pathname === "/" ? (
    <div className="sm:hidden mt-2 px-4 relative">
      <Image
        alt="arrow"
        width={65}
        height={65}
        priority
        src="/arrow.png"
        className="absolute top-[1.2rem] -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 h-4"
      />
      <div className="flex items-center justify-center pt-12">
        <Link
          href={"/configure/upload"}
          className={buttonVariants({
            size: "sm",
            className: "w-full justify-center animate-shiver",
          })}
        >
          Create Case
          <ArrowRight className="ml-1.5 h-5 w-5" />
        </Link>
      </div>
    </div>
  ) : null;
};

export default ShiverCreateCase;
