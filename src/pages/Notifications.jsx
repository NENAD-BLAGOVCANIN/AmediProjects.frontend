import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const fetchAndSetNotifications = useCallback(async () => {
    if (isLoading || noMore) return;
    setIsLoading(true);
    const notificationData = await getNotifications(page);
    setIsLoading(false);
    if (!notificationData?.data?.length) return setNoMore(true);

    setNotifications((prev) => [...prev, ...notificationData.data]);
    setPage(page + 1);
  }, [isLoading, noMore, page]);

  useEffect(() => {
    fetchAndSetNotifications();
  }, []);

  return (
    <div className="container">
      {notifications?.map((notif) => {
        return (
          <a
            href={`/notifications/${notif.id}`}
            key={notif.id}
            className="py-2 px-1 notification-row rounded"
          >
            <h2 className="medium">{notif.title}</h2>
            <p className="text-muted">{notif.body}</p>
          </a>
        );
      })}
      {!noMore && (
        <div className="d-flex justify-content-center pt-3 pb-4">
          <button
            className="btn btn-basic shadow-sm medium"
            onClick={fetchAndSetNotifications}
          >
            <span className="text-primary">
              <FontAwesomeIcon
                icon={isLoading ? faSpinner : faPlus}
                className="pe-1"
              />{" "}
              Load more
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
