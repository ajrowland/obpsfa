import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { useClient } from "sanity";
import { assemblePageUrl, toPlainText } from "./frontendUtils";
import { Twitter } from "./styles";

function TwitterCard(props) {
  const client = useClient();

  const builder = imageUrlBuilder(client);

  const urlFor = (source) => {
    return builder.image(source);
  };

  const { document, options } = props;
  const { title, excerpt, mainImage } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://")[1];
  const author = {
    name: "Sanity.io",
    handle: "sanity_io",
    image:
      "https://pbs.twimg.com/profile_images/1135907399582199809/7uZ5d2to_400x400.jpg",
  };

  return (
    <Twitter>
      <h3>Twitter card preview</h3>
      <div className="tweetWrapper">
        {author && (
          <div className="tweetAuthor">
            <img
              className="tweetAuthorAvatar"
              src={
                author && typeof author.image === "object"
                  ? urlFor(author.image).width(300).url()
                  : author.image
              }
            />
            <span className="tweetAuthorName">{author.name}</span>
            <span className="tweetAuthorHandle">@{author.handle}</span>
          </div>
        )}

        <div className="tweetText">
          <p>
            The card for your website will look a little something like this!
          </p>
        </div>
        <a href={url} className="tweetUrlWrapper">
          <div className="tweetCardPreview">
            <div className="tweetCardImage">
              <img src={urlFor(mainImage).width(300).url()} />
            </div>
            <div className="tweetCardContent">
              <h2 className="tweetCardTitle">{title}</h2>
              {excerpt && (
                <div className="tweetCardDescription">
                  {toPlainText(excerpt)}
                </div>
              )}
              <div className="tweetCardDestination">
                {websiteUrlWithoutProtocol}
              </div>
            </div>
          </div>
        </a>
      </div>
    </Twitter>
  );
}

export default TwitterCard;
