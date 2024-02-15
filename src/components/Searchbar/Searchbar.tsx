import { useEffect, useState } from "react";
import style from "./Searchbar.module.css";
import { useRouter } from "next/router";

type TProps = {
  q: string | undefined;
};

export default function Searchbar({ q }: TProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (q === undefined) return;
    setSearch(q);
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (Number(e.key) === 13) {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    if (search !== "") {
      router.push(`/search?q=${search}`);
    }
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
}
