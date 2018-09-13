import { Message, RichEmbed } from "discord.js";
import { info, Iinfo } from "..";

export interface Ihelp {
    (msg: Message): Promise<Message | Message[]>
}

module.exports = {
    description: 'list all the available commands',
    handler: async (msg: Message) => {
        const embed = new RichEmbed()

        info.forEach((i: Iinfo) => {
            if (i.shorthand) {
                embed.addField('!' + i.command, `\`shorthand: !${i.shorthand}\`\n${i.description}\n___`)
            } else {
                embed.addField('!' + i.command, i.description + '\n___')
            }
        })
        msg.reply({ embed })
    }
}