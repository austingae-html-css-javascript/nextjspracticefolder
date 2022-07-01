import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'

import Post from '../components/post';

export default function Home( {posts} ) {
  

  return (
    <main>
      <div className={styles.postspage}>
        {posts.map((post) => {
          console.log(post);
          return (
            <div className={styles.post}>
              <Image 
                className='post__image'
                src = {post.data.coverImage}
                width = {200}
                height = {200}
              />
              <h3 className={styles.post__title}>{post.data.title}</h3>
              <p className={styles.post__excerpt}>{post.data.excerpt}</p>
              <button>
                <Link href={`${encodeURIComponent(post.data.slug)}`}>
                  <a>Read More</a>
                </Link>
              </button>
            </div>
          );
        })}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  const posts = files.map((file) => {
    let rawPost = fs.readFileSync(path.join('posts', file), 'utf-8');
    let postObject = matter(rawPost);
    return postObject;
  })
  

 {/*
 ANOTHER WAY TO DO IT: 
  const posts = [];
  files.forEach(file => {
    let rawPost = fs.readFileSync(path.join('posts', file), 'utf-8');
    let postObject = matter(rawPost);
    posts.push(postObject);
  })*/}

  return {
    props: { 
      posts: JSON.parse(JSON.stringify(posts)),
    } 
  }
}

/*
export async function getStaticProps() {
  //Grabs the files from the posts folder
  const files = fs.readdirSync(path.join('posts')); 

  //Get slug and frontmatter from posts
  const posts = files.map(fileName => {
    //Create slug
    const slug = fileName.replace('.md', '');

    //Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8')

    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  console.log(posts);

  return {
    props: {
      posts: posts
    }
  }
}
*/









/*
https://www.markdownguide.org/basic-syntax/
https://blog.logrocket.com/how-to-safely-render-markdown-using-react-markdown/

Step 1) 
Download gray-matter and react-markdown, and then import them along with fs.
import fs from 'fs';
import matter from 'gray-matter'; <-- matter organizes the content inside the raw file into a file object
import ReactMarkdown from 'react-markdown' <--this hides the markdown syntaxes and activates the syntaxes to make the words bold, into blockquotes, into paragraphs, etc. 

Step 2) 
export async function getStaticProps() {
  const rawFile = fs.readFileSync('posts/post1.md', 'utf8'); //rawFile shows the file as it is
  const fileObject = matter(rawFile); //fileObject turns the rawFile into an Object with items: data and content
  
  return {
    props: { 
      fileObject: JSON.parse(JSON.stringify(fileObject))
    } // will be passed to the page component as props
  }
}

Step 3) 
export default function Home(props) {
  console.log(props.fileObject);
  return (
    <div className={styles.container}>
      <main>
        <h1>{props.fileObject.data.title}</h1>
        <p>{props.fileObject.data.excerpt}</p>
        <ReactMarkdown>{props.fileObject.content}</ReactMarkdown>
      </main>
    </div>
  )
*/