import { useEffect, useRef, useState } from "react";

import { Box, Input, Container, VStack, HStack, Button } from "@chakra-ui/react";
import Message from "./components/Message";

import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";



const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

const LogoutHandler = () => {
  signOut(auth);
}



function App() {

  const divForScroll = useRef(null);

  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });
      setMessage("");
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  }


  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data);

    });
    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        }));

    })
    return () => {
      unsubscribe();
      unsubscribeForMessage()
    }
  }, [])


  return (

    <Box bg={"red.50"}>
      {
        user ? (
          <Container
            h={"100vh"}
            w={["100vw", "100vw", "50vw"]}  // [mobile, tablet, desktop]
            bg={"white"}
          >

            <VStack h={"full"} paddingY={"4"}>
              <Button onClick={LogoutHandler} colorPalette={"red"} w={"full"} >
                Logout
              </Button>

              <VStack h={"full"} w={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar": {
                display:"none",
              },
              }}>
                {
                  messages.map(item => (

                    <Message
                      key={item.id}
                      user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
                  ))
                }

                <div ref={divForScroll}></div>

              </VStack>


              <form onSubmit={submitHandler} style={{ width: "100%" }}>
                <HStack>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
                  <Button type="submit" bg={"purple"}>Send</Button>
                </HStack>


              </form>





            </VStack>
          </Container>

        ) : <VStack justifyContent={"center"} h="100vh">
          <Button onClick={loginHandler} colorPalette={"purple"}>Sign in with Google</Button>
        </VStack>
      }
    </Box>


  );
}

export default App;

