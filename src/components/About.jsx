import sanityClient from "../../src/client";
import { useState, useEffect } from "react";
import Travel from "../assets/travel.jpg";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const About = () => {
  const [author, setAuthor] = useState(null);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "author"]{
        name,
        bio,
        "authorImage": image.asset->url
      }`)
      .then((data) => {
        if (data && data.length > 0) {
          setAuthor(data[0]);
        } else {
          console.error("No author data found");
        }
      })
      .catch(console.error);
  }, []);

  if (!author) return <div>Loading...</div>;

  return (
    <main>
      <img src={Travel} className="absolute w-full" alt="Travel background" />
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl flex items-center p-10">
          {author.authorImage && (
            <img
              className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
              src={urlFor(author.authorImage).url()}
              alt={author.name}
            />
          )}
          <div className="text-lg flex flex-col justify-center">
            <h2 className="text-5xl text-green-300">
              Hi 我是{" "}
              <span className="text-red-600">{author.name}</span>
            </h2>
            {author.bio && (
              <div className="prose lg:prose-xl text-white">
                <BlockContent
                  blocks={author.bio}
                  projectId="ctcz4jd3"
                  dataset="production"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
