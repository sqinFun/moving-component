import style from './style.css';
import React from 'react';
import ReactDOM from 'react-dom';

class MovingBalls extends React.Component {
    constructor(props) {
        super(props);
        this.state = { balls: [] }
    }

    addBall = (id) => {

        class randomBall {
            constructor(index) {
                this.containerPosition = 0;
                this.mainIndex = index;
            }
        }
        this.setState({ bals: this.state.balls.push(new randomBall(this.state.balls.length)) })
    }

    changePosition = (ball) => {
        console.log(ball);
        this.setState((prevState) => {
            let arr = prevState.balls;
            arr[ball.mainIndex].containerPosition = !arr[ball.mainIndex].containerPosition;
            return { balls: arr }
        })

    }

    render() {
        let mainBall = [],
            secondaryBall = [];
        this.state.balls.map(item => {
            if (item.containerPosition == 0) {
                mainBall.push(item);
            } else {
                secondaryBall.push(item);
            }
        });
        return (
            <div className="moving-balls">
                <BallsContainer balls={mainBall} addBall={this.addBall} changePosition={this.changePosition}>
                    <AddBlockButton addBall={this.addBall} />
                </BallsContainer>
                <BallsContainer balls={secondaryBall} changePosition={this.changePosition} />
            </div>
        )
    }
}

class BallsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let ballsList = this.props.balls.map((item, index) => {
            return (<Ball key={index} elem={item} changePosition={this.props.changePosition} />);
        });

        return (
            <div className="moving-balls__container">
                {this.props.children}
                {ballsList}
            </div>
        );
    }
}

class AddBlockButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="moving-balls__btn"onClick={this.props.addBall}>
                Добавить шар
            </button>
        )
    }
}

class Ball extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={() => { this.props.changePosition(this.props.elem) }} className="moving-balls__ball">
            </div>
        );
    }
}

ReactDOM.render(<MovingBalls />, document.querySelector('#root'));