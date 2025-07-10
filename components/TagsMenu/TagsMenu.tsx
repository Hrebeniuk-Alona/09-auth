'use client';

import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";
import { tags } from "@/lib/constans";

export default function TagsMenu() {
    
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle} >
                Notes ▾
            </button>
            
            {isOpen && (
                <ul className={css.menuList}>
                    {["All", ...tags].map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} onClick={toggle}>
                {tag}
              </Link>
            </li>
          ))}
         </ul>)}  
    
</div>
    )
}

