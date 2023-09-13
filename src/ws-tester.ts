import ws, { WebSocket } from 'ws'

const client = new WebSocket('ws://localhost:26176')

client.on('message', function message(data) {
    console.log('received: %s', data);
});

client.on('open', (_ws: ws) => {
    client.send('Hello World!')
})

process.stdin.on('data', (data) => {
    const message = data.toString().trim()
    console.log("sending: " + message)
    client.send(message)
})