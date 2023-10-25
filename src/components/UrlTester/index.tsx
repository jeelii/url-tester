import { useEffect, useState } from 'react'
import './UrlTester.css'
import ResponseList from './ResponseList'
import UrlSubmissionForm from './UrlSubmissionForm'
import { UrlInfo } from './Types'

const UrlTester = () => {
  const [urlsUnprocessed, setUrlsUnprocessed] = useState<UrlInfo[]>([])
  const [urlsProcessed, setUrlsProcessed] = useState<UrlInfo[]>([])

  const getStatusOnUrl = async (url: string) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ url }),
    }
    const response = await fetch(
      'https://url-tester-backend.vercel.app/api/urlstatus',
      requestOptions
    )
    const { status } = await response.json()
    return status
  }

  const addUrl = async (url: string) => {
    const id = Date.now()
    const urlInfo = {
      id,
      url,
      status: null,
    }
    setUrlsUnprocessed([urlInfo, ...urlsUnprocessed])
  }

  const removeUrl = (id: number) => {
    setUrlsProcessed(urlsProcessed.filter((urlInfo) => urlInfo.id !== id))
    setUrlsUnprocessed(urlsUnprocessed.filter((urlInfo) => urlInfo.id !== id))
  }

  const resetStatusOnUrl = async (id: number) => {
    const urlInfo = urlsProcessed.find((urlInfo) => urlInfo.id === id)
    if (!urlInfo) return
    removeUrl(id)
    urlInfo.status = null
    setUrlsUnprocessed([urlInfo, ...urlsUnprocessed])
  }

  const handleReloadAll = () => {
    setUrlsUnprocessed(
      [...urlsUnprocessed, ...urlsProcessed].map((urlInfo) => {
        return {
          ...urlInfo,
          status: null,
        }
      })
    )
    setUrlsProcessed([])
  }

  const handleRemoveAll = () => {
    setUrlsUnprocessed([])
    setUrlsProcessed([])
  }

  useEffect(() => {
    if (!urlsUnprocessed.length) return
    ;(async function processLastUnprocessedUrl() {
      const urlInfoInProcess = urlsUnprocessed.at(-1)
      if (!urlInfoInProcess) return
      const status = await getStatusOnUrl(urlInfoInProcess.url)
      urlInfoInProcess.status = status
      setUrlsProcessed([urlInfoInProcess, ...urlsProcessed])
      setUrlsUnprocessed(urlsUnprocessed.slice(0, -1))
    })()
  }, [urlsProcessed, urlsUnprocessed])

  return (
    <>
      <UrlSubmissionForm addUrl={addUrl} />
      {[...urlsUnprocessed, ...urlsProcessed].length ? (
        <ResponseList
          urls={[...urlsUnprocessed, ...urlsProcessed]}
          removeUrl={removeUrl}
          resetStatusOnUrl={resetStatusOnUrl}
          handleRemoveAll={handleRemoveAll}
          handleReloadAll={handleReloadAll}
        />
      ) : null}
    </>
  )
}

export default UrlTester
