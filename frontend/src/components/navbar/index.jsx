import home from "../../assets/mobile-icon/home-icon.svg";
import community from "../../assets/mobile-icon/community-icon.svg";
import shop from "../../assets/mobile-icon/shop-icon.svg";
import profile from "../../assets//mobile-icon/profile-icon.svg";
import Image from "next/image";
import styles from "../navbar/styles.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.link__container}>
        <Link style={{ textDecoration: "none" }} href="/">
          <li className={styles.link}>
            <Image width={22} height={23} src={home} alt="" />
            <p className={styles.link__name}>Home</p>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/community/friends">
          <li className={styles.link}>
            <Image width={23} height={23} src={community} alt="" />
            <p className={styles.link__name}>Comunidad</p>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/shop">
          <li className={styles.link}>
            <Image style={{ textDecoration: "none" }} width={23} height={23} src={shop} alt="" />
            <p className={styles.link__name}>Tienda</p>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/profile">
          <li className={styles.link}>
            <Image style={{ textDecoration: "none" }} width={23} height={23} src={profile} alt="" />
            <p className={styles.link__name}>Perfil</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
