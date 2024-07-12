import styles from "./page.module.css";
import Apod from "../components/Apod";

export default function Home() {


  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
 

  return (
    <main className={styles.main}>
      <h1>Teste 23as2</h1>
      <Apod date={formattedDate} />
    </main>
  );
}
