/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";
import { Para, Iframe } from "./styles";

const assembleProjectUrl = ({ displayed, options }) => {
  const { slug } = displayed;
  const { previewURL } = options;
  if (!previewURL) {
    console.warn("Missing previewURL", { slug, previewURL });
    return "";
  }

  return slug ? `${previewURL}/${slug.current}` : previewURL;
};

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  render() {
    const { options } = this.props;
    const { displayed } = this.props.document;
    if (!displayed) {
      return <Para>There is no document to preview</Para>;
    }

    const url = assembleProjectUrl({ displayed, options });

    if (!url) {
      return (
        <div className={styles.componentWrapper}>
          <p>Hmm. Having problems constructing the web front-end URL.</p>
        </div>
      );
    }

    return <Iframe src={url} />;
  }
}

export default IframePreview;
