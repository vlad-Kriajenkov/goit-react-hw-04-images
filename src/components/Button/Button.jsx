import css from './Button.module.css'
export const Button = ({onLoudeMore})=>{
    return(
        <button type="button" onClick={() =>onLoudeMore()} className={css.Button}>Loude More</button>
    )
}