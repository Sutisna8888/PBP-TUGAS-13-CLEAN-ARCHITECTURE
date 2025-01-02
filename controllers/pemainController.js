const pemainService = require("../services/pemainService");
const { NotFoundError } = require("../utils/errors");

const getAllPlayers = async (req, res, next) => {
  try {
    const { liga } = req.params;
    const players = await pemainService.getAllPlayersByLiga(liga);

    if (players.length === 0) {
      return res.status(200).json({
        message: `Data pemain di liga ${liga} masih kosong`,
        data: [],
      });
    }

    res.json({
      message: `Data pemain di liga ${liga} berhasil diambil`,
      data: players,
    });
  } catch (error) {
    next(error);
  }
};

const getPlayerById = async (req, res, next) => {
  try {
    const { liga, id } = req.params;
    const player = await pemainService.getPlayerById(liga, parseInt(id));
    if (!player) throw new NotFoundError("Player not found");
    res.json(player);
  } catch (error) {
    next(error);
  }
};

const createPlayer = async (req, res, next) => {
  try {
    const { liga } = req.params;
    const newPlayer = await pemainService.createPlayer(liga, req.body);
    if (!newPlayer.id) {
      throw new Error("ID pemain tidak ditemukan.");
    }
    res.status(201).json({
      message: `Data pemain baru berhasil ditambahkan ke liga ${liga}`,
      data: newPlayer,
    });
  } catch (error) {
    next(error);
  }
};

const updatePlayer = async (req, res, next) => {
   try {
     const { liga, id } = req.params;
     const updatedPlayer = await pemainService.updatePlayer(
       liga,
       parseInt(id),
       req.body
     );
     res.json(updatedPlayer);
   } catch (error) {
     next(error);
   }
 };
const deletePlayer = async (req, res, next) => {
  try {
    const { liga, id } = req.params;
    await pemainService.deletePlayer(liga, parseInt(id));
    res.status(204).json({
      message: `Data pemain dengan ID ${id} berhasil dihapus dari liga ${liga}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
