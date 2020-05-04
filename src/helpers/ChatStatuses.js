const ChatStatuses = {
    Error: -2,
    ChatFinished: -1,
    WaitUserReply: 1, // expecting user answer
    WaitBotReply: 2 // last message reply.sendAt > current time 
};

export {ChatStatuses};