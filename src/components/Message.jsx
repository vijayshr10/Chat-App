import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'

const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack alignSelf={user === "me" ? "flex-end" : "flex-start"} borderRadius={"md"} bg={"gray.100"} paddingX={4} paddingY={2}>

      {
        user === "other" && <Avatar.Root colorPalette="red"> <Avatar.Fallback  />
        <Avatar.Image src={uri} /> </Avatar.Root>
      }
      <Text>{text}</Text>
      {
        user === "me"
        &&
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image src={uri} />
        </Avatar.Root>
      }
    </HStack>
  )
}

export default Message