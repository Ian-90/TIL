import Link from "next/link";

export default function News() {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS Is A Great Framewor
          </Link>
        </li>
        <li>
          <Link href="/news/soemthing-else">Something Else</Link>
        </li>
      </ul>
    </>
  );
}
