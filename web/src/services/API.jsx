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

/*
 * API endpoint to fetch all user books.
 */
export const fetchBooks = () => {
  return client.get(`/v1/books`)
}

export const fetchAuthors = ()=>{
  return client.get('/v1/authors')
}

export const fetchUsers = ()=>{
  return client.get('/v1/users')
}

export const removeBookFromUser = (userId, bookId)=>{
  return client.patch('/v1/users/' + userId + '/books/' + bookId)
}

export const test = (p)=>{
  return client.get('/v1/users/findNames/' + p);
}

export const fetchUser = (id)=>{
  return client.get('/v1/users/' + id)
}

export const fetchEmail = (email) =>{
  return client.post('/v1/users/findEmail', email);
}
export const CreateAuthor = ( name )=>{
  return client.post('/v1/authors', name);
}

export const addBooksToUser = (books)=>{
  return client.post('/v1/users/' + books.userId, books);
}

export const DeleteAuthor = ( id )=>{
  return client.delete('/v1/authors/' + id);
}

export const CreateBook = ( book )=>{
  return client.post('/v1/books', book);
}

export const DeleteBook = ( id )=>{
  return client.delete('/v1/books/' + id);
}

export const CreateUser = ( user )=>{
  return client.post('/v1/users', user);
}

export const DeleteUser = ( id )=>{
  return client.delete('/v1/users/' + id);
}

export const updateAuth = (username, password) => {
  client.defaults.auth = {
    username: username,
    password: password
  }
}
export const Login = (username, password) => {
  updateAuth(username, password)
  return client.get('/v1/users/login')
}

export const logout = () => {
  client.defaults.auth = null
}
