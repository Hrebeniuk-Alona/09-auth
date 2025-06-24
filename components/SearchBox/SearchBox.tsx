

import css from "../SearchBox/SearchBox.module.css"



interface SearchBoxProps {
    value: string,
    onChange:(query:string)=> void,
}


export default function SearchBox({value, onChange }: SearchBoxProps) {
    

    return (
        <div>
            <input
             className={css.input}
             type="text"
             value={value}
             onChange={(e) => onChange(e.target.value.trim())}
                placeholder="Search notes"/>
        </div>
    )

}