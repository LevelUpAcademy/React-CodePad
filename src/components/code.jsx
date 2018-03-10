import React from 'react';
import fire from "../firebase/config";

import { Message } from "./message";

import AceEditor from 'react-ace';
import 'brace/theme/monokai';

export class Code extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            title: "",
            language: "",
            code: ""
        }
    }

    componentDidMount() {
        fire.database().ref(`code/${this.props.match.params.code}`)
            .on('value', (snapshot) => {
            let item = snapshot.val();
            this.setState({
                title: item.title,
                language: item.language,
                code: item.code
            })
        });
    }

    render(){
        return (
            <div onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <span name="title" type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="My code snippet" >
                        {this.state.title}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <span name="language" type="text" className="form-control" id="language" aria-describedby="languageHelp" placeholder="My code snippet" >
                        {this.state.language}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Code</label>
                    <AceEditor
                        mode={ this.state.language }
                        theme="monokai"
                        fontSize={14}
                        showPrintMargin={true}
                        highlightActiveLine={true}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        value={ this.state.code }
                        />
                </div>

                <button type="submit" className="btn btn-primary">Save snippet</button>
            </div>
        );
    }
}