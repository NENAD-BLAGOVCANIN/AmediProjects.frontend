import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import amediProfileImg from "../assets/img/amediProfileImg.webp";

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
      <ul className="notifications-page">
        {notifications?.map((notif) => {
          return (
            <li className="unread" key={notif.id}>
              <a
                href={`/notifications/${notif.id}`}
                className="d-flex justify-content-between"
              >
                <div className="d-flex gap-4 justify-content-between flex-column flex-md-row">
                  <div
                    style={{ minWidth: "52px" }}
                    className="notification-sender-icon"
                  >
                    <img
                      src={amediProfileImg}
                      alt="notification"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <strong>{notif.title}</strong>
                    <div
                      className="small pt-1"
                      dangerouslySetInnerHTML={{ __html: notif.body }}
                    ></div>
                  </div>
                </div>
                <div className="px-1">
                  <button
                    className="btn btn-basic bg-gray-light text-danger shadow-sm"
                    onClick={() => {}}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
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
