import PropTypes from "prop-types";

export default function ModalContainer({children}) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      {children}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}


ModalContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};
  