import React, { Component } from 'react'
// import { observer, inject } from 'mobx-react'

// @inject('AppStore')
// @observer
class About extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    // const {AppStore} = this.props
    return (
      <div>
        <h2>About</h2>
        {this.props.children || "你好 再见"}
      </div>
    )
  }
}
export default About