# skyblock bedrock bots

A program that lets you connect to skyblock.net through bedrock on an account that doesn't own bedrock. This is because bedrock doesn't require payment.

## requirements

- A Microsoft account. It **does not need to own bedrock**.

## cli arguments

- `--verbose` (`-v`), boolean. If set, will only log needed information (config errors, logged in, connecting)
- `--gamertag` (`-g`), string. Specify gamertag here if you wish not to use the config.json.
- `--chatfix` (`-c`), boolean. Automatically fix using chat on login.

## usage

1. See [building](#building)
2. Run once (just double click).
3. Specify your gamertag in `config.json`.
4. You can now run it and follow instructions on screen, if you are looking for something a bit more automated, you can run it with `-c` to automatically fix chat.

## building

1. Install [node.js](https://nodejs.dev/en/download/) - v18 was used in the development of this project.
2. Install dependencies using `npm install`
3. Compile using `npm run build`, development can be done via `npm run dev`.
