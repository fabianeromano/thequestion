import styles from "../register-step1/styles.module.css";
import Image from "next/image";
import Img from "../../../assets/logo.svg";
import Button from "@/components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, updateStep1 } from "@/features/reg/regSlice";

const RegisterStep1 = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.reg);
  const [username, setUsername] = useState(store.username);

  const handleNextPage = () => {
    dispatch(updateStep1({ username }));
    dispatch(changePage(1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <div className={styles.logo__desktop}>
          <Image
            placeholder="blur"
            blurDataURL={"../../../assets/logo.svg"}
            src={Img}
            width={214}
            height={134}
            alt="imagen-logo"
          />
        </div>
        <p className={styles.container__title}>Registrate</p>
      </div>
      <form className={styles.container__bottom}>
        <div className={styles.form}>
          <p className={styles.subtitle}>Éste será el nombre con el que otros usuarios te verán.</p>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Nombre de usuario
            </label>
            <input
              className={styles.form__input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button
            type="submit"
            onClick={handleNextPage}
            theme="primary"
            className=""
            width="156px"
            height="46px"
          >
            Aceptar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep1;
