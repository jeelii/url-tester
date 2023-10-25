import { FunctionComponent } from 'react'
import { UrlInfo } from './Types'
import UrlListItem from './UrlListItem'

type Props = {
  urls: UrlInfo[]
  removeUrl(id: number): void
  resetStatusOnUrl(id: number): void
  handleReloadAll(): void
  handleRemoveAll(): void
}

const ResponseList: FunctionComponent<Props> = ({
  urls,
  removeUrl,
  resetStatusOnUrl,
  handleRemoveAll,
  handleReloadAll,
}) => {
  return (
    <section className="response__section">
      <div className="response__buttons">
        <button onClick={handleReloadAll}>Reload all</button>
        <button onClick={handleRemoveAll}>Remove all</button>
      </div>
      <ul className="list">
        {urls.map((urlInfo) => (
          <UrlListItem
            urlInfo={urlInfo}
            key={urlInfo.id}
            removeUrl={removeUrl}
            resetStatusOnUrl={resetStatusOnUrl}
          />
        ))}
      </ul>
    </section>
  )
}

export default ResponseList
