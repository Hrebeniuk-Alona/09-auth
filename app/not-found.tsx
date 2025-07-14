import css from "../components/Home/Home.module.css"
import Link from 'next/link';
import { Metadata } from "next";

export const metadata: Metadata={
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: "",
    images: [
      {
        url: `https://lamcdn.net/lookatme.ru/post_image-image/sIaRmaFSMfrw8QJIBAa8mA-article.png`,
         width: 1200,
          height: 630,
      }
    ]
    
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

