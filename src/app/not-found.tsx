import Link from "next/link";
import styles from "./page.module.css"
export default function NotFound(){
    return <section className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.paragraph}>Pagina no encontrada</p>
        <Link className={styles.link} href="/">Volver</Link>
    </section>
}