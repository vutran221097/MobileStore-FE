import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service.js";

const AdminHome = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container" style={{height: "100%"}}>
      
        <h1 style={{width:"100%",height:"100%",textAlign:"center"}}>{content}</h1>
    
    </div>
  );
};

export default AdminHome;