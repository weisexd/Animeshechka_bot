import { Message } from 'telegraf/types';

const getMessageType = (message: Message): string => {
    if (!message) return 'unknown';

    if ('text' in message) return 'text';
    if ('photo' in message) return 'photo';
    if ('animation' in message) return 'animation';
    if ('video' in message) return 'video';
    if ('voice' in message) return 'voice';
    if ('sticker' in message) return 'sticker';
    if ('document' in message) return 'document';

    return 'unknown';
}

export default getMessageType;