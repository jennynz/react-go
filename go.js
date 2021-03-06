/** @jsx React.DOM */
var GRID_SIZE = 40;

var BoardIntersection = React.createClass({
    handleClick: function() {
        if (this.props.board.play(this.props.row, this.props.col))
            this.props.onPlay();
    },
    render: function() {
        var style = {
            top: this.props.row * GRID_SIZE,
            left: this.props.col * GRID_SIZE
        };

        var classes = "intersection";
        if (this.props.color != Board.EMPTY)
            classes += this.props.color == Board.BLACK ? " black" : " white";

        return (
            <div onClick={this.handleClick}
                 className={classes} style={style}></div>
        );
    }
});

var BoardView = React.createClass({
    render: function() {
        var intersections = [];
        for (var i = 0; i < this.props.board.size; i++)
            for (var j = 0; j < this.props.board.size; j++)
                intersections.push(BoardIntersection({
                    board: this.props.board,
                    color: this.props.board.board[i][j],
                    row: i,
                    col: j,
                    onPlay: this.props.onPlay
                }));
        var style = {
            width: this.props.board.size * GRID_SIZE,
            height: this.props.board.size * GRID_SIZE
        };
        return <div style={style} id="board">{intersections}</div>
    }
});

var AlertView = React.createClass({
    render: function() {
        let text = "";
        if (this.props.board.in_atari)
            text = "ATARI!";
        else if (this.props.board.attempted_suicide)
            text = "SUICIDE!";

        return (
            <div id="alerts">
              <div className="alert-div">
                <span className="alerts-label">Notes</span>
                <span className="alerts-note">Atari!</span>
              </div>
              <div className="alert-div">
                <span className="alerts-label">Next Move</span>
                <span className="alerts-note">Black</span>
              </div>
              <div className="alert-div">
                <span className="alerts-label">Black</span>
                <span className="alerts-note">4</span>
              </div>
              <div className="alert-div">
                <span className="alerts-label">White</span>
                <span className="alerts-note">9</span>
              </div>
            </div>
        );
    }
});

var PassView = React.createClass({
    handleClick: function(e) {
        this.props.board.pass();
    },
    render: function() {
        return (
            <input id="pass-btn" type="button" value="Pass"
                onClick={this.handleClick} />
        );
    }
});

var board = new Board(19);

var ContainerView = React.createClass({
    getInitialState: function() {
        return {'board': this.props.board};
    },
    onBoardUpdate: function() {
        this.setState({"board": this.props.board});
    },
    render: function() {
        return (
            <div className="game">
              <h1>Play some Go</h1>
              <div className="info">
                <PassView board={this.state.board} />
                <AlertView board={this.state.board} />
              </div>
              <BoardView board={this.state.board}
                  onPlay={this.onBoardUpdate.bind(this)} />
            </div>
        )
    }
});

React.renderComponent(
    <ContainerView board={board} />,
    document.getElementById('main')
);
