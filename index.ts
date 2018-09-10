
import { Client, Message } from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()

class LcBot {
  private client: Client = new Client()
  private token: string = process.env.TOKEN

  private parseArgs (msg): string[] {
    let args = msg.content.split(';')
    args = args.map(el => el.trim())
    args = args.filter(el => el !== '')
    return args
  }

  private commands: object = {
    test: (msg: Message) => {
      msg.reply('hello world')
    }
  }

  private on: object = {
    ready: () => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    },
    message: (msg: Message) => {
      if (!/^!([\w_]+)/.test(msg.content)) { return }
      const [, command ]: RegExpMatchArray = msg.content.match(/^!([\w_]+)/)

      if (command && this.commands[command]) {
        const args: string[] = this.parseArgs(msg)
        this.commands[command](msg, ...args)
      } else {
        command && msg.reply(`unknown command \`${command}\``)
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
