import MultiLangLogger from './MultiLangLogger/typescript'


export class Logger extends MultiLangLogger {
    constructor() {
        super('bot')
    }
}

export class VerboseLogger extends Logger {
    time_format: String = ''

    constructor() {
        super()
        this.name = ''
    }
    
    Log(message: String, type: String, showWhenVerbose: boolean = false) {
        //@ts-ignore
        if (globalThis?.options.verbose && !showWhenVerbose) return;

        console.log(message)
    }

    info(message: String, showWhenVerbose: boolean = false) {
        this.Log(message, 'info', showWhenVerbose)
    }

    warn(message: String, showWhenVerbose: boolean = false) {
        this.Log(message, 'warn', showWhenVerbose)
    }

    error(message: String, showWhenVerbose: boolean = false) {
        this.Log(message, 'error', showWhenVerbose)
    }

    success(message: String, showWhenVerbose: boolean = false) {
        this.Log(message, 'success', showWhenVerbose)
    }
}

let logger: Logger | VerboseLogger

//@ts-ignore
if (globalThis?.options.verbose) {
    logger = new VerboseLogger()
} else {
    logger = new Logger()
}

export default logger