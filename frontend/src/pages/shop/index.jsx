import Layout from "@/components/layout";
import styles from "../shop/styles.module.css";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import coinIcon from "../../assets/coin-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Shop = () => {
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
        price: null,
        user_advantage: {
          quantity: null,
          advantageId: null
        }
      },
      {
        price: null,
        user_advantage: {
          quantity: null,
          advantageId: null
        }
      }
    ]
  });

  const dataPerfil = () => {
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
  };
  useEffect(() => {
    dataPerfil();
  }, []);

  const addItem = id => {
    axios
      .put(
        `https://the-questions-ogrz.onrender.com/api/v1/advantages/update/user/${dataLogin.id}`,
        {
          advantageId: id,
          quantity: 1
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataLogin.token}`
          }
        }
      )
      .then(res => dataPerfil())
      .then(res =>
        toast.success(
          `${id == 1 ? "¡Compraste Martillo con éxito!" : "¡Compraste Varita con éxito!"}`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          }
        )
      )
      .catch(err => console.log(err));
  };
  console.log(perfil);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}></div>
        <div className={styles.data__container}>
          <div className={styles.data__title}>
            <p>Tienda</p>
          </div>
        </div>
        <div className={styles.bottom__container}>
          <div className={styles.shop__container}>
            <div className={styles.shop__left}>
              <p className={styles.shop__title}>Tus Ventajas</p>
              <div className={styles.left__icons}>
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
            </div>
            <div className={styles.shop__center}>
              <p className={styles.shop__title}>Tus Monedas</p>
              <div className={styles.coin__img__container}>
                <div className={styles.coin__img}>
                  <Image width={35} height={35} src={coinIcon} alt="" />
                  <div className={styles.coin__number}>{perfil.coins}</div>
                </div>
              </div>
            </div>
            <div className={styles.shop__right}>
              <p className={styles.shop__title}>Comprar</p>
              <div className={styles.buy__container}>
                <div className={styles.right__left}>
                  <div className={styles.left__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={hammerIcon}
                        alt=""
                      />
                    </div>
                    <div className={styles.coin__img__container}>
                      <div className={styles.coin__img}>
                        <Image width={30} height={30} src={coinIcon} alt="" />
                        <div className={styles.coin__number}>{perfil.advantages[0].price}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.left__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={wandIcon}
                        alt=""
                      />
                    </div>
                    <div className={styles.coin__img__container}>
                      <div className={styles.coin__img}>
                        <Image width={30} height={30} src={coinIcon} alt="" />
                        <div className={styles.coin__number}>{perfil.advantages[1].price}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right__right}>
                  <div className={styles.plus__icon}>
                    <div onClick={() => addItem(1)}>
                      <Image width={35} height={35} src={plusIcon} alt="" />
                    </div>
                    <p className={styles.plus__number}>1</p>
                  </div>
                  <div className={styles.plus__icon}>
                    <div onClick={() => addItem(2)}>
                      <Image width={35} height={35} src={plusIcon} alt="" />
                    </div>
                    <p className={styles.plus__number}>1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
