import wss, { WebSocketServer } from 'ws';
import logger from './Logger';

export default class /* WebSocket */ {
    public server: wss.Server | null
    public sockets: wss[] = []
    public onMessage: (message: string) => void

    private port: number = 26176

    constructor(_onMessage: (message: any) => void) {
        this.onMessage = _onMessage

        this.server = new WebSocketServer({
            port: this.port,
        })

        this.server?.on('connection', this.onConnection.bind(this))
    }

    onConnection(ws: wss, request: any) {
        // console.log(ws)
        // console.log(request)
        logger.success('Websocket received a connection.')
        
        ws.on('message', (message: wss.RawData) => {
            this.onMessage(message.toString())
        })
        
        ws.on('close', _ => {
            logger.warn('Websocket connection has closed')
        })
        
        ws.on('error', (err: any) => {
            logger.error('Error occured during websocket connection')
        })

        this.sockets.push(ws)
    }

    sendMessage(message: string) {
        this.sockets.forEach(ws => {
            ws.send(message)
        })
    }

    end() {
        this.sockets.forEach(ws => {
            ws.close()
        })

        this.server?.close()
    }
}