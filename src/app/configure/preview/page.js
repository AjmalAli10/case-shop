import { getImageById } from "@/db/configureDB";
import DesignPreview from "./DesignPreview";

const Page = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await getImageById(id);

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default Page;
