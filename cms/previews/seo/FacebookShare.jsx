import PropTypes from "prop-types";
import { createImageUrlBuilder } from "@sanity/image-url";
import { useClient } from "sanity";
import { toPlainText } from "./frontendUtils";
import { Facebook } from "./styles";

function FacebookShare(props) {
  const client = useClient({ apiVersion: "2026-09-30" });

  const builder = createImageUrlBuilder(client);

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
          {openGraphImage && (
            <img
              className="facebookCardImage"
              src={urlFor(openGraphImage).width(500).url()}
              alt=""
            />
          )}
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

FacebookShare.propTypes = {
  document: PropTypes.object.isRequired,
};

export default FacebookShare;
