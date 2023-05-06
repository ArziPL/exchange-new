// Component with all the content rendered in /article/[article_title]
export default function ArticleComponent(props: any) {
  let article = props;

  // Make sure the articleContent is string
  let content: string = "";
  if (typeof article.content === "string") {
    content = article.content;
  }

  // Make sure the articleUrl is string
  let articleUrl: string = "";
  if (typeof article.articleUrl === "string") {
    articleUrl = article.articleUrl;
  }

  return (
    <div>
      <div className="flex flex-col w-full h-auto items-center gap-14 pt-20">
        <div className="w-[60%] text-3xl font-semibold text-center xl:w-[90%] xl:text-xl">{article.title}</div>
        <div className="w-[60%] text-center text-slate-400 tracking-wider xl:w-[90%]">{article.description}</div>
        <div
          className="w-[60%] h-[300px] bg-center bg-cover xl:w-[90%]"
          style={{ backgroundImage: `url(${article.imgUrl})` }}
        ></div>
        <div className="w-[60%] pl-14 pr-14 xl:w-[90%] xl:p-2" dangerouslySetInnerHTML={{ __html: content }}></div>
        <div className="w-[60%] text-center text-lg mb-10 xl:w-[90%] xl:text-base">
          Written by <b>{article.author}</b> on {article.date}.{" "}
          <a href={articleUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">
            Original article here !
          </a>
        </div>
      </div>
    </div>
  );
}
