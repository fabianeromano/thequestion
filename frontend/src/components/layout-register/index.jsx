import React from "react";
import styles from "../layout-register/styles.module.css";
import { useSelector } from "react-redux";

const LayoutRegister = ({ children }) => {
  const regUser = useSelector(state => state.reg);
  const pages = React.Children.toArray(children);
  const currentPage = pages[regUser.step];

  return (
    <div className={styles.container}>
      <div className={styles.section}>{currentPage}</div>
    </div>
  );
};

export default LayoutRegister;
