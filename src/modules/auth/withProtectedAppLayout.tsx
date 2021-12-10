import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppLayout } from "../app/AppLayout";
import { CenteredSpinner } from "../common/components/CenteredSpinner";
import { Page } from "../common/page";

const ProtectedAppLayout: React.FC = ({ children }) => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn();
    }
  }, [session]);

  if (session.status === "authenticated") {
    return <AppLayout>{children}</AppLayout>;
  }

  return <CenteredSpinner />;
};

export const withProtectedAppLayout = <P,>(Component: Page<P>): Page<P> => {
  Component.getLayout = (page) => (
    <ProtectedAppLayout>{page}</ProtectedAppLayout>
  );
  return Component;
};
