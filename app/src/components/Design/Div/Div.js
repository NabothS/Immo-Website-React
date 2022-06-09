import "./Div.css";

const Div = ({ children , className}) => {
  return (
    <div className={className}>{children}</div>
  )
};

export default Div;