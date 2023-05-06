// Component with all the content rendered in /news
import { Article } from "../../types/types";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ErrorData from "../common/ErrorData";
import PageContent from "../common/PageContent";
import ArticleCard from "./ArticleCard";

type NewsComponent = {
  articles: Array<Article>;
}
export default function NewsComponent(props: NewsComponent) {
  const viewportDimensions = useWindowDimensions();
  return (
    <div>
      {props.articles.length == 0 ? (
        <ErrorData />
      ) : (
        <PageContent title="" tooltip="">
          {viewportDimensions.width > 1279 ? (
            <>
              <div className="flex justify-center mb-20">
                <div className="w-[400px] h-[auto] lg:w-[300px] flex flex-col justify-start items-center gap-5">
                  <ArticleCard article={props.articles[0]} />
                  <ArticleCard article={props.articles[3]} />
                  <ArticleCard article={props.articles[6]} />
                  <ArticleCard article={props.articles[9]} />
                  {/* <ArticleCard article={props.articles[12]} />
                <ArticleCard article={props.articles[15]} /> */}
                </div>
                <div className="w-[400px] h-[auto] lg:w-[300px] flex flex-col justify-start items-center gap-5">
                  <ArticleCard article={props.articles[1]} />
                  <ArticleCard article={props.articles[4]} />
                  <ArticleCard article={props.articles[7]} />
                  <ArticleCard article={props.articles[10]} />
                  {/* <ArticleCard article={props.articles[13]} /> */}
                  {/* <ArticleCard article={props.articles[16]} /> */}
                </div>
                <div className="w-[400px] h-[auto] lg:w-[300px] flex flex-col justify-start items-center gap-5">
                  <ArticleCard article={props.articles[2]} />
                  <ArticleCard article={props.articles[5]} />
                  <ArticleCard article={props.articles[8]} />
                  <ArticleCard article={props.articles[11]} />
                  {/* <ArticleCard article={props.articles[14]} /> */}
                  {/* <ArticleCard article={props.articles[17]} /> */}
                </div>
              </div>
            </>
          ) : (
            <div className="w-[320px] flex flex-col justify-center items-center gap-5 mb-20">
              {props.articles.map((article, indx) => (
                <ArticleCard key={indx} article={article} />
              ))}
            </div>
          )}
        </PageContent>
      )}
    </div>
  );
}
