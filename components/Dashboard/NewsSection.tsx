// News section on top of dashboard
import { Article } from "../../types/types";
import NewsCard from "./NewsCard";

type NewsSection = {
  articles: Article[];
};

function NewsSection(props: NewsSection) {
  return (
    <div className="w-full h-full flex justify-center items-center gap-3 xl:flex-col">
      {props.articles.slice(0, 5).map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

export default NewsSection;
