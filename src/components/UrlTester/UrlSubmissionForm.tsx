import React, { FunctionComponent, useState } from 'react'

type Props = {
  addUrl(url: string): void
}

const UrlSubmissionForm: FunctionComponent<Props> = ({ addUrl }) => {
  const [urlInput, setUrlInput] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formInput = e.target as typeof e.target & {
      urlInput: { value: string }
    }
    const url = formInput.urlInput.value
    addUrl(url)
    setUrlInput('')
  }

  return (
    <section className="url-input__section">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="urlInput"
          value={urlInput}
          onChange={onChange}
        />
        <input type="submit" value="Add" />
      </form>
    </section>
  )
}

export default UrlSubmissionForm
