const Social = require(`${process.cwd()}/base/Social.js`);
const { MessageAttachment } = require("discord.js");

class BobRoss extends Social {
  constructor(client) {
    super(client, {
      name: "bobross",
      description: "Paint a happy little accident.",
      category: "Canvas",
      usage: "bobross @mention",
      cost: 10,
      cooldown: 10
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars 
    let msg;
    try {
      const painting = await this.verifyUser(message, args[0] ? args[0] : message.author.id);
      if (message.settings.socialSystem === "true") {
        if (!(await this.cmdPay(message, message.author.id, this.help.cost))) return;
      }
      msg = await message.channel.send(`<a:typing:397490442469376001> **${message.member.displayName}** is painting a happy little accident...`);
      await message.channel.send(new MessageAttachment(await this.client.idiotAPI.bobRoss(painting.displayAvatarURL({ format: "png", size: 512 })), "painting.png"));
      await msg.delete();
    } catch (error) {
      msg.edit("Something went wrong, please try again later");
      this.client.logger.error(error);
    }
  }
}

module.exports = BobRoss;