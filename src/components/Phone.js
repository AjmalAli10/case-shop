/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Image from "next/image";

const Phone = ({ className, imgSrc, dark = false, ...props }) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        width={3000}
        height={2001}
        style={{ objectFit: "contain" }}
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64/phone-template-white-edges.png"
        className=" pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className=" absolute -z-10 inset-0">
        <Image
          fill
          style={{ objectFit: "contain" }}
          priority
          className="object-cover"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default Phone;
