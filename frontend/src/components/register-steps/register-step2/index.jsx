import Image from "next/image";
import Img from "../../../assets/logo.svg";
import Button from "@/components/button";
import styles from "../register-step2/styles.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, updateStep2 } from "@/features/reg/regSlice";
import useMutation from "@/hooks/useMutation";

const RegisterStep2 = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.reg);
  const [email, setEmail] = useState(store.email);
  const [password, setPassword] = useState(store.password);
  const [password2, setPassword2] = useState(store.password);
  const postRegister = useMutation();

  const handlePreviousPage = e => {
    e.preventDefault();
    dispatch(changePage(-1));
  };

  const handleNextPage = async e => {
    e.preventDefault();
    const fieldsAreValid = !!email && !!password && !!password2;
    const passwordIsValid = password === password2;
    if (fieldsAreValid && passwordIsValid) {
      dispatch(updateStep2({ email, password }));
      await postRegister.mutate("/user/register", { username: store.username, email, password });
      dispatch(changePage(1));
    }
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
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu correo
            </label>
            <input
              className={styles.form__input}
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu contraseña
            </label>
            <input
              className={styles.form__input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Reingresá tu contraseña
            </label>
            <input
              className={styles.form__input}
              type="password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button
            type="button"
            onClick={handlePreviousPage}
            theme="primary"
            className=""
            width="156px"
            height="46px"
          >
            Volver
          </Button>
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

export default RegisterStep2;
