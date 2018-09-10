import { Message } from "discord.js";

export function test (msg: Message, ...args: string[]) {
    msg.reply('hello world' + args)
}