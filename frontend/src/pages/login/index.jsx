import styles from "../login/styles.module.css";
import Logo from "../../assets/logo.svg";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import imgD1 from "../../assets/b-desktop-home/imagen1-desktop.svg";
import imgD2 from "../../assets/b-desktop-home/imagen2-desktop.svg";
import imgD3 from "../../assets/b-desktop-home/imagen3-desktop.svg";
import imgD4 from "../../assets/b-desktop-home/imagen4-desktop.svg";
import imgD5 from "../../assets/b-desktop-home/imagen5-desktop.svg";
import imgD6 from "../../assets/b-desktop-home/imagen6-desktop.svg";
import Register from "../register";

const Login = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(useRef(window.innerWidth));

  const [currentImage, setCurrentImage] = useState(0);
  const images2 = [imgD1, imgD2, imgD3, imgD4, imgD5, imgD6];
  const intervalTime = 3000;
  let intervalId;

  const authState = useSelector(state => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (authState.session) {
      push("/");
    }
  }, [push, authState]);

  useEffect(() => {
    const changeImage = () => {
      setCurrentImage(currentImage => (currentImage + 1) % images2.length);
    };
    intervalId = setInterval(changeImage, intervalTime);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${windowWidth.current < 768 ? "" : images2[currentImage].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div className={`${loginForm ? styles.form : styles.none}`}>
        <LoginForm />
      </div>
      <div className={`${registerForm ? styles.form : styles.none}`}>
        <Register />
      </div>
      <section className={styles.section}>
        <div className={styles.section__logo}>
          <Image
            placeholder="blur"
            blurDataURL={"../../assets/logo.svg"}
            src={Logo}
            width={`${windowWidth.current < 768 ? 214 : 380}`}
            height={`${windowWidth.current < 768 ? 134 : 212}`}
            alt="imagen-logo"
          />
        </div>

        <div className={styles.section__button}>
          <div
            onClick={() => {
              setLoginForm(!loginForm);
              setRegisterForm(false);
            }}
          >
            <button className={styles.button1}>Iniciar Sesión</button>
          </div>
          {windowWidth.current < 768 ? (
            <Link href="/register">
              <button className={styles.button2}>Registrarse</button>
            </Link>
          ) : (
            <div
              onClick={() => {
                setRegisterForm(!registerForm);
                setLoginForm(false);
              }}
            >
              <button className={styles.button2}>Registrarse</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
