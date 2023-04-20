import Layout from "@/components/layout";
import styles from "../profile/styles.module.css";
import { useSelector } from "react-redux";
import editIcon from "../../assets/edit-icon.svg";
import coinIcon from "../../assets/coin-icon.svg";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const dataLogin = useSelector(state => state.auth);
  const [perfil, setPerfil] = useState({
    id: null,
    username: "",
    email: "",
    lifes: null,
    points: null,
    coins: null,
    profileImg: "",
    advantages: [
      {
        user_advantage: {
          quantity: null,
          advantageId: null
        }
      },
      {
        user_advantage: {
          quantity: null,
          advantageId: null
        }
      }
    ]
  });

  useEffect(() => {
    axios
      .get(`https://the-questions-ogrz.onrender.com/api/v1/user/${dataLogin.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataLogin.token}`
        }
      })
      .then(res => setPerfil(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}></div>
        <div className={styles.data__container}>
          <div className={styles.data}>
            <div className={styles.title__container}>
              <p>Perfil</p>
            </div>
            <div className={styles.img__container}>
              <div className={styles.imgrounded}>
                <img className={styles.img} src={perfil.profileImg} alt="" />
                <div className={styles.edit__img}>
                  <Image width={22} height={22} src={editIcon} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.username__container}>
              <div className={styles.username}>
                <p>{perfil.username}</p>
                <div className={styles.edit__user}>
                  <Image width={22} height={22} src={editIcon} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.point__container}>
              <div className={styles.point__number}>
                <p>{perfil.points}</p>
              </div>
              <div className={styles.point__title}>
                <p>Puntos</p>
              </div>
              <div className={styles.coin__icon}>
                <div className={styles.coin__img__container}>
                  <div className={styles.coin__img}>
                    <Image width={35} height={35} src={coinIcon} alt="" />
                    <div className={styles.coin__number}>{perfil.coins}</div>
                  </div>
                </div>
              </div>
              <div className={styles.coin__name}>
                <p>Monedas</p>
              </div>
            </div>
            <div className={styles.ventajas__container}>
              <p className={styles.ventajas__title}>Ventajas</p>
              <div className={styles.hammer__container}>
                <div className={styles.hammer__icon}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={30}
                    height={30}
                    src={hammerIcon}
                    alt=""
                  />
                  <div className={styles.hammer__number}>
                    {perfil.advantages[0].user_advantage.quantity}
                  </div>
                </div>
                <p>Martillos</p>
              </div>
              <div className={styles.wand__container}>
                <div className={styles.hammer__icon}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={30}
                    height={30}
                    src={wandIcon}
                    alt=""
                  />
                  <div className={styles.hammer__number}>
                    {perfil.advantages[1].user_advantage.quantity}
                  </div>
                </div>
                <p>Varas Mágicas</p>
              </div>
            </div>
            <div className={styles.partidas__container}>
              <p className={styles.ventajas__title}>Partidas</p>
              <div className={styles.partidas}>
                <p>12</p>
                <p>Ganadas</p>
              </div>
              <div className={styles.partidas}>
                <p>7</p>
                <p>Perdidas</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom__container}>
          <div className={styles.bottom__link}>
            <p>Cambiar Contraseña</p>
            <p>Noticias</p>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
