import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {business: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({ business: response.data });
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/business')
        .then(response => {
        this.setState({ business: response.data });
        })
        .catch(function (error) {
        console.log(error);
        })
    }

    tabRow() {
        return this.state.business.map(function(object, i) {
            return <TableRow obj={object} key={i} />
        });
    }

    render() {
        return(
            <div>
                <h3 align="center">Data List Member Jatiasih</h3>
                <table className="table table-striped" style={{ marginTop:20 }}>
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Business</th>
                            <th>GST Number</th>
                            <th colSpan="2" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.tabRow() }
                    </tbody>

                </table>
            </div>
        );
    }
}