import PropTypes from "prop-types";

const MarkupRender = ({ html }) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>", html);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

MarkupRender.propTypes = {
  html: PropTypes.string,
};

export default MarkupRender;
