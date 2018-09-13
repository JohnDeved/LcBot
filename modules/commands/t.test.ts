import { Message } from "discord.js";

export interface Itest {
    (msg: Message): Promise<Message | Message[]>
}

module.exports = async (msg: Message, ...args: string[]) => {
    await msg.reply(`hello world ${JSON.stringify(args)}`)
}