import SearchUser from "@/components/community-section/search-user";
import styles from "../friends/styles.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import FriendsPending from "@/components/community-section/friends-pending";
import AllUsersDetail from "@/components/community-section/all-users-detail";
import useFetch from "@/hooks/useFetch";
import FriendsAccepted from "@/components/community-section/friends-accepted";
import Layout from "@/components/layout";

const Friends = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAccepted, setIsAccepted] = useState(true);
  const dataLogin = useSelector(state => state.auth);
  const { data: dataFriendsPending } = useFetch(`/user/${dataLogin.id}/friends/pending`);
  const { data: dataFriendsAccepted } = useFetch(`/user/${dataLogin.id}/friends/accepted`);
  const { data: dataAllUsers } = useFetch(`/users/all`);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.search}>
          <SearchUser
            onChange={value => {
              setSearchText(value);
              setSearchResults(dataAllUsers.filter(users => users.username.includes(value)));
            }}
          />
        </div>
        <div className={styles.title__container}>
          <p className={styles.title}>Comunidad</p>
        </div>
        <div className={styles.button__container}>
          <button type="button" className={styles.button1}>
            Amigos
          </button>
          <Link href="/community/all-users">
            <button type="button" className={styles.button2}>
              Otros usuarios
            </button>
          </Link>
        </div>
        <div className={styles.btnContainer}>
          <div className={isAccepted ? styles.btnSelected : ""} onClick={() => setIsAccepted(true)}>
            Aceptados
          </div>
          <div
            className={isAccepted ? "" : styles.btnSelected}
            onClick={() => setIsAccepted(false)}
          >
            Pendientes
          </div>
        </div>
        <div className={styles.userdetail__container}>
          {searchText == ""
            ? ""
            : searchResults?.map(el => <AllUsersDetail background="green" key={el.id} data={el} />)}

          {!isAccepted
            ? dataFriendsPending?.map(el => (
                <FriendsPending key={`${el.id}-${el.userAdded?.id}`} data={el} />
              ))
            : dataFriendsAccepted?.map(el => (
                <FriendsAccepted key={`${el.id}-${el.userAdded?.id}`} data={el} />
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Friends;
