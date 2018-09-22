import * as npm from 'npm'
import { Message, RichEmbed } from 'discord.js'
import { IcommandExport } from '..'

export interface Inpm {
  (msg: Message, command: string, ...args: string[])
}

const exp: IcommandExport = {
  description: 'use npm in the configured repo',
  handler: async (msg: Message, command: string, ...args: string[]) => {
    npm.load(err => {
      if (err) return console.error(err)
      npm.commands[command](args || [], (...args) => msg.reply(JSON.stringify(args, null, 4)))
    })
  }
}

module.exports = exp
