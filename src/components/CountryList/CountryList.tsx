import { TCountryResponse, TSearchResultResponse } from "@/apis/api";
import style from "./CountryList.module.css";
import CountryItem from "@/components/CountryItem/CountryItem";

type TProps = {
  countries: TSearchResultResponse[] | TCountryResponse[];
};

export default function CountryList({ countries }: TProps) {
  return (
    <ul className={style.container}>
      {countries.map((country: TSearchResultResponse) => (
        <CountryItem key={country.code} {...country} />
      ))}
    </ul>
  );
}
