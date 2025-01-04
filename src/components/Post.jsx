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
                    <img src={post.mainImage.asset.url} 
                     onContextMenu={(e) => e.preventDefault()} // 禁用右鍵菜單
                    alt={post.mainImage.alt} />
                    <span>
                      <h2 className="text-red-600">{post.title}</h2>
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
