import React from "react";
import PropTypes from "prop-types";

const ellipsis = "\u00A0…";

function isWhitespace(char) {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
}

function truncateWord(str) {
  if (str.length === 0 || isWhitespace(str[str.length - 1])) {
    return str;
  }

  let end = str.length;
  while (end > 0 && !isWhitespace(str[end - 1])) {
    end -= 1;
  }

  if (end === 0) {
    return str;
  }

  while (end > 0 && isWhitespace(str[end - 1])) {
    end -= 1;
  }

  return str.slice(0, end);
}

export default class Truncate extends React.Component {
  static propTypes = {
    maxWidth: PropTypes.number,
    maxChars: PropTypes.number,
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    maxWidth: 500,
    maxChars: 300,
  };

  state = {
    truncatedChildren: this.props.children,
  };

  nodeRef = React.createRef();

  componentDidMount() {
    this.truncate();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.children !== prevProps.children ||
      this.props.maxWidth !== prevProps.maxWidth ||
      this.props.maxChars !== prevProps.maxChars
    ) {
      this.truncate();
    }
  }

  truncate() {
    if (this.props.maxWidth) {
      this.truncateWidth();
    }

    if (this.props.maxChars) {
      this.truncateChars();
    }
  }

  truncateWidth() {
    const node = this.nodeRef.current;

    if (node.scrollWidth > this.props.maxWidth) {
      let children = this.props.children;
      node.innerText = children + ellipsis;

      while (
        node.scrollWidth > this.props.maxWidth &&
        children !== truncateWord(children)
      ) {
        children = truncateWord(children);
        node.innerText = children + ellipsis;
      }

      this.setState({
        truncatedChildren: children + ellipsis,
      });
    }
  }

  truncateChars() {
    if ((this.props.children || []).length > this.props.maxChars) {
      let children = this.props.children;
      while (
        (children + ellipsis).length > this.props.maxChars &&
        children !== truncateWord(children)
      ) {
        children = truncateWord(children);
      }

      this.setState({
        truncatedChildren: children + ellipsis,
      });
    }
  }

  render() {
    const { maxWidth, maxChars, children, ...otherProps } = this.props;
    const { truncatedChildren } = this.state;

    return (
      <div ref={this.nodeRef} {...otherProps}>
        {truncatedChildren}
      </div>
    );
  }
}
