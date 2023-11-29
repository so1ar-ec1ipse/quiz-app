import { useNavigate } from "react-router-dom";

export default function Button({ label, href, type, size, onClick, className, ...restProps }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (href) navigate(href);
    else onClick && onClick(e);
  };

  return (
    <button
      type={type ?? "button"}
      className={`bg-blue-500 hover:bg-blue-700 text-white ${`text-${
        size ?? "sm"
      }`} font-bold py-2 px-4 rounded ${className}`}
      onClick={handleClick}
      {...restProps}
    >
      {label}
    </button>
  );
}
