
import { Client, Message } from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()

import commands, { Icommands } from './modules'

class LcBot {
  private commands: Icommands = commands

  private client: Client = new Client()
  private token: string = process.env.TOKEN

  private parseArgs (str: string): string[] {
    let args: string[] = str.match(/[^" ]+|"(?:.)+?[^\\]"/g)
    if (!args) { return [] }
    args = args.map((x: string) => {
      return x
        .replace(/^"|"$/g, '')
        .replace(/\\"/g, '"')
    })
    return args
  }

  private on: object = {
    ready: (): void => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    },
    message: (msg: Message): void => {
      const regex: RegExp = /^!([\w_]+)/
      if (!regex.test(msg.content)) { return }
      const [, command ]: RegExpMatchArray = msg.content.match(regex)
      const rest: string = msg.content.replace(regex, '')

      if (this.commands[command]) {
        const args: string[] = this.parseArgs(rest)
        this.commands[command](msg, ...args)
      } else {
        msg.reply(`unknown command \`${command}\``)
      }
    }
  }

  public init (): void {
    for (const key in this.on) {
      if (this.on.hasOwnProperty(key)) {
        const handler = this.on[key]
        this.client.on(key, handler)
      }
    }
  }

  constructor () {
    this.client.login(this.token)
    this.init()
  }
}

export default new LcBot()
