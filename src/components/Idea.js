const React = require('react');

const Idea = ({idea}) =>
  <div className="tile" key={idea.id} >
    <h4>{idea.title}</h4>
    <p>{idea.body}</p>
  </div>

module.exports = Idea;