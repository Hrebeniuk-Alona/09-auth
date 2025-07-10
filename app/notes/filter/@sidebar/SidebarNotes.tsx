
import Link from 'next/link';
import css from "./SidebarNotes.module.css"
import { tags } from '@/lib/constans';

export default function SidebarNotes(){

  return (
    <ul className={css.menuList}>

      {["All", ...tags].map((tag:string) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
    </ul>
  );
};


