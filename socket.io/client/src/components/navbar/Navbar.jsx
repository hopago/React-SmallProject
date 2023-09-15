import { useEffect, useState } from 'react';
import './navbar.css';


// svg to jsx
const NotificationSvg = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="510"
      height="510"
      x="0"
      y="0"
      fill="#fff"
      enableBackground="new 0 0 510 510"
      version="1.1"
      viewBox="0 0 510 510"
      xmlSpace="preserve"
      className={className}
    >
      <g transform="matrix(.87659 0 0 .87659 31.47 31.47)">
        <g>
          <path d="M255 510c28.05 0 51-22.95 51-51H204c0 28.05 22.95 51 51 51zm165.75-153V216.75c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V56.1c-73.95 17.85-127.5 81.6-127.5 160.65V357l-51 51v25.5h433.5V408l-51-51z"></path>
        </g>
      </g>
    </svg>
  );
};
const MessageSvg = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      fill="#fff"
      enableBackground="new 0 0 348.165 348.165"
      version="1.1"
      viewBox="0 0 348.165 348.165"
      xmlSpace="preserve"
      className={className}
    >
      <path d="M0 60.58L0 71.921 174.083 193.19 348.165 71.921 348.165 60.58z"></path>
      <path d="M174.083 217.356L71.545 145.228 0 95.39 0 287.585 348.165 287.585 348.165 95.39 276.62 145.228z"></path>
    </svg>
  );
};
const SettingsSvg = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 100 100" className={className}>
      <path d="M50.011 0c-2.884 0-5.714.26-8.464.728L40.204 14.95a36.042 36.042 0 00-8.054 3.322L21.16 9.193A50.242 50.242 0 009.169 21.16l9.101 10.99a36.194 36.194 0 00-3.345 8.054L.728 41.555A50.416 50.416 0 000 50.045c0 2.89.258 5.709.728 8.464l14.198 1.343a36.2 36.2 0 003.345 8.054l-9.078 10.99a50.292 50.292 0 0011.945 11.968l11.013-9.1a36.058 36.058 0 008.054 3.344l1.343 14.22c2.75.47 5.58.706 8.464.706 2.884 0 5.69-.236 8.441-.705l1.343-14.221a36.056 36.056 0 008.054-3.345l11.013 9.101a50.285 50.285 0 0011.945-11.968l-9.078-10.99a36.194 36.194 0 003.344-8.054l14.198-1.343c.471-2.755.728-5.574.728-8.464 0-2.885-.259-5.713-.728-8.464l-14.198-1.342a36.2 36.2 0 00-3.344-8.055l9.1-10.99A50.233 50.233 0 0078.84 9.226l-10.99 9.079a36.044 36.044 0 00-8.055-3.322L58.453.762a50.097 50.097 0 00-8.441-.729zm0 30.967c10.516 0 19.022 8.528 19.022 19.044s-8.505 19.044-19.022 19.044c-10.516 0-19.044-8.528-19.044-19.044s8.528-19.044 19.044-19.044z"></path>
    </svg>
  );
};

const Navbar = ({ socket }) => {

  const [notifications,setNotifications] = useState([]);
  const [messages,setMessages] = useState([]);
  const [open,setOpen] = useState(false);

  // get notifications
  useEffect(() => {

    socket.on("getNotification", data => {
      setNotifications(prev => [...prev, data]);
    });

  }, [socket]);

  // get messages
  useEffect(() => {

    socket.on("getMessage", data => {
      setMessages(prev => [...prev, data]);
    });

  }, [socket]);

  const displayNotification = ({ senderName, type }) => {

    let action;

    if(type === 1) {
      action = "liked"
    } else if(type === 2) {
      action = "commented";
    } else {
      action = "shared"
    }

    return (
      <span className='notification'>{`${senderName} ${action} your post!`}</span>
    )

  };

  const handleRead = () => {

    setNotifications([]);

    setOpen(false);

  };

  const displayMessage = ({ senderName, message }) => {

    return (
      <>
        <span className="notification">Preview:</span>
        <span className='notification'>{`${senderName}: ${message}`}</span>
      </>
    )

  };

  return (
    <div className="navbar">
      <span className="logo">Hopago App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <NotificationSvg className="iconImg" />
          {notifications.length > 0 && 
          <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon">
          <MessageSvg className="iconImg" onClick={() => setOpen(!open)} />
        </div>
        <div className="icon">
          <SettingsSvg className="iconImg" />
        </div>
      </div>
      {open && notifications &&
      <div className="notifications">
        {notifications.map(n => (
          displayNotification(n)
        ))}
        <button className='nButton' onClick={handleRead}>Mark as read</button>
      </div>
      }
      {open && messages &&
      <div className="notifications">
        {messages.map(m => (
          displayMessage(m)
        ))}
        <button className='nButton' onClick={handleRead}>Mark as read</button>
      </div>
      }
    </div>
  )
}

export default Navbar
