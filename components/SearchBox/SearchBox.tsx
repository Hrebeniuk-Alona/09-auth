

import css from "../SearchBox/SearchBox.module.css"



type SearchBoxProps = {
    value: string,
    onSubmit:(query:string)=> void,
}


export default function SearchBox({value, onSubmit }: SearchBoxProps) {
    

    return (
        <>
            <input
             className={css.input}
             type="text"
             value={value}
             onChange={(e) => onSubmit(e.target.value.trim())}
                placeholder="Search notes"/>
    </>    )
   

}