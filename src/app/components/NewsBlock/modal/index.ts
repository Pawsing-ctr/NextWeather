import { INewsItem } from "./../type/index";

export const structureNews = (news: INewsItem[]) => {
  return {
    main: news[0] || null,
    side: [news[1], news[7]],
    topContent: news.slice(2, 6),
    banner: news[6],
    bottomContent: news.slice(8),
  };
};

export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};
