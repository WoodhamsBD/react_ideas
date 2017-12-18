const React = require('react');
const axios = require('axios');


class IdeaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
  }

  handleInput = (el) => {
    this.setState({[el.target.name]: el.target.value})
  }

  handleBlur = () => {
    const idea = {
      title: this.state.title,
      body: this.state.body
    }
    // id for api put from idea props
    const id = this.props.idea.id;

    // Send update
    axios.put(
      'http://localhost:3001/api/v1/ideas/' + id,
      {
        idea: idea
      })
      .then(res => {
        console.log(res)
        this.props.updateIdea(res.data)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='tile'>
        <form onBlur={this.handleBlur}>
          <input className='input' type='text' name='title' placeholder='Enter a Title' value={this.state.title} onChange={this.handleInput}/>
          <textarea className='input' name='body' placeholder='Describe your Idea' value={this.state.body} onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}

module.exports = IdeaForm;