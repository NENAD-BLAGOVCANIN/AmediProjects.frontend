import PropTypes from "prop-types";

const MarkupRender = ({ html }) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>", html);
  return (
    <div
      className="text-muted medium rounded p-4 shadow-lg markup-render"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

MarkupRender.propTypes = {
  html: PropTypes.string,
};

export default MarkupRender;
