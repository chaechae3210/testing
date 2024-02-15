import React from "react";
import style from "./SubLayout.module.css";

type TProps = {
  children: React.ReactNode;
};

const SubLayout = ({ children }: TProps) => {
  return (
    <>
      {children}
      <footer className={style.footer}>Haeun Chae</footer>
    </>
  );
};

export default SubLayout;
