const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");
const mcapi = require("../MinecraftAPI");
const config = require("../../config.json");

module.exports = {
    name: "sunucubilgi",
    description: "MC Sunucunuzun bilgilerini gösterir.",
    options: [],
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    async execute(client, interaction) {
      await interaction.deferReply();
      
      const { user, options, guild } = interaction;
      const mcserver = await mcapi(`${config.mcip}`);

      const embed = new EmbedBuilder()  
      .setColor("Blue")  
      .setAuthor({ name: `${mcserver.ip}`, iconURL: interaction.user.avatarURL() })
      .setTitle(`${mcserver.ip} sunucusu için bilgiler`)
      .addFields([
        {
            name: "Ping;",
            value: `\`\`\`yaml\n${mcserver.ping}ms\n\`\`\``,
            inline: true
        },
        {
            name: "Şifre;",
            value: `\`\`\`yaml\n${mcserver.password ? mcserver.password : "Ücretsiz"}\n\`\`\``,
            inline: true
        },
        {
            name: "Giriş yap;",
            value: `\`\`\`yaml\n${mcserver.connect.split(":")[0]}\n\`\`\``,
            inline: true
        },
        {
            name: "Bot oyuncular;",
            value: `\`\`\`yaml\n${mcserver.bots.length}\n\`\`\``,
            inline: true
        },
        {
            name: "En fazla kapasite;",
            value: `\`\`\`yaml\n${mcserver.maxPlayers}\n\`\`\``,
            inline: true
        },
        {
            name: "Şuan oynayanlar;",
            value: `\`\`\`yaml\n${mcserver.nowPlayers}\n\`\`\``,
            inline: true
        }
      ])  
      .setImage(`${mcserver.favicon}`)
      .setFooter({ text: "discord.gg/altyapilar | 'Roman#0001", iconURL: "https://cdn.discordapp.com/attachments/1048327214569103390/1072852544658870312/a_5f604fa4cdf5a6b25571777b02575d51.gif" })
      .setTimestamp()

      return interaction.followUp({ embeds: [embed] })
    }
  }