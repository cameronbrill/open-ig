import React, { Component } from 'react';
import './../App.css';

class UserFeed extends Component {
  render() {
    const { user } = this.props;
    let ImagesFeed = null;

    if(user) {
      ImagesFeed = user.edge_owner_to_timeline_media.edges.map((e, i) => {
        const { node } = e;
        const { display_url: imageURL, accessibility_caption: altText } = node;
        return (
          <img key={i} src={imageURL} alt={altText} width={250} />
        );
      });
    }

    return (
      <div className="feed">
        {ImagesFeed}
      </div>
    );
  }
}

export default UserFeed;
