
let ChunkAnalyzeHeader = require('./ChunkAnalyzeHeader').default;
let ChunkAnalyzeFile = require('./ChunkAnalyzeFile').default;
let {TransitionGroup, CSSTransition} = require('react-transition-group');

class ChunkAnalyze extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFiles: false
        }
    }

    getFiles() {
        let self = this;
        var array = [];
        this.props.files.forEach(function (file, i) {
            array.push(<ChunkAnalyzeFile key={i}
                                     file={file}
                                     fileInfo={self.props.chunkInfo.files[i]}
                                     />);
        });
        return array
    }

    showFiles(e) {
        e.preventDefault();
        this.setState({
            showFiles: !this.state.showFiles
        });
    }

    componentDidUpdate() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    render() {

        return <div className="ui grid chunk-analyze-container">
            <ChunkAnalyzeHeader index ={this.props.index}
                                total={this.props.total}
                                jobInfo={this.props.chunkInfo}
                                showFiles={this.showFiles.bind(this)}
                                chunksSize={this.props.chunksSize}/>

                {/*<CSSTransitionGroup component="div" className="ui grid"*/}
                    {/*transitionName="transition"*/}
                    {/*transitionEnterTimeout={500}*/}
                    {/*transitionLeaveTimeout={500}*/}
                {/*>*/}
                <TransitionGroup>
                    {this.state.showFiles ? (
                        <CSSTransition key={0} classNames="transition" timeout={{ enter: 500, exit: 300 }}>
                            {this.getFiles()}
                        </CSSTransition>
                    ): (null)}
                </TransitionGroup>



        </div>;
    }
}

export default ChunkAnalyze;
