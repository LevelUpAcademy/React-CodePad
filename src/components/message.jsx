import React from 'react';

export class Message extends React.Component {
    render(){
        if (this.props.message != ""){
            return (
                <div className="alert alert-success" role="alert">
                    {this.props.message}
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}