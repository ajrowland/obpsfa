import styled from "styled-components";

export const Google = styled.div`
  margin: 15px;
  margin-top: 30px;
  width: 500px;

  .googleWrapper {
    font-family: Arial, sans-serif;
    background-color: #f6f6f6;
  }

  .title {
    color: #1a0dab;
    font-size: 18;
    font-weight: 400;
    line-height: 1.2;
    white-space: "nowrap";
    overflow: "hidden";
    text-overflow: "ellipsis";
  }

  .url {
    height: 18;
    color: #006621;
    font-size: 14;
    line-height: "16px";
    white-space: "nowrap";
    overflow: "hidden";
    text-overflow: "ellipsis";
  }

  .description {
    color: #545454;
    font-size: 13;
    line-height: 1.4;
    word-wrap: "break-word";
  }
`;

export const Twitter = styled.div`
  margin: 15px;
  width: 500px;

  .tweetWrapper {
    position: relative;
    width: 100%;
    padding: 12px 12px 8px 54px;
    text-align: left;
    font-size: 14px;
    box-sizing: border-box;
    background-color: #f6f6f6;
  }

  .tweetAuthor {
    position: relative;
    margin-right: 75px;
    margin-bottom: 10px;
  }

  .tweetAuthorAvatar {
    position: absolute;
    top: 3px;
    left: -42px;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }

  .tweetAuthorName {
    margin-right: 4px;
    font-weight: 700;
    color: #333;
  }

  .tweetAuthorHandle {
    padding: 0;
    margin-top: 2px;
    margin-left: 2px;
    font-size: 12px;
    color: #999;
  }

  .tweetText p {
    margin: 0 0 10px;
  }

  .tweetUrlWrapper {
    text-decoration: none;
    color: inherit;
  }

  .tweetCardPreview {
    display: flex;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    border-color: rgba(136, 153, 166, 0.5);
    border-radius: 0.85714em;
    border-width: 1px;
    border-style: solid;
    overflow: hidden;
    max-height: 130px;
  }

  .tweetCardContent {
    padding: 0.75em;
    width: calc(100% - 8.81667em - 2px);
    overflow: hidden;
  }

  .tweetCardImage {
    display: flex;
    border-right-width: 1px;
    overflow: hidden;
    width: 130px;
    flex-shrink: 0;
    border-right-width: 1px;
  }

  .tweetCardImage img {
    height: 100%;
    width: auto;
    object-fit: fit;
  }

  .tweetCardTitle {
    max-height: 1.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em;
    margin: 0 0 0.15em;
  }

  .tweetCardDescription {
    max-height: 3.9em;
  }

  .tweetCardDescription p {
    overflow: hidden;
    margin-top: 0.32333em;
  }

  .tweetCardDestination {
    margin-top: 0.32333em;
    text-transform: lowercase;
    color: #8899a6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Facebook = styled.div`
  margin: 15px;
  margin-top: 30px;
  width: 500px;

  .facebookWrapper {
    background-color: #f6f6f6;
    overflow: hidden;
  }

  .facebookImageContainer {
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  .facebookCardImage {
    max-height: 262px;
    width: 100%;
    object-fit: cover;
  }

  .facebookCardContent {
    padding: 10px 12px;
    color: #606770;
  }

  .facebookCardUrl {
    color: #606770;
    flex-shrink: 0;
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .facebookCardTitle {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }

  .facebookCardTitleLink {
    color: #1d2129;
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    margin: 3px 0 0;
    padding-top: 2px;
    text-decoration: none;
  }

  .facebookCardDescription {
    color: #606770;
    font-size: 14px;
    line-height: 20px;
    max-height: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }
`;
