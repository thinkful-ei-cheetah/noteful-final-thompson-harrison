import React, { Component } from 'react'

export default class API extends Component{

    static apiGet() { 
        
    const searchURL = 'http://localhost:9090/db';

    // const queryString = this.formatQueryParams(data);
    const url = searchURL;

    console.log(url);

    const options = {
      method: 'GET',
      headers: {
        
        "Content-Type": "application/json"
      }
    };

    return fetch(url, options)
    }

    static apiDelete(noteId) {

        const searchURL = `http://localhost:9090/notes/${noteId}/`;

    // const queryString = this.formatQueryParams(data);
    const url = searchURL;

    console.log(url);

    const options = {
      method: 'DELETE',
      headers: {
        
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
    }


}

