import React from 'react'

import './styles.scss'

/**
 * About simple component with simple project information.
 */
export default class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        
        <p className='introduction'>
          Это приложение предназначено для ведения списка прочитанных, желаемых книг.
          Пользователи могут добавлять книги в коллекцию из уже существующих книг в хронилище приложения или добавлять книги сами.
        </p>
        <p>Возможности приложение:</p>
        <ul>
          <li>Создавать книгу</li> 
          <li>Выставление рейтинга для книги</li>
          <li>Оставить отзыв о книге</li>
          <li>Искать книгу в приложении с помощью фильтров</li>
          <li>Просматривать коллекции других пользователей</li>
          <li>Управлять профилем</li>
          <li>Собирать статистику предпочитаемых жанров книг</li>
          <li>Предлагать книгу исходя из предпочтении пользователя</li>
        </ul>
        <p>В приложении планируется реализовать:</p>
        <ul>
          <li>Помечать новые книги для пользователя</li>
          <li>Рекомендовать прочитанные книги другим</li>
          <li>Подключить Google Books Api, для облегчения создания книг</li>
          <li>Отправлять личные сообщения пользователям</li>
          <li>Общаться с другими читателями</li>
        </ul>

        <h3>Используемые технологии</h3>
        <ul>
          <li>Java 8</li>
          <li>JUnit</li>
          <li>Spring Boot</li>
          <li>Spring Data</li>
          <li>Spring Security</li>
          <li>PostgreSQL</li>
          <li>React</li>
          <li>React Router v4</li>
          <li>Redux</li>
          <li>Material-UI</li>
          <li>Heroku</li>
          <li>Dropbox</li>
          <li>Travis</li>

          
        </ul>
      </div>
    )
  }
}