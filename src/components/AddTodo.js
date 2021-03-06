import React, { Component } from 'react'
import { Input } from 'native-base'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

class AddTodo extends Component {
  state = { text: ''}

  onChangeText = (text) => this.setState({text})

  onSubmitEditing = () => {
    const { text } = this.state
    const { dispatch } = this.props

    if (!text) return // Don't submit if empty

    console.log("submit:"+text)
    dispatch(addTodo(text))
    this.setState({text: ''})
  }

  render() {
    return (
      <Input placeholder='Add new todo' bordered
        autoCorrect={false}
        value={this.state.text}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}/>
    )
  }
}

export default connect()(AddTodo)
