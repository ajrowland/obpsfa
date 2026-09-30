import PropTypes from "prop-types";
import { createImageUrlBuilder } from "@sanity/image-url";
import { useClient } from "sanity";
import { assemblePageUrl, toPlainText } from "./frontendUtils";
import { Twitter } from "./styles";

function TwitterCard(props) {
  const client = useClient({ apiVersion: "2026-09-30" });

  const builder = createImageUrlBuilder(client);

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
      "https://pbs.twimg.com/profile_images/1920495712011259904/EY9Jj3rk_200x200.png",
  };

  return (
    <Twitter>
      <h3>Twitter card preview</h3>
      <div className="tweetWrapper">
        <div className="tweetAuthor">
          <img
            className="tweetAuthorAvatar"
            src={
              typeof author.image === "object"
                ? urlFor(author.image).width(300).url()
                : author.image
            }
            alt=""
          />
          <span className="tweetAuthorName">{author.name}</span>
          <span className="tweetAuthorHandle">@{author.handle}</span>
        </div>

        <div className="tweetText">
          <p>
            The card for your website will look a little something like this!
          </p>
        </div>
        <a href={url} className="tweetUrlWrapper">
          <div className="tweetCardPreview">
            <div className="tweetCardImage">
              {mainImage && (
                <img src={urlFor(mainImage).width(300).url()} alt="" />
              )}
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

TwitterCard.propTypes = {
  document: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default TwitterCard;
