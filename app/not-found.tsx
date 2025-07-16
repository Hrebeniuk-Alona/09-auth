import css from "../components/Home/Home.module.css"
import Link from 'next/link';
import { Metadata } from "next";

export const metadata: Metadata={
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: "https://08-zustand-fawn-six.vercel.app/not-found",
    images: [
      {
        url: `https://lamcdn.net/lookatme.ru/post_image-image/sIaRmaFSMfrw8QJIBAa8mA-article.png`,
         width: 1200,
         height: 630,
         alt: `Сторінка, яку ви шукали, відсутня. Переконайтеся, що сторінка вірна.`
      }
    ],
    type: "article",
    
  }
}


const NotFound = () => {
  return (
    <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>

      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;

