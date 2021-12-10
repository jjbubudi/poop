import { useRouter } from "next/router";
import { useEffect } from "react";
import { CenteredSpinner } from "../common/components/CenteredSpinner";

export const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/poop");
  });

  return <CenteredSpinner />;
};
