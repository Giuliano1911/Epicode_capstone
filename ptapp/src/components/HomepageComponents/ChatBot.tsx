import { FormEvent, useEffect, useRef, useState } from 'react'
import img from '../assets/8484.png'
import ChatMessage from './ChatMessage'
import { companyInfo } from '../../companyInfo'

interface MessageForm {
  message: string
}

const initialMessageForm = {
  message: '',
}

interface Message {
  role: string
  text: string
  hideInChat?: boolean
}
function ChatBot() {
  const [messageForm, setMessageForm] =
    useState<MessageForm>(initialMessageForm)
  const [messages, setMessages] = useState<Message[]>([
    {
      hideInChat: true,
      role: 'model',
      text: companyInfo,
    },
  ])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setMessages((messages) => [
      ...messages,
      { role: 'user', text: messageForm.message },
    ])

    setTimeout(() => {
      setMessages((messages) => [
        ...messages,
        { role: 'model', text: 'Sto pensando...' },
      ])
      generateBotResponse([
        ...messages,
        {
          role: 'user',
          text:
            'Utilizzando i dettagli che ti ho fornito sopra, rispondi alla seguente domanda: ' +
            messageForm.message,
        },
      ])
    }, 300)

    setMessageForm(initialMessageForm)
  }

  const generateBotResponse = async (messages: Message[]) => {
    const updateMessages = (text: string) => {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== 'Sto pensando...'),
        { role: 'model', text },
      ])
    }

    messages = messages.map(({ role, text }) => ({ role, parts: [{ text }] }))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: messages }),
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions)
      const data = await response.json()
      if (!response) throw new Error(data.error.message || 'Errore nella fetch')
      console.log(data)
      const apiResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .trim()
      updateMessages(apiResponse)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div className="shell">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        id="chatbot-toggler"
        className=" position-fixed rounded-circle d-flex align-items-center justify-content-center border-0"
      >
        <img
          width={50}
          height={50}
          className="p-1 rounded-circle flex-shrink-0"
          src={img}
        ></img>
      </button>
      <div
        className={
          isOpen
            ? 'chatbot-popup rounded-4 overflow-hidden bg-white position-fixed border border-1'
            : 'd-none'
        }
      >
        <div className="chatbot-header d-flex align-items-center justify-content-between px-2 py-3">
          <div className="d-flex gap-2 align-items-center">
            <img
              width={50}
              height={50}
              className="p-1 rounded-circle flex-shrink-0"
              src={img}
            ></img>
            <h2 className="fs-4">Muscolino</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="border-0 bg-white rounded-circle"
          >
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>

        <div
          ref={chatBodyRef}
          className="chat-body p-2 overflow-y-auto chat-body d-flex flex-column gap-2"
        >
          <div className="d-flex gap-2 align-items-center bot-message">
            <img
              width={50}
              height={50}
              className="p-1 rounded-circle flex-shrink-0 align-self-end border border-1"
              src={img}
            ></img>
            <p className="d-flex gap-2 align-items-center p-2 message">
              Ciao, sono Muscolino e sarò il tuo assistente virtuale!
              <br /> Come posso aiutarti? 💪
            </p>
          </div>
          {messages.map((message, index) => (
            <ChatMessage message={message} img={img} key={index} />
          ))}
          <div className="mb-4"></div>
          <div className="mb-4"></div>
        </div>

        <div className="chat-footer position-absolute bottom-0 w-100 bg-white p-2">
          <form
            action="#"
            onSubmit={(e) => handleSubmit(e)}
            className="chat-form d-flex align-items-center border border-1 border-black rounded-pill"
          >
            <input
              value={messageForm.message}
              onChange={(e) => {
                setMessageForm({ ...messageForm, message: e.target.value })
              }}
              type="text"
              placeholder="Scrivi qualcosa..."
              className="message-input border-0 w-100 rounded-pill px-3"
              required
            />
            <button className="border-0 bg-white rounded-circle me-3 flex-shrink-0">
              <i className="fas fa-arrow-up"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
