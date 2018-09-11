import { readdir } from 'fs';
import { join } from 'path';
import { Itest } from './commands/t.test';

export interface Icommands {
    test?: Itest
}

const commands: Icommands = {}

const path = join(__dirname, 'commands')
readdir(path, (err, files) => {
    if (err) return console.error(err)

    files.forEach((file: string) => {
        const regex = /^(([\w_]+)\.|)([\w_]+)\.js$/
        if (regex.test(file)) {
            const [,, shorthand, command] = file.match(regex)

            const handler = require(join(path, file))
            commands[command] = handler
            if (shorthand)
                commands[shorthand] = handler
        }
    })
})

export default commands