import React from 'react'

export default class Statistic extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      genreCounter: new Map()
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
  }
  componentDidMount() {
    this.countEachGenre(this.props.books)
  }

  countEachGenre = (books) => {
    let map = this.state.genreCounter
    for (let i = 0; i < books.length; i++) {
      let count = map.get(books[i].genre.name)
      map.set(books[i].genre.name, ++count)
    }
    map = this.countProcentGenre(books, map)
    this.setState({ genreCounter: map })
  }

  countProcentGenre = (books, map) => {
    for (let i = 0; i < books.length; i++) {
      let count = 100 * map.get(books[i].genre.name) / books.length
      map.set(books[i].genre.name, Math.ceil((count) * 100) / 100)
    }
    return map
  }

  displayStatistic = () => {
    let result = Array.from(this.state.genreCounter)
    console.log(result)
    return result.filter(i => i[1] > 0).map((i, index) =>
      <div key={index}>
        <span style={{ display: "flex" }}>{`${i[0]}`}</span>
        <span>{`${i[1]}%`}</span>
        <span style={{display:"flex",backgroundColor:"chocolate",height:"5px", width:`${i[1]}%`}}></span>
      </div>)
  }
  render() {
    // console.log(this.state.genreCounter)
    return (<div>{this.displayStatistic()}</div>)
  }
}