import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import "./NewsBlock.css";
import $api from "@/app/api/$api";
import { newsPath } from "@/app/api/apiNews/newsPath";
import { useEffect, useState } from "react";
import { structureNews, timeAgo } from "../../modal";
import { INewsItem } from "../../type";

export const NewsBlock = () => {
  const [news, setNews] = useState<INewsItem[]>([]);

  const getNews = async () => {
    try {
      const response = await $api.get(newsPath.BASE_NEW_PATH);
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const { main, side, topContent, banner, bottomContent } = structureNews(news);

  if (!main || !side) {
    return <div>Loading...</div>;
  }

  console.log(side[0]);

  return (
    <PageBlockWrapper>
      <div className="news-header">
        <p className="title-news">NEWS</p>
      </div>
      <div className="news-featured-row">
        <div className="news-featured-main">
          <div className="news-content">
            <span className="news-live-tag">LIVE</span>
            <h2
              dangerouslySetInnerHTML={{ __html: main.title }}
              className="news-title"
            />
            <p
              dangerouslySetInnerHTML={{ __html: main.description }}
              className="news-description"
            />
          </div>
        </div>

        <div className="news-featured-secondary">
          {main.imageUrl && (
            <div className="news-image-wrapper">
              <img
                // src={main.imageUrl || "/placeholder.svg"}
                alt={main.title}
                className="news-main-image"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=500";
                }}
              />
            </div>
          )}
          {/* <div className="news-image-container"></div> */}
          <img src={side[0].imageUrl} className="news-image-container" />
          <div className="news-content">
            <h2
              dangerouslySetInnerHTML={{ __html: side[0].title }}
              className="news-title"
            ></h2>
            <p
              dangerouslySetInnerHTML={{ __html: side[0].description }}
              className="news-description"
            ></p>
            <div className="news-meta">
              <span className="news-time">{timeAgo(side[0].created_at)}</span>
              <span className="news-category">Business</span>
            </div>
          </div>
        </div>
      </div>
      <div className="news-grid">
        {topContent.map((el) => {
          return (
            <div key={el.id} className="news-item">
              <img src={el.imageUrl} className="news-image-container" alt="" />
              <h3
                dangerouslySetInnerHTML={{ __html: el.title }}
                className="news-title"
              />
              <p
                dangerouslySetInnerHTML={{ __html: el.description }}
                className="news-description"
              />
              <div className="news-meta">
                <span className="news-time">{timeAgo(el.created_at)}</span>
                <span className="news-category">World</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="news-secondary-row">
        <div className="news-secondary-main">
          <div className="news-content">
            <h2
              dangerouslySetInnerHTML={{ __html: banner.title }}
              className="news-title"
            />
            <p
              dangerouslySetInnerHTML={{ __html: banner.description }}
              className="news-description"
            />
            <div className="news-meta">
              <span className="news-time">{timeAgo(banner.created_at)}</span>
              <span className="news-category">World</span>
            </div>
          </div>
        </div>

        <div className="news-secondary-item">
          <div className="news-content">
            <h2
              dangerouslySetInnerHTML={{ __html: side[1].title }}
              className="news-title"
            />
            <p
              dangerouslySetInnerHTML={{ __html: side[1].description }}
              className="news-description"
            />
            <div className="news-meta">
              <span className="news-time">{timeAgo(side[1].created_at)}</span>
              <span className="news-category">Science & Environment</span>
            </div>
          </div>
        </div>
      </div>
      <div className="news-small-row">
        {bottomContent.map((el) => {
          return (
            <div key={el.id} className="news-small-item">
              <h4
                dangerouslySetInnerHTML={{ __html: el.title }}
                className="news-title"
              />
              <div className="news-meta">
                <span className="news-time">{timeAgo(el.created_at)}</span>
                <span className="news-category">Europe</span>
              </div>
            </div>
          );
        })}
      </div>
    </PageBlockWrapper>
  );
};
