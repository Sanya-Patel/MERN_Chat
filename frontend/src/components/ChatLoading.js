import { Stack, Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
  // Create an array with 12 elements to generate skeletons
  const skeletons = Array.from({ length: 12 });

  return (
    <Stack>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height="45px" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
