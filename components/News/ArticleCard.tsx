// Every single article card in /news
import { useRouter } from "next/router";

function ArticleCard(props: { article: any; }) {
  const router = useRouter();
  const article = props.article;

  // Generate fixed height depend on title (to make /news better looking)
  const generateHeight = (key: string) => {
    let sumOfAscii = 0;
    for (let i = 0; i < key.length; i++) {
      sumOfAscii += key.charCodeAt(i);
    }
    while (sumOfAscii < 600 || sumOfAscii > 900) {
      if (sumOfAscii < 600) {
        sumOfAscii += 890;
      }

      if (sumOfAscii > 900) {
        sumOfAscii -= 610;
      }
    }
    return sumOfAscii;
  };

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
      className={`w-[95%] bg-white rounded-[5px] shadow flex flex-col gap-2 text-ellipsis`}
      style={{ height: `${generateHeight(article.title)}px` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.iconUrl}
        alt="Article background img"
        className="w-full h-[100px] bg-center object-cover rounded-t-[5px]"
      />
      <div className="font-semibold text-center text-base p-2">{article.title}</div>
      <hr className="w-[90%]" />
      <div className="text-center">
        {article.author} on {article.date}
      </div>
      <hr className="w-[90%]" />
      {/* Setting inner HTML because API returns formatted HTML */}
      <div
        className="text-center text-sm h-auto truncate whitespace-normal p-2"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
      <hr className="w-[90%]" />
      <div className="flex justify-center items-center">
        <div className="text-blue-500 hover:text-blue-400 cursor-pointer mb-2" onClick={changePage}>
          Read full article
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
