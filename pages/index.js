import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'

import Post from '../components/post';

export default function Home({postsContents}) {
  return (
    <div className={styles.container}>
      <main>
        {postsContents.map((post) => {
          return (
            <>
             <div>
                <h1>{post.data.title}</h1>
                <p>{post.data.excerpt}</p>
                <p>{post.content}</p>
             </div>
            </>
          )
        })}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  console.log("------");

  const files = fs.readdirSync('posts');
  const postsContents = files.map(file => {
    const rawFile = fs.readFileSync(path.join('posts', file), 'utf-8');
    const fileObject = matter(rawFile);
    return fileObject;
  })

  //console.log(postsContents); //one array with objects. I AM CORRECT!


  return {
    props: { 
      postsContents: JSON.parse(JSON.stringify(postsContents)),
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