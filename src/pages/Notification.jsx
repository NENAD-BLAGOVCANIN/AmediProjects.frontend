import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotification } from "../api/notifications";

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
    <div className="container">
      <h3 className="pb-4">{notification.title}</h3>
      <p className="text-muted medium pb-4">{notification.body}</p>
      <p className="text-muted medium">
        Created at: {formatDateTime(notification.created_at)}
      </p>
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
