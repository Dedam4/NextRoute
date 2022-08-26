import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { IPost } from '../types/IPost';
import { useFilter } from '../hooks/useFilter';
import { URL } from '../const/url';
import { useState } from 'react';

interface HomeProps {
  posts: IPost[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {

 const [filter, setFilter] = useState('');

  const { result } = useFilter(posts, {
    sort: "ASC",
    filter: { name: "description", value: filter },
  });

  const handleSearch = (e) => {
     setFilter(e.target.value)
     

  }
  return (
    <div className={styles.container}>

      <input value={filter} onChange={handleSearch} />

      {result.length ? (
        <ul className={styles.list}>
          {result.map(({ id, title, description, image }) => (
            <li className={styles.list__item} key={id}>
              <div className={styles.item__info}>
                <h2>
                  {id}. {title}
                </h2>
                <p>{description}</p>
              </div>
              <img className={styles.item__img} src={image} width='100' height='150' alt='image' />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No items in youre list</h2>
      )
      }



    </div >
  )
}


export async function getStaticProps() {

  const response = await fetch(URL + 'posts');
  const data = await response.json();

  return {
    props: { posts: data },
  }
}

export default Home
