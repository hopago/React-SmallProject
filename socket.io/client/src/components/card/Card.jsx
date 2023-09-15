import { useState } from 'react';
import './card.css';


const Heart = ({ className, handleNotification }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fillRule="evenodd"
          clipRule="evenodd"
          className={className}
          onClick={handleNotification}
        >
          <path d="M12 21.593C6.37 16.054 1 11.296 1 7.191 1 3.4 4.068 2 6.281 2c1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447C20.266 2.01 23 3.631 23 7.191c0 4.069-5.136 8.625-11 14.402M17.726 1.01c-2.203 0-4.446 1.042-5.726 3.238C10.715 2.042 8.478 1 6.281 1 3.098 1 0 3.187 0 7.191 0 11.852 5.571 16.62 12 23c6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"></path>
        </svg>
      );
};
const HeartFilled = ({ className }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#dc143c"
          viewBox="0 0 24 24"
          className={className}
        >
          <path d="M12 4.248C8.852-1.154 0 .423 0 7.192 0 11.853 5.571 16.619 12 23c6.43-6.381 12-11.147 12-15.808C24 .4 15.125-1.114 12 4.248z"></path>
        </svg>
      );
};
const Comment = ({ className }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fillRule="evenodd"
          clipRule="evenodd"
          className={className}
        >
          <path d="M12 1C5.662 1 0 5.226 0 11.007c0 2.05.739 4.063 2.047 5.625L.054 23 7 20a19.51 19.51 0 004.864.641c7.174 0 12.136-4.439 12.136-9.634C24 5.195 18.299 1 12 1m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695L1.66 21.217l1.505-4.808C1.857 14.845 1 13.281 1 11.007 1 6.041 5.935 2 12 2"></path>
        </svg>
      );
};
const Share = ({className}) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fillRule="evenodd"
          clipRule="evenodd"
          className={className}
        >
          <path d="M14 4H1v18h20V11h1v12H0V3h14v1zm10 5h-1V2.707L11.354 14.354l-.708-.708L22.293 2H16V1h8v8z"></path>
        </svg>
      );
};
const Info = ({ className }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#555"
          fillRule="evenodd"
          clipRule="evenodd"
          className={className}
        >
          <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11S1 18.071 1 12 5.929 1 12 1zm.5 17h-1V9h1v9zM12 6a.845.845 0 110 1.69A.845.845 0 0112 6z"></path>
        </svg>
      );
};

const Card = ({ socket, user}) => {

    const [liked,setLiked] = useState(false);
    const [message,setMessage] = useState("");

    const post = [
        {
            postId: 1,
            username: "hopago",
        },
        {
            postId: 2,
            username: "chj",
        }
    ];

    const handleNotification = (type) => {
        setLiked(!liked);
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: "hopago",
            type,
        });
    };

    // const handleMessage = (message) => {
    //     setLiked(!liked);
    //     socket.emit("sendMessage", {
    //         senderName: user,
    //         receiverName: "hopago",
    //         message,
    //     });
    // };

    // Submit message to server
    // Create message input & create button -> input onChange -> setMessage(e.target.value) -> btn onClick handleMessage -> () => handleMessage(message)

  return (
    <div className="card">
        <div className="info">
            <img src="" alt="" className="userImg" />
            <span>{post.map(post => post.username === "hopago")}</span>
        </div>
        <img src="" alt="" className="postImg" />
        <div className="interaction">
            {liked 
            ? (<HeartFilled className="cardIcon" />) 
            : (<Heart className="cardIcon" handleNotification={() => handleNotification(1)} />)
            }
            <Comment className="cardIcon" handleNotification={() => handleNotification(2)} />
            <Share className="cardIcon" handleNotification={() => handleNotification(3)} />
            <Info className="cardIcon infoIcon" />
        </div>
    </div>
  )
}

export default Card
