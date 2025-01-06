import React, { useState, useEffect } from 'react';
import Card from './Card';
import SavedArticles from './SavedArticles';
import { Search, Sun, Moon, Bookmark } from 'lucide-react';

const NewsApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');

  const API_KEY = 'ea577c863ef142bbbb31f0a4bfd2e174'
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);

      const endpoint =
        search.trim().length > 0
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
              search
            )}&apiKey=${API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${activeCategory}&apiKey=${API_KEY}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === "ok") {
        setNewsData(data.articles || []);
      } else {
        console.error("Error fetching news:", data.message);
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  const toggleSaveArticle = (article) => {
    setSavedArticles((prev) =>
      prev.some((a) => a.title === article.title)
        ? prev.filter((a) => a.title !== article.title)
        : [...prev, article]
    );
  };

  const handleComment = (articleTitle, newComment) => {
    setComments((prev) => ({
      ...prev,
      [articleTitle]: [...(prev[articleTitle] || []), newComment],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NewsHub</h1>
          <form onSubmit={handleSearch} className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </form>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bookmark className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                {savedArticles.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {savedArticles.length}
                  </span>
                )}
              </button>
              {showSaved && <SavedArticles articles={savedArticles} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-4 px-4 py-2 max-w-7xl mx-auto overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSearch(''); // Clear search term when category is selected
                setActiveCategory(category.id);
              }}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Card
            data={newsData}
            onSave={toggleSaveArticle}
            savedArticles={savedArticles}
            onComment={handleComment}
            comments={comments}
          />
        )}
      </main>
    </div>
  );
};

export default NewsApp;
