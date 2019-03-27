function createOutputObject(articles, page, limit) {
  const MAX_ARTICLES_ON_PAGE = 10;

  const sortedArticles = articles.sort((a, b) => b.updatedAt - a.updatedAt);
  const articlesCount = sortedArticles.length;

  const minArticleNumber = (page - 1) * MAX_ARTICLES_ON_PAGE;
  const maxArticleNumber = articlesCount - minArticleNumber > MAX_ARTICLES_ON_PAGE
    ? page * MAX_ARTICLES_ON_PAGE
    : articlesCount;
  const articlesOnPage = sortedArticles
    .slice(minArticleNumber, maxArticleNumber)
    .slice(0, limit);

  return {
    count: articlesCount,
    page,
    limit,
    articles: articlesOnPage,
  };
}

module.exports = createOutputObject;
