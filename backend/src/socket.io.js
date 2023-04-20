const { User, Room_Match } = require("./models");
const {
  createRoomFriends,
  createRoomRandom,
  acceptRoom,
  refuseRoom,
  getRoomById,
  viewResults
} = require("./services/room.services");

module.exports = io => {
  io.on("connection", socket => {
    console.log("User connected");

    socket.on("message", data => {
      console.log(data);
    });

    /* Almacenamos el socket ID del cliente en el momento que hace login */

    socket.on("login", async id => {
      if (id) {
        const user = await User.findByPk(id);
        if (user) await User.update({ socketId: socket.id, online: true }, { where: { id } });
      }
    });

    //Definimos una variable global donde almacenaremos todas las salas en espera
    const waitingRooms = [];

    /* Escuchamos el evento socket view results */

    socket.on("view results", async roomId => {
      const result = await viewResults(roomId);

      io.to(result.player1.socketId).emit("result", result.player1.message);
      io.to(result.player2.socketId).emit("result", result.player2.message);
    });

    /* Escuchamos el evento socket invitar amigo */

    socket.on("invitation friend", async data => {
      //Esperamos que la función createRoomFriends cree la sala de juego y retorne el socket ID del oponente
      const result = await createRoomFriends(data);

      //Si ya existe una sala o no hay un token válido se emite un mensaje al retador
      if (result.id === 1) io.to(socket.id).emit("feedback", result.data);

      //Emitimos un mensaje de invitación al oponente con los datos de la sala
      if (result.id === 2) {
        io.to(result.socketId).emit("invite", result.data);

        //Agregamos el ID de la sala creada a la lista de espera
        waitingRooms.push(result.data.id);

        //Después de 30seg verificamos, si la sala sigue en espera, se rechazará automáticamente
        setTimeout(async () => {
          //Buscamos la primera sala que se colocó en espera
          const { id, status } = await getRoomById(waitingRooms[0]);

          //Verificamos, si aún sigue en espera, rechazamos la invitación automáticamente
          if (status === "waiting") {
            //Sacamos esta sala de la lista de espera
            waitingRooms.slice(0, 1);

            //Actualizamos su estado a rechazado
            await Room_Match.update({ status: "refused" }, { where: { id } });

            //Emitimos un mensaje donde indicamos al retador que se agotó el tiempo de espera
            io.to(socket.id).emit("feedback", { message: "Se agotó el tiempo de espera" });
          }
        }, 30000);
      }
    });

    /* Escuchamos el evento socket aceptar invitación */

    socket.on("accept invitation friend", async id => {
      //Esperamos que la función acceptRoom actualice la data de la sala aceptada
      const result = await acceptRoom(id);

      //Si se agotó el tiempo de espera respondemos al retado que ya se canceló la invitación
      if (result.id === 1) io.to(socket.id).emit("feedback", result.data);

      //Si está dentro del tiempo de espera emitimos un mensaje notificando al retador que la invitacion ha sido aceptada
      if (result.id === 2) io.to(result.socketId).emit("feedback", result.data);
    });

    /* Escuchamos el evento socket rechazar invitación */

    socket.on("refuse invitation friend", async id => {
      //Esperamos que la función refuseRoom actualice la data de la sala rechazada
      const result = await refuseRoom(id);

      //Si se agotó el tiempo de espera respondemos al retado que ya se canceló la invitación
      if (result.id === 1) io.to(socket.id).emit("feedback", result.data);

      //Si está dentro del tiempo de espera emitimos un mensaje notificando al retador que la invitación ha sido aceptada
      if (result.id === 2) io.to(result.socketId).emit("feedback", result.data);
    });

    /* Escuchamos el evento socket invitación aleatoria */

    socket.on("invitation random", async data => {
      //Esperamos que la función createRoomRandom cree la sala de juego y retorne el socket ID del oponente aleatorio
      const result = await createRoomRandom(data);

      //Emitimos un mensaje de invitación al oponente aleatorio con los datos de la sala

      //Si ya existe una sala o no hay un token válido se emite un mensaje al retador
      if (result.id === 1) {
        io.to(result.socketId).emit("feedback", result.data);
        io.to(socket.id).emit("feedback", result.data);
      }

      //Emitimos un mensaje al creador con los datos de la sala
      if (result.id === 2) {
        io.to(socket.id).emit("feedback1", result.data);

        //Agregasmos el ID de la sala creada a la lista de espera
        waitingRooms.push(result.data.id);

        //Después de 30seg verificamos, si la sala sigue en espera, se rechazará automáticamente
        setTimeout(async () => {
          //Buscamos la primera sala que se colocó en espera
          const { id, status } = await getRoomById(waitingRooms[0]);

          //Verificamos, si aún sigue en espera, rechazamos la invitación automáticamente
          if (status === "waiting") {
            //Sacamos esta sala de la lista de espera
            waitingRooms.slice(0, 1);

            //Actualizamos su estado a rechazado
            await Room_Match.update({ status: "refused" }, { where: { id } });

            //Emitimos un mensaje donde indicamos al retador que se agotó el tiempo de espera
            io.to(socket.id).emit("feedback2", { message: "Se agotó el tiempo de espera" });
          }
        }, 30000);
      }
    });


    /* Recibimos el evento cuando el usuario cierra sesión*/

    socket.on("disconnect", () => {
      console.log("User disconnected");
      //User.update({ online: false }, { where: { socketId: socket.id } });
    });
  });
};
