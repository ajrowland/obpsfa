import S from "@sanity/desk-tool/structure-builder"
import {MdAccessibility, MdHome} from 'react-icons/lib/md'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

// Web preview
import IframePreview from './previews/iframe/IframePreview'

// SEO preview
import SeoPreview from './previews/seo/SeoPreviews'

// a11y preview
import ColorblindPreview from './previews/a11y/colorblind-filter/ColorblindPreview'
import TextToSpeechPreview from './previews/a11y/text-to-speech/TextToSpeechPreview'
//import BraillePreview from './previews/a11y/braille/Braille'

// JSON preview
import JsonPreview from './previews/json/JSONpreview'

// Web preview configuration
const remoteURL = 'https://some-deployed-dev-site.com'
const localURL = 'http://localhost:8080'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = ({schemaType}) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType ==='page' || schemaType === 'home') {
    return S.document().views([
      S.view.form().icon(EditIcon),
      S.view.component(IframePreview).options({previewURL}).title('Web').icon(EyeIcon),
      S.view.component(SeoPreview).options({previewURL}).icon(EyeIcon).title('SEO Preview'),
      S.view.component(ColorblindPreview).options({previewURL}).icon(EyeIcon).title('Colorblind'),
      S.view.component(TextToSpeechPreview).options({fields: ['title', 'excerpt', 'body']}).icon(MdAccessibility).title('Text to speech'),
      //S.view.component(BraillePreview).icon(MdAccessibility).title('Braille'),
      S.view.component(JsonPreview).icon(EyeIcon).title('JSON')
    ])
  }
  return S.document().views([
    S.view.form(),
    S.view.component(JsonPreview).icon(EyeIcon).title('JSON')
  ])
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
      // List out the rest of the document types, but filter out the home type
      ...S.documentTypeListItems()
        .filter(listItem => !['home'].includes(listItem.getId()))
    ])