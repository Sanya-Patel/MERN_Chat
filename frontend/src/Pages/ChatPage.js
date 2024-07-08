import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../miscellaneous/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";


const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAagin,setFetchAgain]=useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAagin} setFetchAgain={setFetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAagin} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
