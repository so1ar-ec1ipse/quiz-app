import { useNavigate } from "react-router-dom";

export default function Card({ href, title, description, extra }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div
      className="!max-w-[24rem] !min-w-[24rem] rounded p-6 shadow-lg flex flex-col hover:cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <div className="font-bold text-xl mb-2 truncate">{title}</div>
      </div>
      <p className="text-gray-700 text-base flex-1 mb-4 break-words">{description}</p>
      <ul className="text-xs">
        {Object.values(extra ?? {})?.map((content, index) => (
          <li key={index} className="truncate">
            {content ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
