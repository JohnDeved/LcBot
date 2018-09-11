import { Message } from "discord.js";

export async function test (msg: Message, ...args: string[]) {
    await msg.reply('hello world' + args)
}