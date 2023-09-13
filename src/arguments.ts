import commandLineArgs from 'command-line-args'

export const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'gamertag', alias: 'g', type: String },
    { name: 'chatfix', alias: 'c', type: Boolean },
]

export const options = commandLineArgs(optionDefinitions)

export default {options, optionDefinitions}