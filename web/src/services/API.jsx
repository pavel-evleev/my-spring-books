import axios from 'axios'

export const DEFAULT_HTTP_HEADERS = {
  'Content-Type': 'application/json'
}

export const validateStatus = (status) => {
  return status >= 200 && status < 300
}

export const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: DEFAULT_HTTP_HEADERS,
  validateStatus: validateStatus
})

/**
 * API endpoint to fetch all user books.
 */
export const fetchBooks = () => {
  return client.get(`/v1/books`)
}

export const fetchAuthors=()=>{
  return client.get('/v1/authors')
}

export const fetchAddAuthor = ( name )=>{
return client.post('/v1/authors', name);
}