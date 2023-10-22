import arguments from './src/arguments'
//@ts-ignore
globalThis.options = arguments.options

import Config, { ConfigFile } from './src/config'

//@ts-ignore
globalThis.config = new Config(arguments.options)

import Bot from './src/bot'
import logger from './src/Logger'
// import Socket from './src/socket'
import * as fs from 'node:fs'

const originalStdoutWrite = process.stdout.write;

//@ts-ignore
process.stdout.write = function (data) {
    // Intercept the data being written to stdout
    const output: string = data.toString();
    const link_req_matches = output.match(/To sign in, use a web browser to open the page https:\/\/www.microsoft.com\/link and enter the code ([\w]+) to authenticate\./)
    if (link_req_matches) {
        let msg = `Please go to https://microsoft.com/link, enter the code ${link_req_matches[1]} and sign in.`
        //@ts-ignore
        if (globalThis.options.verbose) return console.log(msg)
        return logger.info(msg, true)
        
    } else if (output === '[msa] Signed in with Microsoft') {
        let msg = 'Signed in with Microsoft.'
        //@ts-ignore
        if (globalThis.options.verbose) return console.log(msg)
        
        return logger.success(msg, true)
        
    } else if (output.startsWith('Connecting to ')) {
        let msg = 'Attempting to connect to the server...'
        //@ts-ignore
        if (globalThis.options.verbose) return console.log(msg)
        return logger.info(msg, true)
        
    } else {
        //@ts-ignore
        originalStdoutWrite.apply(process.stdout, arguments);   
    }
};

const bot = new Bot()
// const socket = new Socket(bot.parseSocketMessage.bind(bot))

bot.addEventListener('spawn', (packet) => {
    logger.success(`Connected as ${bot.username}`, true)
    
    bot.EnableChatLog()
})


process.stdin.on("data", (data: any) => {
    const message: string = data.toString().trim()
    // console.log(`Received message ${message}`)
    if (message.startsWith('ex$')) eval(message.substring(1, -1))

    if (message.startsWith('/')) {
        bot.command(message)
    } else {
        bot.chat(message)
    }
})