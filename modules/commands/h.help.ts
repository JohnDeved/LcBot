import { Message, RichEmbed } from 'discord.js'
import { info, Iinfo, IcommandExport } from '..'

export interface Ihelp {
  (msg: Message)
}

const exp: IcommandExport = {
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
    await msg.reply({ embed })
  }
}

module.exports = exp
