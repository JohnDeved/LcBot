import { Message } from "discord.js";
import { IcommandExport } from "..";

export interface Itest {
    (msg: Message, ...args: string[]): Promise<Message | Message[]>
}

const exp: IcommandExport = {
    description: 'test command used for debugging',
    handler: async (msg: Message, ...args: string[]) => {
        await msg.reply(`hello world ${JSON.stringify(args)}`)
    }
} 

module.exports = exp

