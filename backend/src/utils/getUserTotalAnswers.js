const { Op } = require("sequelize");
const { Room_Match } = require("../models");

const getUserTotalAnswers = async id => {
  const result1 = await Room_Match.findAll({
    where: { userId: id, status: { [Op.not]: "refused" } }
  });
  const result2 = await Room_Match.findAll({
    where: { opponentUserId: id, status: { [Op.not]: "refused" } }
  });

  const result = [];

  result1.forEach(item => result.push(item.dataRoom.player1));
  result2.forEach(item => result.push(item.dataRoom.player2));

  const total = result.reduce(
    (accumulator, currentValue) => accumulator + currentValue.correctAnswers?.length,
    0
  );

  return total;
};

module.exports = getUserTotalAnswers;
