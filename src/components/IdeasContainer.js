const React = require('react');
const Axios = require('axios');
const Idea = require('./Idea.js');
const update = require('immutability-helper');
const IdeaForm = require('./IdeaForm.js');

// Class declaration
class IdeasContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: ''
    }
  }

  // Upon component mount fire 'get' to receive ideas from API
  componentDidMount() {
    Axios.get('http://localhost:3001/api/v1/ideas.json')
    .then(response => {
      console.log(response);
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  // Update function for addition on ideas to DB
  addNewIdea = () => {
    Axios.post(
      'http://localhost:3001/api/v1/ideas', 
      { idea: 
        {
        title: '',
        body: ''
        }
      }
    )
    .then(response => {
      console.log(response)
      const ideas = update(this.state.ideas, {
        $splice: [[0,0, response.data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  // Update idea function and utilize update function from immutability-helper
  updateIdea = (idea) => {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    const ideas = update(this.state.ideas, {
      [ideaIndex]: { $set: idea }
    })
    this.setState({
      ideas: ideas,
      notification: 'Changes Saved'
    })
  }

  // reset state of notification for update clear
  resetNotication = () => {
    this.setState({notification: ''})
  }

  enableEditing = (id) => {
    this.setState({editingIdeaId: id})
  }


  render() {
    return (
      <div>
        <div>
          <button className="newIdeaButton" onClick={this.addNewIdea}>
            New Idea
          </button>
          <span className="notification">
            {this.state.notification}
          </span>
        </div>

        <div className="board">
          {this.state.ideas.map((idea) => {
            if (this.state.editingIdeaId === idea.id) {
              return(<IdeaForm idea={idea} key={idea.id} onClick={this.enableEditing} updateIdea={this.updateIdea} resetNotication={this.resetNotication} />)
            } else {
              return (<Idea idea={idea} key={idea.id} />)
            }
          })}
        </div>
      </div>
    )
  }
}

module.exports = IdeasContainer;