import { useState } from "react";
import api from "../api/axios";
import "../styles/AdminNewsletter.css";

const AdminNewsletter = () => {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendNewsletter = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await api.post(
        "/newsletter/broadcast",
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(data.message);

      setSubject("");
      setMessage("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send newsletter"
      );

    }

  };

  return (

    <div className="newsletter-page">

      <div className="newsletter-card">

        <h2>Send Newsletter</h2>

        <input
          type="text"
          placeholder="Newsletter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Write newsletter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendNewsletter}>
          Send Newsletter
        </button>

      </div>

    </div>

  );

};

export default AdminNewsletter;