import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Thread,
  AssistantMessage,
  UserMessage,
  Composer,
  useThreadRuntime,
  ThreadConfigProvider
} from '@assistant-ui/react';
import { useSendMessageMutation, useGetConversationHistoryQuery } from '../../../state/chatApi';
import { addMessage, setTyping } from '../../../state/chatSlice';

const ChatBotInterface = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const [sendMessage] = useSendMessageMutation();
  const { data: conversationHistory } = useGetConversationHistoryQuery();
  const runtime = useThreadRuntime();

  const handleSendMessage = async (message) => {
    dispatch(setTyping(true));
    
    try {
      const response = await sendMessage(message).unwrap();
      
      dispatch(addMessage({
        id: Date.now(),
        content: response.message,
        isUser: false,
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      dispatch(setTyping(false));
    }
  };

  // Load conversation history
  useEffect(() => {
    if (conversationHistory) {
      conversationHistory.forEach(msg => {
        dispatch(addMessage({
          id: msg.id,
          content: msg.content,
          isUser: msg.isUser,
        }));
      });
    }
  }, [conversationHistory, dispatch]);

  const handleCopyMessage = (messageId) => {
    const message = messages.find(m => m.id.toString() === messageId);
    if (message) {
      navigator.clipboard.writeText(message.content);
    }
  };

  return (
    <ThreadConfigProvider
      theme="light"
      config={{
        avatars: {
          user: {
            src: "/user-avatar.png",
            alt: "User"
          },
          assistant: {
            src: "/assistant-avatar.png",
            alt: "Assistant"
          }
        }
      }}
    >
      <div className="h-screen max-w-4xl mx-auto">
        <Thread>
          {messages.map((message) => (
            message.isUser ? (
              <UserMessage
                key={message.id}
                id={message.id.toString()}
                content={message.content}
              />
            ) : (
              <AssistantMessage
                key={message.id}
                id={message.id.toString()}
                content={message.content}
                actions={[
                  {
                    icon: "🔄",
                    label: "Regenerate",
                    onClick: () => {
                      // Handle regenerate action
                    }
                  },
                  {
                    icon: "📋",
                    label: "Copy",
                    onClick: () => handleCopyMessage(message.id.toString())
                  }
                ]}
              />
            )
          ))}
          {isTyping && (
            <AssistantMessage
              id="typing"
              content="..."
              className="typing-indicator"
            />
          )}
          <Composer
            onSend={handleSendMessage}
            placeholder="Type your message..."
            className="mt-4"
          />
        </Thread>
      </div>
    </ThreadConfigProvider>
  );
};

export default ChatBotInterface;