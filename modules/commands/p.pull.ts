import * as git from 'simple-git'
import { Message, RichEmbed } from 'discord.js'
import { IcommandExport } from '..'

export interface Ipull {
  (msg: Message)
}

const exp: IcommandExport = {
  description: 'executes a git pull in the configured git repo',
  handler: async (msg: Message) => {
    if (!process.env.REPO) {
      await msg.reply('dotenv var "REPO" was not defined!')
      return
    }

    await git(process.env.REPO)
      .pull((err, pull) => {
        if (err) return console.error(err)
        const embed = new RichEmbed()

        for (const key in pull.summary) {
          if (pull.summary.hasOwnProperty(key)) {
            const element = pull.summary[key]
            embed.addField(key, pull.summary[key])
          }
        }

        msg.reply(embed)
      })
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
