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
        <h1>Blog post page</h1>
        <h2>Welcome</h2>
        <div>
          {postData &&
            postData.map((post) => (
              <article key={post.slug.current}>
                <Link to={`/post/${post.slug.current}`}>
                  <span>
                    <img src={post.mainImage.asset.url} alt={post.mainImage.alt} />
                    <span>
                      <h2>{post.title}</h2>
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
