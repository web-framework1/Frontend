import React from "react";
import { Link } from "react-router-dom";
import { allPosts } from "../../mock/postsData";

const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

const ListButton = ({ to = "/board" }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
  >
    <ListIcon />
    목록
  </Link>
);

const BoardItem = ({ tag, tagColor, title, description, link = "#" }) => (
  <Link
    to={link}
    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-2 mb-1">
      {tag && (
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}
        >
          {tag}
        </span>
      )}
      <h4 className="font-semibold text-gray-800 truncate">{title}</h4>
    </div>
    <div>
      <p className="text-sm text-gray-600 truncate">{description}</p>
    </div>
  </Link>
);

function BoardPreview() {
  const recentPosts = (allPosts || [])
    .filter((item) => item.type === "post")
    .slice(0, 1)
    .map((post) => ({
      ...post,
      link: "/board",
    }));

  return (
    <div className="w-full">
      <div className="space-y-3">
        {recentPosts.length > 0 ? (
          recentPosts.map((item, index) => (
            <BoardItem
              key={index}
              tag={item.tag}
              tagColor={item.tagColor}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm p-2">등록된 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default BoardPreview;
