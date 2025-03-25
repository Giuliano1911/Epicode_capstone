import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Client } from 'stompjs'
import { over } from 'stompjs'
import { URL } from '../config/config'
import SockJs from 'sockjs-client'

import UserResponse from '../types/UserResponse'
import MessageResponse from '../types/MessageResponse'

import DashboardNav from './DashboardNav'
import FetchLoading from './FetchLoading'
import FetchError from './FetchError'

interface UserDataType {
  username: string
  receiverName: string
  connected: boolean
  message: string
}

const userDataInitialState = {
  username: '',
  receiverName: '',
  connected: false,
  message: '',
}

let stompClient: Client | null = null
function ChatRoom() {
  const [userData, setUserData] = useState<UserDataType>(userDataInitialState)
  const [publicChats, setPublicChats] = useState<MessageResponse[]>([])
  const [privateChats, setPrivateChats] = useState(new Map())
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('CHATROOM')

  const getUser = async () => {
    fetch(URL + 'customers/' + params.id, {
      headers: {
        Authorization: 'Bearer ' + token!,
      },
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Failed to retrieve data')
        }
      })
      .then((data: UserResponse) => {
        console.log(data)
        setIsLoading(false)
        setUserData({
          ...userData,
          username: data!.name + '-' + data!.surname,
        })
      })
      .catch((error) => {
        setIsError(true)
        setIsError(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const RegisterUser = () => {
    const Sock = new SockJs('http://localhost:8080/ws')
    stompClient = over(Sock)
    stompClient!.connect({}, onConnected, onError)
  }

  const onConnected = () => {
    setUserData({
      ...userData,
      connected: true,
    })
    stompClient!.subscribe('/chatroom/public', onPublicMessageReceived)
    stompClient!.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessageReceived
    )
    userJoin()
  }

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    }
    stompClient!.send('/app/message', {}, JSON.stringify(chatMessage))
  }

  const onPublicMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body)
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, [])
          setPrivateChats(new Map(privateChats))
        }
        break
      case 'MESSAGE':
        publicChats.push(payloadData)
        setPublicChats([...publicChats])
        break
    }
  }

  const onError = (err: Error) => {
    console.log(err)
  }

  const onPrivateMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body)
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData)
      setPrivateChats(new Map(privateChats))
    } else {
      const list = []
      list.push(payloadData)
      privateChats.set(payloadData.senderName, list)
      setPrivateChats(new Map(privateChats))
    }
  }

  const handleValue = (e) => {
    const { value } = e.target
    setUserData({
      ...userData,
      message: value,
    })
  }

  const sendPublicMessage = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        status: 'MESSAGE',
        content: userData.message,
      }
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
      setUserData({
        ...userData,
        message: '',
      })
    }
  }

  const sendPrivateMessage = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        status: 'MESSAGE',
        content: userData.message,
      }
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage)
        setPrivateChats(new Map(privateChats))
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
      setUserData({
        ...userData,
        message: '',
      })
    }
  }

  return (
    <>
      <DashboardNav role={role!} />
      {isLoading && <FetchLoading />}
      {isError && <FetchError />}
      {!isError && !isLoading && (
        <Container className="mt-5">
          <Row>
            <Col className="text-center mt-5 h-100">
              {userData.connected ? (
                <>
                  <Row className="justify-content-around chat">
                    <Col className="col-12 col-md-4 mt-5 h-100 bg-body-tertiary rounded-4">
                      <ul className="list-unstyled d-flex flex-column gap-2 mt-2">
                        <li
                          style={{ cursor: 'pointer' }}
                          className={
                            tab === 'CHATROOM'
                              ? 'fw-bold border rounded-2'
                              : 'border rounded-2'
                          }
                          onClick={() => {
                            setTab('CHATROOM')
                          }}
                        >
                          ChatRoom
                        </li>
                        {[...privateChats.keys()].map((name, index) => (
                          <li
                            className={
                              tab === name
                                ? 'fw-bold border rounded-2'
                                : 'border rounded-2'
                            }
                            onClick={() => {
                              setTab(name)
                            }}
                            key={index}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </Col>
                    {tab === 'CHATROOM' && (
                      <Col className="col-12 col-md-7 mt-5 h-100 bg-body-tertiary rounded-4 d-flex flex-column justify-content-between chat">
                        <div>
                          <h3 className="mt-2">ChatRoom</h3>
                          <ul className="list-unstyled d-flex flex-column gap-2 mt-2">
                            {publicChats.map((chat, index) => (
                              <li
                                key={index}
                                className="d-flex justify-content-center gap-4"
                              >
                                {chat.senderName !== userData.username && (
                                  <div className="bg-white rounded-pill border-0 px-4">
                                    {chat.senderName}
                                  </div>
                                )}
                                <div>{chat.content}</div>
                                {chat.senderName === userData.username && (
                                  <div className="submit-button-login rounded-pill border-0 px-4">
                                    {chat.senderName}
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="d-flex gap-2 mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Scrivi qualcosa..."
                            value={userData.message}
                            name="message"
                            onChange={handleValue}
                          ></input>
                          <Button
                            className="submit-button-login rounded-pill border-0 px-4 fw-bold"
                            type="button"
                            onClick={sendPublicMessage}
                          >
                            Invia
                          </Button>
                        </div>
                      </Col>
                    )}
                    {tab !== 'CHATROOM' && (
                      <Col className="col-12 col-md-7 mt-5 h-100 bg-body-tertiary rounded-4 d-flex flex-column justify-content-between chat">
                        <div>
                          <h3 className="mt-2">Chat con {tab}</h3>
                          <ul className="list-unstyled d-flex flex-column gap-2 mt-2">
                            {[...privateChats.get(tab)].map((chat, index) => (
                              <li
                                className="d-flex justify-content-center gap-4"
                                key={index}
                              >
                                {chat.senderName !== userData.username && (
                                  <div>{chat.senderName}</div>
                                )}
                                <div>{chat.content}</div>
                                {chat.senderName === userData.username && (
                                  <div>{chat.senderName}</div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="d-flex gap-2 mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Scrivi qualcosa..."
                            value={userData.message}
                            name="message"
                            onChange={handleValue}
                          ></input>
                          <Button
                            className="submit-button-login rounded-pill border-0 px-4 fw-bold"
                            type="button"
                            onClick={sendPrivateMessage}
                          >
                            Invia
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>
                </>
              ) : (
                <Button
                  className="mt-4 submit-button-login rounded-pill border-0 px-4 fw-bold"
                  onClick={() => RegisterUser()}
                >
                  Collegati alle chat
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="col-12 mt-5">
              <Button
                type="button"
                className="rounded-pill bg-white border text-black ms-2 text-uppercase"
                onClick={() => {
                  navigate(-1)
                }}
              >
                <i className="fas fa-caret-left me-2"></i>Torna indietro
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default ChatRoom
