import styles from "../tutorial/styles.module.css";
import hammer from "../../assets/hammer-icon.svg";
import Image from "next/image";

const Tutorial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left__container}></div>
      <div className={styles.center__container}>
        <div className={styles.items__container}>
          <div className={styles.item__hammer}>
            <Image
              style={{ borderRadius: "50%" }}
              src={hammer}
              width={44}
              height={44}
              alt="img-icon"
            />
          </div>
        </div>
        <p className={styles.question}>¿ Cuantos balones de oro ganó Lionel Messi ?</p>
        <div className={styles.button__container}>
          <button className={styles.button__choose}>5</button>
          <button className={styles.button__choose}>7</button>
          <button className={styles.button__choose}>8</button>
          <button className={styles.button__choose}>9</button>
        </div>
      </div>
      <div className={styles.right__container}></div>
    </div>
  );
};

export default Tutorial;
