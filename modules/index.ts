import { readdir } from 'fs'
import { join } from 'path'
import { Message } from 'discord.js'
import { Itest } from './commands/t.test'
import { Ihelp } from './commands/h.help'
import { Ipull } from './commands/p.pull'

export interface Icommands {
  test?: Itest,
  help?: Ihelp,
  pull?: Ipull
}

export interface IcommandExportFunction {
  (msg: Message)
}

export interface IcommandExport {
  description: string,
  handler: IcommandExportFunction
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
