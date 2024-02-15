import Image from "next/image";
import style from "./CountryItem.module.css";
import { useRouter } from "next/router";
import { TSearchResultResponse } from "@/apis/api";

type TProps = TSearchResultResponse;

export default function CountryItem({
  code,
  commonName,
  flagEmoji,
  flagImg,
  population,
  region,
  capital,
}: TProps) {
  const router = useRouter();

  const onClickItem = () => {
    router.push(`/country/${code}`);
  };

  return (
    <li onClick={onClickItem} className={style.container}>
      <div className={style.flag_img}>
        <Image
          src={flagImg}
          alt=""
          style={{ objectFit: "cover" }}
          fill
          sizes="(max-width: 320px)"
        />
      </div>
      <div className={style.content}>
        <div className={style.name}>
          {flagEmoji} {commonName}
        </div>
        <div>지역 : {region}</div>
        <div>수도 : {capital.join(", ")}</div>
        <div>인구 : {population}</div>
      </div>
    </li>
  );
}
