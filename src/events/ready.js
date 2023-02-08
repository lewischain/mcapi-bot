const { Events, Client } = require("discord.js");
const config = require("../../config.json");
const mcapi = require("../MinecraftAPI");

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   * 
   * @param {Client} client 
   */
  async execute(client) {
    setInterval(async() => {
      const mcserver = await mcapi(config.mcip);

      const players = `${mcserver.nowPlayers} kişi`;

      client.user.setPresence({ activities: [{ name: `${players}`, }], status: "online" })
    }, 3000)
  }
}