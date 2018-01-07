import React from 'react'

import './styles.scss'

/**
 * About simple component with simple project information.
 */
export default class About extends React.Component {
  render() {
    return (
      <div style={{ margin: "0 25%" }}>
        <h2>About</h2>

        <p className='introduction'>
          Это приложение предназначено для ведения списка прочитанных, желаемых книг.
          Пользователи могут добавлять книги из уже существующих книг в хронилище приложения или добавлять книги сами.
        </p>
        <p>В приложении планируется реализовать:</p>
        <ul>
          <li>Выставление рейтинга для книги</li>
          <li>Оставить отзыв о книге</li>
          <li>Хранить сам текст книги, с возможностью читать онлайн</li>
          <li>Рекомендовать книгу другим пользователям</li>
          <li>Общаться с другими читателями</li>
        </ul>

        <h3>Используемые технологии</h3>
        <ul>
          <li>Java 8</li>
          <li>JUnit</li>
          <li>Spring Boot</li>
          <li>Spring Data</li>
          <li>Spring Security</li>
          <li>Spring REST Docs</li>
          <li>MySQL</li>
          <li>React</li>
          <li>Material-UI</li>
        </ul>
      </div>
    )
  }
}