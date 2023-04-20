import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button";
import styles from "../login-form/styles.module.css";
import { loginAuth } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import Img from "../../assets/logo.svg";
import Image from "next/image";
import axios from "axios";
import useMutation from "@/hooks/useMutation";

const LoginForm = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const { push } = useRouter();
  const postLogin = useMutation();

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.username !== "" && login.password !== "") {
      postLogin
        .mutate("/auth/login", login)
        .then(response => {
          dispatch(loginAuth(response.data));
          push("/");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Los campos no pueden ir");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register__logo}>
        <Image
          placeholder="blur"
          blurDataURL={"../../assets/logo.svg"}
          src={Img}
          width={214}
          height={134}
          alt="imagen-logo"
        />
      </div>
      <form onSubmit={handleSubmit} className={styles.register__form}>
        <div className={styles.form__top}>
          <p className={styles.container__title}>Iniciar sesión</p>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu usuario
            </label>
            <input
              name="username"
              onChange={handleChange}
              className={styles.form__input}
              type="text"
            />
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu contraseña
            </label>
            <input
              name="password"
              onChange={handleChange}
              className={styles.form__input}
              type="password"
            />
          </div>
          <div className={styles.bottom__container}>
            <p className={styles.bottom__text}>Olvidé mi contraseña</p>
            <p className={styles.bottom__text}>
              No tiene cuenta?
              <Link style={{ color: "white", fontWeight: 700 }} href="/register">
                <span> Registrate</span>
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.form__button}>
          <Button theme="primary" className="" width="156px" height="46px">
            Aceptar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
