import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Paper from 'material-ui/Paper';

import chartColors from './chartColors';

import s from './PollItem.css';

class PollItem extends React.Component {

  static propTypes = {
    poll: React.PropTypes.object.isRequired,
  }
	
  render() {
    const { poll } = this.props;
    const votes = poll.options.map((option) => (
      {
        option,
        votes: 0,
      }
    ));
    poll.votes.edges.forEach(vote => votes[vote.node.option].votes++);

    const noVotes = votes.every((vote) => vote.votes === 0);

    let colorSpread =
        votes.map(
          (vote, i) => (
            <div
              key={i}
              className={s.colorSpread}
              style={{ flexGrow: (noVotes ? 1 : vote.votes), backgroundColor: chartColors[i] }}
            >
              {(vote.votes || noVotes)
                  ?
                <span className={s.tooltip}>
                  {vote.option}: {vote.votes} {vote.votes === 1 ? 'vote' : 'votes'}
                </span>
                  :
                null
              }
            </div>
          )
        );
		
    return (
      <div className={`col-xs-12 col-sm-6 col-md-3 ${s.root}`}>
        <Paper zDepth={2}>
          <div className={`${s.colorSpreadContainer} ${s.top}`}>
            {colorSpread}
          </div>
          <div className={s.content}>
            <h4 className="center-text">
              <Link to={`/user/${poll.author.id}`}>
                <span className={s.user} onClick={this.routeToUser}>{poll.author.username}</span>
              </Link>
              {' asked:'}
            </h4>
            <Link to={`/poll/${poll.id}`}>
              <h2 className="center-text">{poll.title}</h2>
              <div className={s.gradinetHide}></div>
            </Link>
          </div>
          <div className={s.colorSpreadContainer}>
            {colorSpread}
          </div>
        </Paper>
      </div>
		);
  }
}

PollItem = withStyles(s)(PollItem);

PollItem = Relay.createContainer(PollItem, {
  initialVariables: {
    optionsLimit: 10,
  },

  fragments: {
    poll: (() => Relay.QL`
      fragment on Poll{
        id,
        title,
        options,
        votes(first: $optionsLimit){
          edges{
            node{
              option
            }
          }
        },
        author{
          id,
          username
        },
      }
    `),
  },
});

export default PollItem;
