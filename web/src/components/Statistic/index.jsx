import React from 'react'

import PieChart from "react-svg-piechart"

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
    let map = new Map()
    const genres = this.props.genres
    genres.forEach(element => {
      map.set(element, 0)
    });
    return map;
  }

  countEachGenre = (books) => {
    let map = this.initMap()
    for (let i = 0; i < books.length; i++) {
      let count = map.get(books[i].genre.name)
      map.set(books[i].genre.name, ++count)
    }
    return map
  }

  dataForPie = () => {
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    let map = this.initMap()
    const books = this.props.books
    for (let i = 0; i < books.length; i++) {
      let count = map.get(books[i].genre.name)
      map.set(books[i].genre.name, ++count)
    }

    let arr = Array.from(map)
    const toState = arr.map(i => ({ title: i[0], value: Math.round((i[1] / books.length) * 100), color: getRandomColor() }))
    return toState;
  }

  printStatistics = (map, length) => {
    let result = Array.from(map)
    const toState = result.filter(i => i[1] > 0).map(i => [i[0], Math.round((i[1] / length) * 100)])
    return toState.map((i, index) =>
      <div key={index}>
        <span style={{ display: "block" }}>{`${i[0]}`}</span>
        <span>{`${i[1]}%`}</span>
        <span style={{ display: "block", backgroundColor: "#8080804a", borderRadius: "10px" }}>
          <span style={{ display: "flex", borderRadius: "10px", backgroundColor: "#46c755", height: "10px", width: `${i[1]}%` }}></span>
        </span>
      </div>)
  }

  displayTitle = (data) => {
    return data.filter(g => g.value > 0).map((g, index) =>
      <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ display: "inline-block", fontSize: "13px",width:"130px"}}>{`${g.title}`}</span>
        <span style={{ display: "flex", borderRadius: "10px", backgroundColor: `${g.color}`, height: "10px", width: "10px" }}></span>
        <span style={{display:"flex", justifyContent:"flex-end", width:"40px"}}>{`${g.value}%`}</span>
      </div>)
  }

  render() {
    const data = this.dataForPie()
    console.log(this.props.genres)
    return (
      <div className={this.props.className} style={{marginTop:"10px",marginBottom:"10px"}}>
        {this.displayTitle(data)}
        <div>
          <PieChart data={data} />
        </div></div>)
  }
}