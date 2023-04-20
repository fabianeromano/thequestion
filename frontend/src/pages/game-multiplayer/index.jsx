import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

function GameMultiplayer() {
  // const socket = useSelector(state => state.socket);
  // console.log(socket);

  // useEffect(() => {
  //   socket.emit("message", "Hello World!");

  //   socket.on("message", data => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <main className={styles.container}>
      <span className={styles.text}>Buscando jugadores. Por favor espera unos segundos...</span>
      <div className={styles.snipetContainer}>
        <div className={styles.ldsRipple}>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}

export default GameMultiplayer;
