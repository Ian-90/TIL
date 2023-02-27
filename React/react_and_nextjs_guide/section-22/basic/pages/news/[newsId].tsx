import { useRouter } from "next/router";

export default function NewsDetail() {
  const router = useRouter();

  const newsId = router.query.newsId
  return (
    <>
      <h1>News Detail {newsId}</h1>
    </>
  );
}
