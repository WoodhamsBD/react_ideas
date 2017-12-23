const React = require('react');


class Idea extends React.Component {
  constructor() {
    super(props) 
  }

  handleClick = () => {
    this.props.onClick(this.props.idea.id)
  }

  render() {
    return(
      <div className="tile">
      <h4 onClick={this.handleClick}>
        
      </h4></div>
    )
  }
}

const Idea = ({idea}) =>
  <div className="tile" key={idea.id} >
    <h4>{idea.title}</h4>
    <p>{idea.body}</p>
  </div>

module.exports = Idea;