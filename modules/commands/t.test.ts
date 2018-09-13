import { Message } from "discord.js";

export interface Itest {
    (msg: Message, ...args: string[]): Promise<Message | Message[]>
}

module.exports = {
    description: 'test command used for debugging',
    handler: async (msg: Message, ...args: string[]) => {
        await msg.reply(`hello world ${JSON.stringify(args)}`)
    }
}

