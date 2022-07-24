import catchHandler from './catchHandler'
import { Payload } from './types'

const getRequestOptions = (method: 'GET'|'PUT'|'PATCH'|'POST'|'DELETE'): RequestInit => ({
  method,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  mode: 'cors',
  cache: 'no-cache',
})

const checkForError = (res: Response) => {
  if (!res.ok) throw res.json()
  return res.json()
}

const getFullUrl = (url: string) => url.startsWith('/') ? `${process.env.API_BASE_URL}${url}` : url

const getUrlWithParamsFromPayload = (url: string, payload: Payload|undefined) => {
  if (!payload) return url

  let resultUrl = url.includes('?') ? url : `${url}?`

  Object.keys(payload).forEach(key => {
    // TODO add array handling as needed
    const value = String(payload[ key ])
    resultUrl += `${key}=${value}`
  })

  return resultUrl
}

const get = (url: string, payload?: Payload) => {
  const fullUrl = getFullUrl(url)
  const resultUrl = getUrlWithParamsFromPayload(fullUrl, payload)
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json;charset=utf-8')
  myHeaders.append('Cookie', document.cookie)

  return fetch(payload ? resultUrl : fullUrl, getRequestOptions('GET'))
    .then(checkForError)
    .catch(catchHandler)
}

const del = (url: string, payload?: Payload) => {
  const fullUrl = getFullUrl(url)
  const resultUrl = getUrlWithParamsFromPayload(fullUrl, payload)

  return fetch(payload ? resultUrl : fullUrl, getRequestOptions('DELETE'))
    .then(checkForError)
    .catch(catchHandler)
}

const update = (method: 'PUT'|'PATCH'|'POST', url: string, payload?: Payload) => {
  const fullUrl = getFullUrl(url)

  return fetch(fullUrl, {
    ...getRequestOptions(method),
    body: JSON.stringify(payload),
  })
    .then(checkForError)
    .catch(catchHandler)
}

const request = {
  get,
  post: (url: string, payload?: Payload) => {
    return update('POST', url, payload)
  },
  patch: (url: string, payload: Payload) => {
    return update('PATCH', url, payload)
  },
  put: (url: string, payload: Payload) => {
    return update('PUT', url, payload)
  },
  delete: del,
}

export default request
