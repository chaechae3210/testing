import { TCountryResponse, fetchCountries } from "@/apis/api";
import CountryList from "@/components/CountryList/CountryList";
import Searchbar from "@/components/Searchbar/Searchbar";
import Head from "next/head";

type TProps = {
  countries: TCountryResponse[];
};

export default function Home({ countries }: TProps) {
  return (
    <>
      <Head>
        <title>NARAS</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NARAS" />
        <meta
          property="og:description"
          content="전세계 국가들의 정보를 확인해보세요."
        />
      </Head>
      <Searchbar q={undefined} />
      <CountryList countries={countries} />
    </>
  );
}

export const getStaticProps = async () => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
    },
  };
};
