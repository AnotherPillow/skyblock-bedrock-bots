import * as fs from 'node:fs'
import commandLineArgs from 'command-line-args'
import { exec } from 'node:child_process'
import logger from './Logger'

export type ConfigFile = {
    gamertag: string
}

export default class Config {
    file: ConfigFile

    constructor(options: commandLineArgs.CommandLineOptions) {
        if (!fs.existsSync('config.json'))
            fs.writeFileSync('config.json', JSON.stringify({"gamertag": "gamertag_here"}, null, 4))
        this.file = JSON.parse(fs.readFileSync('config.json').toString() ?? '{}')

        if (this.file.gamertag === 'gamertag_here') {
            logger.error('Please put the correct gamertag in the config.json file and restart.', true)
            exec('pause')
            process.exit(1)
        }

        for (const prop of Object.keys(this.file)) {
            //@ts-ignore
            this[prop] = this.file[prop]
        }

        if (options.gamertag) this.file.gamertag = options.gamertag
    }
}