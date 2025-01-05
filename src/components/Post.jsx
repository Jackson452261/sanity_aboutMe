import { useState, useEffect } from "react";
import sanityClient from "../../src/client";  
import { Link } from "react-router-dom";

const Post = () => {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
           title,
           slug,
           mainImage{
             asset->{
               _id,
               url
             },
             alt
           }
        }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-slate-700 p-12">
         
        <div>
          {postData &&
            postData.map((post) => (
              <article key={post.slug.current}>
                <Link to={`/post/${post.slug.current}`}>
                  <span>
                  <h2 className="text-red-600 text-4xl">{post.title}</h2>
                    <img src={post.mainImage.asset.url} 
                     onContextMenu={(e) => e.preventDefault()} // 禁用右鍵菜單
                    alt={post.mainImage.alt} />
                    <span>
                
                    </span>
                  </span>
                </Link>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Post;
