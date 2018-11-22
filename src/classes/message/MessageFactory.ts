import Message  from "./Message"

export default class MessageFactory {
    static getDefault(): Message {
        return new Message()
    }
}