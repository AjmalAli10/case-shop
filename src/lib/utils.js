import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(price);
};

export function constructMetadata({
  title = "CaseShop - One of a kind custom phone case in seconds",
  description = "Create your own custom phone case in seconds",
  image = "/case-shop.png",
  icons = "/favicon.ico",
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@softEng_ajmal",
    },
    icons,
    metadataBase: new URL("https://case-shop-rouge.vercel.app/"),
    themeColor: "#FFF",
  };
}
