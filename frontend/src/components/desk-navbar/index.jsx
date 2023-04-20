import styles from "../desk-navbar/styles.module.css";
import icon from "../../assets/icon.svg";
import community from "../../assets/desktop-icon/community-icon.svg";
import shop from "../../assets/desktop-icon/shop-icon.svg";
import profile from "../../assets/desktop-icon/profile-icon.svg";
import Image from "next/image";
import Link from "next/link";

const DeskNavbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image width={50} height={50} src={icon} alt="" />
      </Link>
      <div className={styles.link__container}>
        <Link href="/community/friends">
          <Image width={24} height={24} src={community} alt="" />
        </Link>
        <Link href="/shop">
          <Image width={24} height={24} src={shop} alt="" />
        </Link>
        <Link href="/profile">
          <Image width={24} height={24} src={profile} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default DeskNavbar;
