import React from 'react'

export default class Statistic extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  calculateAndPrintStatistic = () => {
    const books = this.props.books
    const map = this.countEachGenre(books)
    return this.printStatistics(map, books.length)
  }

  initMap = () => {
    return new Map()
      .set("Бизнес-книги", 0)
      .set("Классическая литература", 0)
      .set("Детская литература", 0)
      .set("Детектив", 0)
      .set("Фэнтези", 0)
      .set("Фантастика", 0)
      .set("Приключения", 0)
      .set("Ужас, мистика", 0)
      .set("Роман", 0)
      .set("Психология", 0)
      .set("Наука", 0)
      .set("Компьютерная литература", 0)
  }

  countEachGenre = (books) => {
    let map = this.initMap()
    for (let i = 0; i < books.length; i++) {
      let count = map.get(books[i].genre.name)
      map.set(books[i].genre.name, ++count)
    }
    return map
  }

  printStatistics = (map, length) => {
    let result = Array.from(map)
    const toState = result.filter(i => i[1] > 0).map(i => [i[0], Math.ceil(((i[1] / length) * 100) * 100) / 100])
    console.log(toState)
    return toState.map((i, index) =>
      <div key={index}>
        <span style={{ display: "block" }}>{`${i[0]}`}</span>
        <span>{`${i[1]}%`}</span>
        <span style={{ display: "block", backgroundColor: "#8080804a", borderRadius: "10px" }}>
          <span style={{ display: "flex", borderRadius: "10px", backgroundColor: "#46c755", height: "10px", width: `${i[1]}%` }}></span>
        </span>
      </div>)
  }

  render() {
    return (<div >{this.calculateAndPrintStatistic()}</div>)
  }
}