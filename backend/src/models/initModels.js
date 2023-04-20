const {
  User,
  User_Friend,
  Room_Match,
  Achievement,
  Advantage,
  News,
  Question,
  Topic,
  User_Achievement,
  User_Advantage,
  User_Topic
} = require("./index");

const initModels = () => {
  /* ------------------------ Relación entre usuarios amigos ------------------------ */

  User.hasMany(User_Friend, { as: "friends", foreignKey: "user_id" });
  User_Friend.belongsTo(User, { as: "userFriend", foreignKey: "user_id" });

  User.hasMany(User_Friend, { as: "added", foreignKey: "added_user_id" });
  User_Friend.belongsTo(User, { as: "userAdded", foreignKey: "added_user_id" });

  /* -------------------------    Relación entre usuarios    ------------------------- */

  User.hasMany(Room_Match, { as: "rooms", foreignKey: "user_id" });
  Room_Match.belongsTo(User, { as: "user", foreignKey: "user_id" });

  User.hasMany(Room_Match, { as: "roomsMatch", foreignKey: "opponent_user_id" });
  Room_Match.belongsTo(User, { as: "opponent", foreignKey: "opponent_user_id" });

  /* -------------------------  Relación User - Achievement  ------------------------- */

  User.belongsToMany(Achievement, { as: "achievements", through: User_Achievement });
  Achievement.belongsToMany(User, { as: "users", through: User_Achievement });

  /* -------------------------   Relación User - Advantage   ------------------------- */

  User.belongsToMany(Advantage, { as: "advantages", through: User_Advantage });
  Advantage.belongsToMany(User, { as: "users", through: User_Advantage });

  /* -------------------------     Relación User - Topic     ------------------------- */

  User.belongsToMany(Topic, { as: "topics", through: User_Topic });
  Topic.belongsToMany(User, { as: "users", through: User_Topic });

  /* -------------------------   Relación Topic - Question   ------------------------- */

  Topic.hasMany(Question);
  Question.belongsTo(Topic);

  /* -------------------------     Relación Topic - News     ------------------------- */

  Topic.hasMany(News);
  News.belongsTo(Topic);
};

module.exports = initModels;
