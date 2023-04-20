import Image from "next/image";
import styles from "../friends-accepted/styles.module.css";
import RemoveIcon from "../../../assets/remove-icon.svg";
import SwordIcon from "../../../assets/sword-icon.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const FriendsAccepted = ({ data }) => {
  const dataLogin = useSelector(state => state.auth);

  const toastProperties = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  };

  const handleRemoveFriend = id => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/user/friend/delete/${data.id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${dataLogin.token}`
        }
      })
      .then(res => {
        toast.success("¡Amigo eliminado con éxito!", toastProperties);
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch(err => {
        switch (err.response.data.error) {
          case "Already friends":
            toast.info("¡Este usuario ya es tu amigo!", toastProperties);
            break;
          case "Pending friend request":
            toast.warning(
              "Ya has enviado una solicitud de amistad a este usuario.",
              toastProperties
            );
            break;
          case "Refused friend request":
            toast.error("Este usuario ha rechazado tu solictud de amistad.", toastProperties);
            break;
          default:
            console.error(err);
            break;
        }
      });
  };

  return (
    <div className={styles.container}>
      <section className={styles.user__container}>
        <div className={styles.img__container}>
          <div className={styles.user__img}>
            <img
              style={{ borderRadius: "50%" }}
              width={40}
              height={40}
              src={data.userFriend?.profileImg}
              alt="img-perfil"
            />
          </div>
        </div>
        <div className={styles.username__container}>
          <p className={styles.user}>{data.userFriend?.username}</p>
        </div>
        <div className={styles.delete__container}>
          <div onClick={() => handleRemoveFriend(data.id)} className={styles.button__remove}>
            <Image src={RemoveIcon} width={14} height={18} alt="img-remove-icon" />
          </div>
        </div>
        <div className={styles.duel__container}>
          <div className={styles.button__duel}>
            <Image src={SwordIcon} width={25.61} height={24.81} alt="img-sword-icon" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FriendsAccepted;
