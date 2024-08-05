import React from "react";

const IframePreview = ({ value }) => {
  const { url, title } = value;
  if (!url) {
    return <p>Missing URL for iframe</p>;
  }

  return (
    <iframe
      src={url}
      title={title}
      width="100%"
      height="300"
    />
  );
};

export default IframePreview;
