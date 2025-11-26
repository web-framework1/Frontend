import React from "react";
import { Link } from "react-router-dom";
import { allQaItems as faqData } from "../../mock/faqData";

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

const ListButton = ({ to = "/faq" }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
  >
    <ListIcon />
    목록
  </Link>
);

const QaItem = ({ question, answer, link = "#" }) => (
  <Link
    to={link}
    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
  >
    <div className="mb-1">
      <span className="font-bold text-blue-600">Q: </span>
      <span className="font-semibold text-gray-800">{question}</span>
    </div>
    <div>
      <span className="font-bold text-gray-600">A: </span>
      <span className="text-sm text-gray-600">{answer}</span>
    </div>
  </Link>
);

function QnaPreview() {
  const recentFaqs = (faqData || []).slice(0, 1).map((faq) => ({
    ...faq,
    link: "/faq",
  }));

  return (
    <div className="w-full">
      <div className="space-y-3">
        {recentFaqs.length > 0 ? (
          recentFaqs.map((item, index) => (
            <QaItem
              key={index}
              question={item.question}
              answer={item.answer}
              link={item.link}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm p-2">등록된 질문이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default QnaPreview;
