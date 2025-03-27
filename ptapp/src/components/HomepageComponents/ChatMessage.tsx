interface Message {
  role: string
  text: string
  hideInChat?: boolean
}
interface ChatMessagedProps {
  img: string
  message: Message
}

function ChatMessage({ message, img }: ChatMessagedProps) {
  return (
    <>
      {!message.hideInChat && (
        <>
          {message.role === 'model' ? (
            <div className="d-flex gap-2 align-items-center bot-message">
              <img
                width={50}
                height={50}
                className="p-1 rounded-circle flex-shrink-0 align-self-end border border-1"
                src={img}
              ></img>
              <p className="d-flex gap-2 align-items-center p-2 message">
                {message.text}
              </p>
            </div>
          ) : (
            <div className="d-flex gap-2 user-message flex-column align-items-end">
              <p className="d-flex gap-2 align-items-center p-2 message">
                {message.text}
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}
export default ChatMessage
