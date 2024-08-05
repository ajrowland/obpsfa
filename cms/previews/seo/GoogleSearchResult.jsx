import React from "react";
import { assemblePageUrl, toPlainText } from "./frontendUtils";
import Truncate from "./Truncate";
import { Google } from "./styles";

function GoogleSearchResult(props) {
  const { document, options } = props;
  const { title, excerpt } = document;
  const url = assemblePageUrl({ document, options });

  return (
    <Google>
      <h3>Google search result preview</h3>
      <div className="googleWrapper">
        <Truncate maxWidth="500" className="title">
          {title}
        </Truncate>
        <div className="url">{url}</div>
        {excerpt && (
          <Truncate maxChars={300} className="description">
            {toPlainText(excerpt)}
          </Truncate>
        )}
      </div>
    </Google>
  );
}

export default GoogleSearchResult;
