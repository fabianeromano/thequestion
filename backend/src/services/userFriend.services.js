const { User_Friend, User } = require("../models");

class UserFriendServices {
  static async addUserFriend({ userId, addedUserId }) {
    try {
      const promises = [
        User_Friend.findOne({ where: { userId, addedUserId, status: "pending" } }),
        User_Friend.findOne({
          where: { userId: addedUserId, addedUserId: userId, status: "pending" }
        }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "refused" } }),
        User_Friend.findOne({ where: { userId, addedUserId, status: "accepted" } }),
        User_Friend.findOne({
          where: { userId: addedUserId, addedUserId: userId, status: "accepted" }
        })
      ];

      const promisesAll = await Promise.all(promises);

      if (promisesAll[0] || promisesAll[1]) throw "Pending friend request";
      if (promisesAll[2]) throw "Refused friend request";
      if (promisesAll[3] || promisesAll[4]) throw "Already friends";

      const result = await User_Friend.create({ userId, addedUserId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserFriends(id, status) {
    try {
      const [result1, result2] = await Promise.all([
        User_Friend.findAll({
          where: { userId: id, status },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userAdded",
            attributes: ["id", "username", "email", "profileImg", "points", "online", "status"]
          }
        }),
        User_Friend.findAll({
          where: { addedUserId: id, status },
          attributes: {
            exclude: ["userId", "user_id", "addedUserId", "added_user_id", "updatedAt"]
          },
          include: {
            model: User,
            as: "userFriend",
            attributes: ["id", "username", "email", "profileImg", "points", "online", "status"]
          }
        })
      ]);

      if (status === "accepted") {
        return [...result1, ...result2];
      } else {
        return [...result2];
      }
    } catch (error) {
      throw error;
    }
  }
  static async acceptFriend(id, status) {
    try {
      await User_Friend.update(status, { where: { id } });

      return { message: "Friend accepted successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteFriend(id) {
    try {
      await User_Friend.destroy({ where: { id } });

      return { message: "Friend deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserFriendServices;
