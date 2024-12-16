import { useParams } from "react-router-dom"
import sanityClient from '../../src/client'
import { useState, useEffect } from 'react'
import imageUrlBuilder from "@sanity/image-url"
import BlockContent from  "@sanity/block-content-to-react"

const SinglePost = () => {

   const builder =  imageUrlBuilder(sanityClient)
   function urlFor(source){
    return builder.image(source)
   }
   const [SinglePost, setSinglePost] = useState(null)
   const { slug } = useParams()

   useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
       title,
       _id,
       slug,
       mainImage{
        asset->{
        _id,
        url
        }
        },
        body,
        "name": author->name,
        "authorImage": author->image,
    }`).then((data) => setSinglePost(data[0]))
    .catch(console.error)
   },[slug]);
   if(!SinglePost) 
    return <div>
      loading...
    </div>
  return (
   <main className='bg-gray-500 min-h-screen p-12'>

   <article className='container shadow-lg mx-auto bg-green-200 rounded-lg'>
    <header className='relative'>
      <div className='absolute h-full w-full flex items-center justify-center p-8'>
        <div className='bg-white bg-opacity-75 rounded p-12'>
          <h2 className='text-4xl lg:text-6xl'>{SinglePost.title}</h2>
          <div className='flex justify-center text-gray-500'>
            <img src={urlFor(SinglePost.authorImage).url()}
            alt={SinglePost.name}
            className='w-10 h-10 rounded-full'/> 
            <p className='flex items-center pl-2 text-4xl'>{SinglePost.name}</p>
            </div>
        </div>
      </div>
      <img  src={SinglePost.mainImage.asset.url} alt={SinglePost.title} className='w-full object-cover rounded-t'
      style={{height: "400px"}} />
    </header>
    <div className='px-20 lg:px-40 py-12'>
      <BlockContent  blocks={SinglePost.body} projectId="ctcz4jd3" dataset="production"/>
    </div>
   </article>
    </main>
  )
}

export default SinglePost