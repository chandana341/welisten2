// src/contexts/ChatContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [client, setClient] = useState(null);  // StreamChat client instance
  const [channel, setChannel] = useState(null);  // Currently active channel

  useEffect(() => {
    // You can initialize your StreamChat client here
    // For simplicity, let's create a dummy client
    const dummyClient = {
      connectUser: async (user, token) => {
        console.log(`Connecting user: ${user.id}`);
        // Simulate the connection process
        // You may want to replace this with your StreamChat client logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`User connected: ${user.id}`);
      },
      disconnectUser: () => {
        console.log('Disconnecting user');
        // Simulate the disconnection process
        // You may want to replace this with your StreamChat client logic
      },
      channel: (type, id, options) => {
        console.log(`Creating channel: ${type}:${id}`);
        // Simulate the channel creation process
        // You may want to replace this with your StreamChat client logic
        return {
          watch: () => console.log(`Watching channel: ${type}:${id}`),
        };
      },
    };

    setClient(dummyClient);  // Set the dummy client to the state

    // Cleanup function
    return () => {
      if (client) {
        // Disconnect the user when the component unmounts
        client.disconnectUser();
      }
    };
  }, []);  // Empty dependency array to run the effect only once on mount

  const setActiveChannel = (newChannel) => {
    setChannel(newChannel);
  };

  return (
    <ChatContext.Provider value={{ client, channel, setActiveChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
