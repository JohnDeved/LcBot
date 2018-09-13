import { Message } from "discord.js";
import { info } from "..";

export interface Ihelp {
    (msg: Message): Promise<Message | Message[]>
}

module.exports = {
    description: 'list all the available commands',
    handler: async (msg: Message) => {
        msg.reply(JSON.stringify(info, null, 4))
    }
}