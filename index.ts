
import { Client } from 'discord.js'

class LcBot {
  private client: Client = new Client()
  private token: string = 'NDc5MzQ3OTIxMjg5MjE2MDIw.DneRkA.NU8AIAvk4GpWpc9alGEEGZOag90'

  private parseArgs (msg): string[] {
    let args = msg.content.split(';')
    args = args.map(el => el.trim())
    args = args.filter(el => el !== '')
    return args
  }

  private on: object = {
    ready: () => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    },
    message: msg => {
      if (/^![\w_]+/) {
        
      }
    }
  }

  public init () {
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
