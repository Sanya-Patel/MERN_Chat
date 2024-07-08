export const isSameSenderMargin = (messages, message, i, userId) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1]?.sender?._id === message.sender._id &&
        message.sender._id !== userId
    ) {
        return 33;
    } else if (
        (i < messages.length - 1 &&
            messages[i + 1]?.sender?._id !== message.sender._id &&
            message.sender._id !== userId) ||
        (i === messages.length - 1 && message.sender._id !== userId)
    ) {
        return 0;
    } else {
        return "auto";
    }
};

export const isSameSender = (messages, message, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1]?.sender?._id !== message.sender._id ||
            messages[i + 1]?.sender?._id === undefined) &&
        message.sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1]?.sender?._id !== userId &&
        messages[messages.length - 1]?.sender?._id
    );
};

export const isSameUser = (messages, message, i) => {
    return i > 0 && messages[i - 1]?.sender?._id === message.sender._id;
};

export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};
