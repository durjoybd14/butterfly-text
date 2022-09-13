import React from "react";

import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <Messages />
      <div style={{height:'16vh', backgroundColor:'ddddf7'}}></div>
      <div className="input-position">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
