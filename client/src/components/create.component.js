import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessname = this.onChangeBusinessname.bind(this);
        this.onChangeGstNumber    = this.onChangeGstNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            person_name: '',
            business_name: '',
            business_gst_number: ''
        }
    }

    onChangePersonName(e) {
        this.setState({
           person_name: e.target.value 
        });
    }

    onChangeBusinessname(e) {
        this.setState({
           business_name: e.target.value 
        });
    }

    onChangeGstNumber(e) {
        this.setState({
           business_gst_number: e.target.value 
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            business_gst_number: this.state.business_gst_number
        };
        axios.post('http://localhost:4000/business/add', obj)
            .then(res => {
                console.log(res.data);
                window.location.reload()
            });
            this.props.history.push('/index');

        this.setState({
            person_name: '',
            business_name: '',
            business_gst_number: ''
        })
    }

    render() {
        return(
            <div>
                <h3>Add New Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Person Name: </label>
                        <input type="text" className="form-control" value={this.state.person_name} onChange={this.onChangePersonName}/>
                    </div>
                    <div className="form-group">
                        <label>Add Business: </label>
                        <input type="text" className="form-control" value={this.state.business_name} onChange={this.onChangeBusinessname}/>
                    </div>
                    <div className="form-group">
                        <label>Add GST Number: </label>
                        <input type="text" className="form-control" value={this.state.business_gst_number} onChange={this.onChangeGstNumber}/>
                    </div> 
                    <div className="form-group">
                        <input type="submit" value="Register business" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}