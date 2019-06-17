import React, { Component } from 'react';
import './App.css';

import UserProfile from './components/UserProfile';
import UserFeed from './components/UserFeed';
import { getUser, getMoreUser } from './getUser';

const TYPING_TIMEOUT = 900;

class App extends Component {
  state = {
    // input lag
    inputValue: 'natgeo',
    typing: false,
    timeout: 0,

    resp: 0,
    userPK: ''
  }

  changeInput = (e) => {
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      inputValue: e.target.value,
      typing: false,
      timeout: setTimeout(this.updateFeed, TYPING_TIMEOUT)
    });
  }

  componentDidMount = async () => {
    document.title = "Open IG";
    this.updateFeed();
  }

  updateFeed = async () => {
    const userData = await getUser(this.state.inputValue);
    
    if(userData.data) {
      const resp = userData.data.graphql;
      const userPK = resp.user.id;
      
      this.setState({
        resp,
        userPK
      });
    }
  }

  loadMore = async (e) => {
    const { resp, userPK } = this.state;
    const timeline = resp.user.edge_owner_to_timeline_media;
    
    if(timeline) {
      const { end_cursor } = timeline.page_info;
      const ajaxResult = await getMoreUser(userPK, end_cursor);
      const resp = ajaxResult.data.data;
      
      if(resp) {
        this.setState({
          resp
        });
      }
    }
  }

  render() {
    let user = null;
    if(this.state.resp) {
      user = this.state.resp.user;
    }
    
    return (
      <div className="App">
        <h3>Instagram Public API</h3>
        Username
        <input onChange={this.changeInput} value={this.state.inputValue} />
        
        {/* load after ajax request */}
        <UserProfile user={user} />
        <UserFeed user={user} />
        
        <button onClick={this.loadMore}>Load more</button>
      </div>
    );
  }
}

export default App;
