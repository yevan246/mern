import PropTypes from "prop-types";

export default function Container({children, className = ''}) {
  return (
    <div style={{maxWidth: '86%'}} className={`container mx-auto max-w-screen-lg ${className}`}>
        {children}
    </div>
  )
}

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    className: PropTypes.string
};
  