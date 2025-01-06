import React from 'react';

const SavedArticles = ({ articles }) => {
  return (
    <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-64 z-50">
      <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Saved Articles</h4>
      {articles.length > 0 ? (
        <ul className="space-y-2">
          {articles.map((article, i) => (
            <li key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No saved articles yet.</p>
      )}
    </div>
  );
};

export default SavedArticles;
