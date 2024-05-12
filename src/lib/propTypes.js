import PropTypes from "prop-types";

export const TaskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  subject: PropTypes.string,
  description: PropTypes.string,
  lead_id: PropTypes.string,
  project_id: PropTypes.number,
  assigned_to: PropTypes.number,
  status: PropTypes.string,
  due_date: PropTypes.string,
});
