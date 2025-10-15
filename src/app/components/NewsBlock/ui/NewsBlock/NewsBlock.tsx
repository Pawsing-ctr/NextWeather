import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import "./NewsBlock.css";
import $api from "@/app/api/$api";
import { newsPath } from "@/app/api/apiNews/newsPath";
import { useEffect, useState } from "react";
import { structureNews, timeAgo } from "../../modal";
import { INewsItem } from "../../type";
import Image from "next/image";

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
              {/* <img
                // src={main.imageUrl || "/placeholder.svg"}
                alt={main.title}
                className="news-main-image"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=500";
                }}
              /> */}
              <Image
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=500";
                }}
                src={main.imageUrl || "/placeholder.svg"}
                alt={main.title}
                width={500}
                height={300}
              />
            </div>
          )}
          <Image
            src={side[0].imageUrl || "/placeholder.svg"}
            alt={main.title}
            width={500}
            height={300}
          />
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
        {/* ВЕРХНЯЯ ЧАСТЬ НОВОСТЕЙ КОТОРАЯ ПРИХОДИТ С БЕКА */}
        {topContent.map((el) => {
          return (
            <div key={el.id} className="news-item">
              <Image
                src={el.imageUrl || "/placeholder.svg"}
                className="news-image-container"
                alt=""
              />
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
        {/* НИЖНЯЯ ЧАСТЬ НОВОСТЕЙ КОТОРАЯ ПРИХОДИТ С БЕКА */}
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
