import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotification } from "../api/notifications";
import MarkupRender from "../components/MarkupRender/MarkupRender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  let { id } = useParams();
  const [notification, setNotification] = useState(null);

  const fetchAndSetNotification = async () => {
    const notificationRes = await getNotification(id);
    setNotification(notificationRes);
  };

  useEffect(() => {
    fetchAndSetNotification();
  }, []);

  if (!notification) return <></>;

  return (
    <div className="container pt-3">
      <h3 className="bold">
        {notification.title}
      </h3>
      <p className="text-muted medium pb-4">
        {formatDateTime(notification.created_at)}
      </p>
      <div className="pb-4">
        <MarkupRender html={notification.body} />
      </div>
      
    </div>
  );
};

export default Notification;

const formatDateTime = (stringISO) => {
  const date = new Date(stringISO);

  const formattedDateTime = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  return formattedDateTime;
};
