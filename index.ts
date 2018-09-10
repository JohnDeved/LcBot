
import { Client, Message } from 'discord.js'

class LcBot {
  private client: Client = new Client()
  private token: string = 'NDc5MzQ3OTIxMjg5MjE2MDIw.DneRkA.NU8AIAvk4GpWpc9alGEEGZOag90'

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
      const [, command ]: RegExpMatchArray = msg.content.match(/^!([\w_]+)/)
      console.log(command)
      if (command && this.commands[command]) {
        const args = this.parseArgs(msg)
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
  }
}

export default new LcBot().init()
