import React from "react";
import { Avatar, Tooltip, Box } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            <Box
              bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
              ml={isSameSenderMargin(messages, m, i, user._id)}
              mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
              borderRadius="20px"
              p="5px 15px"
              maxW="75%"
            >
              {m.content}
            </Box>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
