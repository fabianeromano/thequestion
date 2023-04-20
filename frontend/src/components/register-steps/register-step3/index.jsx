import styles from "../register-step3/styles.module.css";
import Image from "next/image";
import Img from "../../../assets/logo.svg";
import Button from "@/components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, updateStep3 } from "@/features/reg/regSlice";
import { loginAuth } from "@/features/auth/authSlice";
import useMutation from "@/hooks/useMutation";
import useAuthorizedHeaders from "@/hooks/useAuthorizedHeaders";
import useFetch from "@/hooks/useFetch";

const RegisterStep3 = () => {
  const store = useSelector(state => state.reg);
  const dataLogin = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const authorizationHeaders = useAuthorizedHeaders();
  useFetch(
    "/auth/login",
    {
      method: "POST",
      data: JSON.stringify({
        username: `${store.username}`,
        password: `${store.password}`
      })
    },
    data => dispatch(loginAuth(data))
  );

  const postCode = useMutation({
    method: "PUT",
    ...authorizationHeaders
  });

  const handlePreviousPage = e => {
    e.preventDefault();
    dispatch(changePage(-1));
  };
  const handleNextPage = e => {
    e.preventDefault();
    if (code.length > 0) {
      dispatch(updateStep3({ code }));
      fetchCode(code, dataLogin);
      dispatch(changePage(1));
    }
  };

  function fetchCode(code, dataLogin) {
    postCode
      .mutate(`/user/${dataLogin.id}/verify`, {
        code: Number(code)
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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
          <p className={styles.text}>Hemos enviado un código a tu correo.</p>
          <p className={styles.text}>Colócalo aquí para continuar.</p>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu código
            </label>
            <input
              className={styles.form__input}
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
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

export default RegisterStep3;
