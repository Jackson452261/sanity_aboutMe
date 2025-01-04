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
           
        </div>
      </div>
      <img  src={SinglePost.mainImage.asset.url}
       alt={SinglePost.title}  
       onContextMenu={(e) => e.preventDefault()} // 禁用右鍵菜單
       className="w-full object-cover rounded-t h-[300px] sm:h-[800px] md:h-[600px] lg:h-[700px] xl:h-[800px]"
      style={{height: "400px"}} />
    </header>
    <div className='px-20 lg:px-40 py-12 bg-neutral-200'>
      <BlockContent  blocks={SinglePost.body} projectId="ctcz4jd3" dataset="production"/>
    </div>
   </article>
    </main>
  )
}

export default SinglePost