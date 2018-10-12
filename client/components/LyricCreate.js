import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricCreate extends Component {
  state = {
    content: ""
  };

  handleInputChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  submitLyric = e => {
    e.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
    this.setState({ content: "" });
  };
  render() {
    return (
      <form onSubmit={this.submitLyric}>
        <label>Add a Lyric</label>
        <input onChange={this.handleInputChange} value={this.state.content} />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
