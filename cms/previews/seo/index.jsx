import PropTypes from "prop-types";
import GoogleSearchResult from "./GoogleSearchResult";
import TwitterCard from "./TwitterCard";
import FacebookShare from "./FacebookShare";

function SeoPreviews(props) {
  const { options } = props;
  const { displayed } = props.document;

  return (
    <>
      <GoogleSearchResult document={displayed} options={options} />
      <TwitterCard document={displayed} options={options} />
      <FacebookShare document={displayed} options={options} />
    </>
  );
}

SeoPreviews.propTypes = {
  document: PropTypes.shape({
    displayed: PropTypes.object,
  }).isRequired,
  options: PropTypes.object,
};

export default SeoPreviews;
