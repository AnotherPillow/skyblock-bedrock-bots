export type PacketType = {
    type: string,
    needs_translation: boolean,
    source_name: string,
    message: string,
    parameters: any,
    xuid: string,
    platform_chat_id: string,
}