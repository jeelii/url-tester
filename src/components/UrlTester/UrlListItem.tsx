import { FunctionComponent } from 'react'
import { UrlInfo } from './Types'
import { icons } from '../icons/icons'

type Props = {
  urlInfo: UrlInfo
  resetStatusOnUrl(id: number): void
  removeUrl(id: number): void
}

const UrlListItem: FunctionComponent<Props> = ({
  urlInfo,
  resetStatusOnUrl,
  removeUrl,
}) => {
  const { status, id, url } = urlInfo

  const className = `status status--${status ? status.toString()[0] : 0}`

  const statusAriaLabel = `URL status response is ${
    status ? status : 'loading...'
  }`

  return (
    <li className="list-item">
      <button
        onClick={() => resetStatusOnUrl(id)}
        className="list-item__button"
      >
        {icons['reload']}
      </button>
      <span aria-label={statusAriaLabel} className={className}>
        {status ? status : '...'}
      </span>
      {/* //accessibility */}
      {url}
      <button
        onClick={() => removeUrl(id)}
        className="list-item__button remove-button"
      >
        X
      </button>
    </li>
  )
}

export default UrlListItem
