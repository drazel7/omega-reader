var React = require('react');

require('../../styles/articleEntry.css');

var ArticleEntry = React.createClass({

    getInitialState: function() {
        return {
            showDescription: false,
        }
    },

    handleClick: function() {
        this.setState({showDescription: !this.state.showDescription});
    },

    renderDescription: function() {
        if( this.state.showDescription ) {
            return <div className="description">{this.props.article.description}</div>
        }
        return null;
    },

    render: function() {
        var description = this.renderDescription();
        return (
            <div className="articleEntry">
                <div className="header" onClick={this.handleClick}>{this.props.article.title}</div>
                {description}
            </div>
        );
    }
});

module.exports = ArticleEntry;