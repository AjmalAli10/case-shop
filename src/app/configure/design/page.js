import { getImageById } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

const Page = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  //make  db call
  const configuration = await getImageById(id);

  if (!configuration) {
    return notFound();
  }
  const { imageUrl, height, width } = configuration;
  return (
    <DesignConfigurator
      configId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{ height, width }}
    />
  );
};

export default Page;
