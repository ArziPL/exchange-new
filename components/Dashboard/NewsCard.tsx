// Every single news card on news section
import router from "next/router";

function NewsCard(props: { article: any; }) {
  const { article } = props;

  // Generate url for article site
  const generateArticleUrl = () => {
    let url = article.title
      .replace(/[^A-Za-z0-9\s]+/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return "/article/" + url;
  };

  // Change site to article with title-url (not whole query)
  const changePage = () => {
    router.push(
      {
        pathname: generateArticleUrl(),
        query: article,
      },
      generateArticleUrl()
    );
  };
  return (
    <div
      className="w-[300px] h-[220px] flex flex-col cursor-pointer p-3 rounded-[5px] m-1 active:scale-[0.95] hover:bg-slate-300"
      onClick={changePage}
    >
      <div className="w-full h-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.iconUrl}
          alt="crypto article img"
          className="w-full h-full bg-center object-cover rounded-[5px] shadow"
        />
      </div>
      <div className="w-full h-1/2 flex flex-col justify-end items-start gap-3">
        <div>{article.author}</div>
        <div className="font-semibold text-sm">{article.title}</div>
      </div>
    </div>
  );
}

export default NewsCard;
