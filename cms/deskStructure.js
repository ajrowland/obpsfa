import S from "@sanity/desk-tool/structure-builder"
import MdHome from 'react-icons/lib/md/home'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

// Web preview
import IframePreview from './previews/iframe/IframePreview'

// Web preview configuration
const remoteURL = 'https://some-deployed-dev-site.com'
const localURL = 'http://localhost:8080'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = ({schemaType}) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "page") {
    return S.document().views([
      S.view.form().icon(EditIcon),
      S.view.component(IframePreview).options({previewURL}).title('Web').icon(EyeIcon)
    ])
  }
 }

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(MdHome)
        .child(
          S.document()
            .schemaType('home')
            .documentId('site-home')
        ),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the home type
      ...S.documentTypeListItems()
        .filter(listItem => !['home'].includes(listItem.getId()))
    ])