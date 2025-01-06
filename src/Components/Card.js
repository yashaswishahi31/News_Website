import React from 'react';
import { ExternalLink, Clock, Bookmark, Share2 } from 'lucide-react';

const Card = ({ data, onSave, savedArticles, onComment, comments }) => {
  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        }

        // Check if the article is already saved
        const isSaved = savedArticles.some((article) => article.title === curItem.title);

        return (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src={curItem.urlToImage}
                alt={curItem.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />

              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <button
                  onClick={() => onSave(curItem)}
                  className={`p-2 rounded-full ${
                    isSaved ? 'bg-blue-500' : 'bg-white/20'
                  } backdrop-blur-md hover:bg-white/40 transition-colors`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'text-white' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">
                    {new Date(curItem.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3
                onClick={() => readMore(curItem.url)}
                className="text-xl font-bold mb-3 text-gray-800 cursor-pointer hover:text-blue-600 line-clamp-2"
              >
                {curItem.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{curItem.description}</p>

              {/* Comments Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Comments</h4>
                <ul className="mt-2 space-y-1">
                  {(comments[curItem.title] || []).map((comment, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {comment}
                    </li>
                  ))}
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const comment = e.target.elements.comment.value.trim();
                    if (comment) {
                      onComment(curItem.title, comment);
                      e.target.reset();
                    }
                  }}
                  className="mt-2 flex"
                >
                  <input
                    name="comment"
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-2 py-1 rounded-lg bg-gray-100 text-sm text-gray-800 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
