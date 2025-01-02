const prisma = require("../prisma/client");

const getAllPlayersByLiga = async (liga) => {
  const players = await prisma[liga].findMany();
  return players;
};

const getPlayerById = async (liga, id) => {
  const player = await prisma[liga].findUnique({
    where: { id },
  });
  return player;
};

const createPlayer = async (liga, data) => {
  const newPlayer = await prisma[liga].create({
    data,
  });
  return newPlayer;
};

const updatePlayer = async (liga, id, data) => {
   const updatedPlayer = await prisma[liga].update({
     where: { id },
     data,
   });
   return updatedPlayer;
 };
 

const deletePlayer = async (liga, id) => {
  const deletedPlayer = await prisma[liga].delete({
    where: { id },
  });
  return deletedPlayer;
};

module.exports = {
  getAllPlayersByLiga,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
