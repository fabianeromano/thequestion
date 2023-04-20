import Image from "next/image";
import styles from "../loader/styles.module.css";
import Img from "../../assets/logo.svg";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__logo}>
        <Image
          placeholder="blur"
          blurDataURL={"../../assets/logo.svg"}
          src={Img}
          width={214}
          height={134}
          alt="imagen-logo"
        />
      </div>
      <div className={styles.container__loader}>
        <div className={styles.loader__container}>
          <span className={styles.loader}></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
