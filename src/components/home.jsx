import React from 'react';

import fire from "../firebase/config";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            codes: []
        }
    }

    componentDidMount() {
        const itemsRef = fire.database().ref('/code');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                console.log(item);
                newState.push({
                    id: item,
                    code: items[item].code,
                    title: items[item].title
                });
            }
            this.setState({
                codes: newState
            })
            console.log(this.state.code)
        });
    }

    render(){
        return (
            <div>
                <h1>Code Pad</h1>
                <ul>
                    {
                        this.state.codes &&
                            this.state.codes.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`/${item.id}`}>
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            })
                    }
                </ul>
            </div>
        );
    }
}