import React from 'react';
import fire from "../firebase/config";

import { Message } from "./message";

import AceEditor from 'react-ace';
import 'brace/theme/monokai';


export class New extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            code: "",
            language: "",
            message: ""
        }
        
        // Binding events
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e){
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(event) {
        this.setState({
            message: "Saving your code..."
        })
        fire.database().ref('code').push(this.state)
        .then((results) => {
            this.setState({
                message: "Redirecting..."
            })
            this.setState({
                title: "",
                code: "",
                language: "",
                message: ""
            });
            this.props.history.push(`/${results.key}`)
        })
        
        event.preventDefault();
        
    }

    onChange(newValue){
        console.log(newValue);
        this.setState({
            code: newValue
        });
    }


    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input name="title" value={this.state.title} onChange={this.handleChange} type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="My code snippet" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Language</label>
                    <select name="language" value={this.state.language} onChange={this.handleChange} className="form-control" id="language">
                        <option value="javascript">Javascript</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="xml">XML</option>
                        <option value="ruby">Ruby</option>
                        <option value="sass">Sass</option>
                        <option value="mysql">MySql</option>
                        <option value="json">Json</option>
                        <option value="html">HTML</option>
                        <option value="csharp">C#</option>
                        <option value="typescript">Typescript</option>
                        <option value="css">CSS</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Code</label>
                    <AceEditor
                        mode={ this.state.language }
                        theme="monokai"
                        onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        highlightActiveLine={true}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        value={ this.state.code }
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                            }}
                        />
                </div>
                <Message message={this.state.message} />
                
                <button type="submit" className="btn btn-primary">Save snippet</button>
            </form>
        );
    }
}