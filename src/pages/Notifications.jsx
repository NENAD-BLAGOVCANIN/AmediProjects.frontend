import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import amediProfileImg from "../assets/img/amediProfileImg.webp";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { TooltipWrapper } from "../components/widgets/Tooltip";
import { Link } from "react-router-dom";

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

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  return (
    <div className="container">
      <ul className="notifications-page">
        {notifications?.map((notification) => {

          const formattedDate = formatDate(notification.created_at);

          return (
            <li key={notification.id} className="bg-white hover-lg">
              <Link
                to={`/notifications/${notification.id}`}
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
                    <strong>{notification.title}</strong>
                    <div
                      className="pt-1"
                      dangerouslySetInnerHTML={{ __html: notification.body }}
                    ></div>
                    <span>{formattedDate}</span>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="px-1">
                    <TooltipWrapper text="Mark as read" placement="top">
                      <button
                        className="btn btn-basic bg-gray-light shadow-sm"
                        onClick={() => { }}
                      >
                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                      </button>
                    </TooltipWrapper>

                  </div>
                  <div className="px-1 text-dark">
                    <TooltipWrapper text="Delete" placement="top">
                      <button
                        className="btn btn-basic bg-gray-light text-danger shadow-sm"
                        onClick={() => { }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </TooltipWrapper>

                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {!noMore && (
        <div className="d-flex justify-content-center pt-3 pb-4">
          <button
            className="btn btn-basic bg-white shadow-sm medium"
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
