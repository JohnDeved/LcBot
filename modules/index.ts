import { readdir } from 'fs'
import { join } from 'path'
import { Message } from 'discord.js'
import { Itest } from './commands/t.test'
import { Ihelp } from './commands/h.help'
import { Ipull } from './commands/p.pull'
import { Icurrent } from './commands/c.current'

export interface Icommands {
  test?: Itest,
  help?: Ihelp,
  pull?: Ipull,
  current?: Icurrent
}

export interface IcommandExport {
  description: string,
  handler: Function
}

export interface Iinfo {
  command: string,
  shorthand?: string,
  description: string
}

const commands: Icommands = {}
const info: Iinfo[] = []

const path: string = join(__dirname, 'commands')
readdir(path, (err, files) => {
  if (err) return console.error(err)

  files.forEach((file: string) => {
    const regex = /^(([\w_]+)\.|)([\w_]+)\.js$/
    if (regex.test(file)) {
      const [,, shorthand, command]: RegExpMatchArray = file.match(regex)
      const { description, handler }: IcommandExport = require(join(path, file))
      info.push({ command, shorthand, description })

      commands[command] = handler
      if (shorthand) {
        commands[shorthand] = handler
      }
    }
  })
})

export { info }

export default commands
