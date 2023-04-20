import Image from "next/image";
import styles from "../friends-pending/styles.module.css";
import RemoveIcon from "../../../assets/remove-icon.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FriendsPending = ({ data, onChangeStatus }) => {
  const token = useSelector(state => state.auth.token);

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

  const resInvitation = (id, status) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/friend/${id}/status`,
        {
          status
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        switch (status) {
          case "accepted":
            onChangeStatus && onChangeStatus();
            toast.success("¡Amigo aceptado con éxito!", toastProperties);
            break;
          case "refused":
            onChangeStatus && onChangeStatus();
            toast.success("¡Amigo rechazado con éxito!", toastProperties);
            break;
          default:
            break;
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch(err => console.error(err));
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
          <div className={styles.button__remove}>
            <Image src={RemoveIcon} width={14} height={18} alt="img-remove-icon" />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <svg
            onClick={() => resInvitation(data.id, "accepted")}
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            viewBox="0 96 960 960"
            width="25"
          >
            <path d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420 636 478 649.5 536 663 611 696q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587 750q-71-33-120-43.5T360 696q-58 0-107.5 10.5T132 750q-15 7-23.5 21.5T100 802v34Zm260-321q39 0 64.5-25.5T450 425q0-39-25.5-64.5T360 335q-39 0-64.5 25.5T270 425q0 39 25.5 64.5T360 515Zm0-90Zm0 411Z" />
          </svg>
          <svg
            onClick={() => resInvitation(data.id, "refused")}
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            viewBox="0 96 960 960"
            width="25"
          >
            <path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default FriendsPending;
