// import protocol from 'bedrock-protocol'
import * as protocol from 'bedrock-protocol'
import { ConfigFile } from './config'
import { PacketType } from './types'
import logger from './Logger'

export default class Bot {
    client: protocol.Client
    //@ts-ignore
    config: ConfigFile = globalThis.config
    username: string | null = null

    constructor() {
        logger.info('Attempting to create client. If you receive a 401 Unauthorized doing this, log into the launcher and try again.')
        this.client = protocol.createClient({
            host: "server.skyblock.com",
            port: 19132,
            profilesFolder: `./acc_${this.config.gamertag}`,
            username: '',
            // onMsaCode: console.log
        })

        this.addEventListener('spawn', ()=>{
            //@ts-ignore
            this.username = this.client.username
            logger.success('Spawned in!', true)

            //@ts-ignore
            if (globalThis.options.chatfix) {
                this.command('/spawn')
            }
        })
    }

    addEventListener(event: string, callback: (args: any[]) => void | any) {
        //@ts-ignore
        this.client.on(event, callback)
    }
    

    chat(message: string) {
        this.queue('text', {
            type: 'chat', 
            needs_translation: false, 
            source_name: this.username, 
            xuid: '', 
            platform_chat_id: '', 
            message: message
        })  
    }

    command(message: string) {
        if (!message.startsWith('/')) message = '/' + message
        
        this.client.queue('command_request', {
            command: message,
            origin: {
                type: 'player',
                uuid: '',
                request_id: '',
            },
            internal: false,
            version: 52,
        })
    }

    EnableChatLog() {
        this.addEventListener('text', (packet: any) => {
            if (packet.type !== 'system') return

            var formatted = packet.message.replace(/§[a-f0-9kl-or]/g, '')
            logger.info(formatted)
        })
    }

    queue(...args: any[]) {
        //@ts-ignore
        this.client.queue(...args)
    }

    /* parseSocketMessage(message: string): string | void {
        let data: string | null = null;
        try {
            data = atob(message)
        } catch {
            logger.error(`Failed to parse websocket message ${message}`)
            return
        }

        logger.success(JSON.parse(data))
    } */


}