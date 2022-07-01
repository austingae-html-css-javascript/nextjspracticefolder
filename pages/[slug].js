import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const Post = ({fileObject}) => {
  return (
    <main>
      <ReactMarkdown>{fileObject.content}</ReactMarkdown>
    </main>
  )
}

/*getStaticPaths() generates all the required paths. 
In this case, getStaticPaths() generates the following paths: post1, post2, and post3. 
fallback: false will display "404 | This page could not be found." when the user goes to a path not generated.
*/
export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((file) => {
    const rawFile = fs.readFileSync(path.join('posts', file));
    const fileObject = matter(rawFile);
    return (
      { params: {slug: fileObject.data.slug}}
    )
  })

  return {
    paths: paths,
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps({params: {slug}}) {
  console.log(slug);
  const file = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const fileObject = matter(file);

  return {
    props: {
      fileObject: JSON.parse(JSON.stringify(fileObject)),
    },
  }
}
export default Post

/*
getStaticPaths will generate three paths: post1, post2, and post3.
Whenever one of these paths are loaded, then getStaticProps will run, and then the function that displays stuff.
For example, I run the path /post1; then getStaticProps({params: {slug}}) will receive the path, get the required
data; and then send the data to function Post. const Post = () => {} will then display the data onto the website page. 
*/