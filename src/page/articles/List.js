import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('AppStore')
@observer
class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>文章列表</h2>
      </div>
    )
  }
}
export default About