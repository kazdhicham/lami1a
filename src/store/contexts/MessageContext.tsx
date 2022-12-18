import React from "react";
const initialState = {
  messages: [''],
  addMessage: (message: string) => { initialState.messages.concat(message) },
};
const MessageContext = React.createContext(initialState);


type MessageProviderProps = {
  children: React.ReactNode;
};

function MessageProvider({ children }: MessageProviderProps) {

  const [messages, _addMessage] = React.useState<any>(initialState);
  console.log({ messages })
  const addMessage = (message: string) => {
    const mesMessages = messages.concat(message)
    _addMessage(mesMessages);
  };


  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageProvider, MessageContext };
