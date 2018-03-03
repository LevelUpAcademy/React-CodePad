import React from 'react';
import fire from "../firebase/config";

import { Message } from "./message";

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
                language: ""
            });
            this.props.history.push(`/${results.key}`)
        })
        
        event.preventDefault();
        
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
                        <option value="Javascript">Javascript</option>
                        <option value="C#">C#</option>
                        <option value="Python">Python</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Swift">Swift</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Code</label>
                    <textarea name="code" value={this.state.code} onChange={this.handleChange} className="form-control" id="code" rows="12"></textarea>
                </div>
                <Message message={this.state.message} />
                
                <button type="submit" className="btn btn-primary">Save snippet</button>
            </form>
        );
    }
}