import React from 'react'


export default class Progress extends React.Component {
  render() {
    return (
      <div className="spinner-center">
          <div className="orbit-spinner">
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
        </div>
      </div>)
  }
}