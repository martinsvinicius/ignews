import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>My bday :)</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              maximus dignissim neque, non maximus odio blandit at. Aliquam
              sapien libero, bibendum tristique dignissim sed, auctor vel arcu.
              Curabitur sed sodales ipsum, sit amet vulputate eros.
            </p>
          </a>

          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>My bday :)</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              maximus dignissim neque, non maximus odio blandit at. Aliquam
              sapien libero, bibendum tristique dignissim sed, auctor vel arcu.
              Curabitur sed sodales ipsum, sit amet vulputate eros.
            </p>
          </a>

          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>My bday :)</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              maximus dignissim neque, non maximus odio blandit at. Aliquam
              sapien libero, bibendum tristique dignissim sed, auctor vel arcu.
              Curabitur sed sodales ipsum, sit amet vulputate eros.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
