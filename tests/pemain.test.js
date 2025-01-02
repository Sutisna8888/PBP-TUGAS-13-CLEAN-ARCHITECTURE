const request = require("supertest");
const app = require("../app"); // Pastikan app.js sudah diexport dengan benar
const prisma = require("../prisma/client");

// Clean up database before and after tests
beforeAll(async () => {
  await prisma.ligabelanda.deleteMany();
  await prisma.ligainggris.deleteMany();
  await prisma.ligaspanyol.deleteMany();
  await prisma.ligaprancis.deleteMany();
  await prisma.ligajerman.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Pemain API", () => {
  // Test create player
  it("should create a new player", async () => {
    const playerData = {
      nama: "Cristiano Ronaldo",
      umur: 36,
      posisi: "FW",
      NA: "Portugal",
      KA: "Manchester United",
      KSI: "Al Nassr",
      harga: "50000000",
    };

    const response = await request(app)
      .post("/pemain/ligabelanda")
      .send(playerData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.nama).toBe(playerData.nama);
  });

  // Test get all players from a specific liga
  it("should return players from liga", async () => {
    const response = await request(app).get("/pemain/ligabelanda");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Data pemain di liga ligabelanda berhasil diambil"
    );
  });

  // Test get player by ID
  it("should return a player by ID", async () => {
    const newPlayer = await prisma.ligabelanda.create({
      data: {
        nama: "Lionel Messi",
        umur: 34,
        posisi: "FW",
        NA: "Argentina",
        KA: "Barcelona",
        KSI: "Paris Saint-Germain",
        harga: "80000000",
      },
    });

    const response = await request(app).get(
      `/pemain/ligabelanda/${newPlayer.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.nama).toBe(newPlayer.nama);
  });

  // Test update player
  it("should update a player's information", async () => {
   const newPlayer = await prisma.ligabelanda.create({
     data: {
       nama: "Zlatan Ibrahimovic",
       umur: 40,
       posisi: "FW",
       NA: "Sweden",
       KA: "AC Milan",
       KSI: "LA Galaxy",
       harga: "12000000",
     },
   });

   const updatedPlayer = {
     nama: "Zlatan Ibrahimovic",
     umur: 41,
     posisi: "FW",
     NA: "Sweden",
     KA: "AC Milan",
     KSI: "LA Galaxy",
     harga: "15000000",
   };

   const response = await request(app)
     .put(`/pemain/ligabelanda/${newPlayer.id}`)
     .send(updatedPlayer);

   expect(response.status).toBe(200);
   expect(response.body.umur).toBe(41);
   expect(response.body.harga).toBe("15000000");
 });

 
  it("should delete a player", async () => {
    const newPlayer = await prisma.ligabelanda.create({
      data: {
        nama: "Neymar Jr",
        umur: 29,
        posisi: "FW",
        NA: "Brazil",
        KA: "Paris Saint-Germain",
        KSI: "Al Hilal",
        harga: "95000000",
      },
    });

    const response = await request(app).delete(
      `/pemain/ligabelanda/${newPlayer.id}`
    );

    expect(response.status).toBe(204);
  });
});
