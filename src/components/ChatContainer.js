// src/components/ChatContainer.js
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useAuth } from '../contexts/AuthContext';
import { getFocusGroups } from '../firebase';
import { ChatProvider, useChatContext } from '../contexts/ChatContext';  // Import useChatContext

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;
  const { messages } = channel.state;
  const lastMessage = messages[messages.length - 1];
  const lastMessageText = lastMessage ? lastMessage.text : '';

  return (
    <button onClick={() => setActiveChannel(channel)} style={{ margin: '12px' }}>
      <div>{channel.data.name || 'Unnamed Channel'}</div>
      <div style={{ fontSize: '14px' }}>{lastMessageText}</div>
    </button>
  );
};

const CustomChannelHeader = () => {
  const { channel } = useChatContext();  // Use useChatContext here
  const { data } = channel;

  return (
    <header
      style={{
        height: '40px',
        backgroundColor: 'white',
        marginBottom: '20px',
        borderRadius: '10px',
        padding: '1px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {data.image && (
        <img
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            marginRight: 10,
          }}
          src={data.image}
          alt=""
        />
      )}
      {data.name}
    </header>
  );
};

const ChatContainer = () => {
  const [client, setClient] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function init() {
      try {
        const chatClient = StreamChat.getInstance(apiKey);

        await chatClient.connectUser(user, chatClient.devToken(user.id));

        const focusGroups = await getFocusGroups();

        const channels = focusGroups.map((group) => {
          const channel = chatClient.channel('messaging', group.id, {
            name: group.name,
            members: [user.id],
          });
          channel.watch();
          return channel;
        });

        setClient(chatClient);
      } catch (error) {
        console.error('Error during channel initialization:', error);
      }
    }

    if (user) {
      init();
    }

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [client, user]);

  if (!user || !client) {
    return <LoadingIndicator />;
  }

  return (
    <ChatProvider>
      <Chat client={client} theme="messaging light">
        <ChannelList filters={filters} sort={sort} Preview={CustomChannelPreview} />
        <Channel>
          <Window>
            <CustomChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </ChatProvider>
  );
};

export default ChatContainer;
