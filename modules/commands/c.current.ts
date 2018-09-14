import * as git from 'simple-git'
import { Message, RichEmbed } from 'discord.js'
import { IcommandExport } from '..'

export interface Icurrent {
  (msg: Message)
}

const exp: IcommandExport = {
  description: 'get current commit of configured repo',
  handler: async (msg: Message) => {
    await git(process.env.REPO)
      .log(['-1'], (err, log) => {
        if (err) return console.error(err)
        const embed = new RichEmbed()

        embed.setTitle(log.latest.author_name)
        embed.addField(log.latest.hash.slice(0, 8) + ':', log.latest.message)

        msg.reply('current commit:', { embed })
      })
  }
}

module.exports = exp
