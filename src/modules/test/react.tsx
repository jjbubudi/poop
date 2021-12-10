import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

const App: React.FC = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <SessionProvider
        session={{
          user: { name: "Test user", email: "test@example.com" },
          expires: ""
        }}
      >
        {children}
      </SessionProvider>
    </SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: App, ...options });

export * from "@testing-library/react";
export { customRender as render };
