import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { useClient } from "sanity";
import { toPlainText } from "./frontendUtils";
import { Facebook } from "./styles";

function FacebookShare(props) {
  const client = useClient();

  const builder = imageUrlBuilder(client);

  const urlFor = (source) => {
    return builder.image(source);
  };

  const { document } = props;
  const {
    title,
    excerpt: description = [],
    mainImage: openGraphImage,
  } = document;
  const websiteUrl = "http://localhost:3000";
  const websiteUrlWithoutProtocol = websiteUrl.split("://")[1];

  return (
    <Facebook>
      <h3>Facebook share</h3>
      <div className="facebookWrapper">
        <div className="facebookImageContainer">
          <img
            className="facebookCardImage"
            src={urlFor(openGraphImage).width(500).url()}
          />
        </div>
        <div className="facebookCardContent">
          <div className="facebookCardUrl">{websiteUrlWithoutProtocol}</div>
          <div className="facebookCardTitle">
            <a href={websiteUrl}>{title}</a>
          </div>
          <div className="facebookCardDescription">
            {toPlainText(description)}
          </div>
        </div>
      </div>
    </Facebook>
  );
}

export default FacebookShare;
