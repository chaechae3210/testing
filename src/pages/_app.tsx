import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";

type TEmptyLayoutProps = {
  children: React.ReactNode;
};

type PageComponent = {
  Layout?: ({ children }: TEmptyLayoutProps) => JSX.Element;
};

type ExtendedAppProps = AppProps & {
  Component: PageComponent;
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const EmptyLayout = ({ children }: TEmptyLayoutProps) => {
    return <>{children}</>;
  };
  const SubLayout = Component.Layout || EmptyLayout;

  return (
    <Layout>
      <SubLayout>
        <Component {...pageProps} />
      </SubLayout>
    </Layout>
  );
}
