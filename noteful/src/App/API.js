import React from 'react'

export default class API extends React.Component{

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
    static apiAddNote(name, content, folderId){
      let time = new Date().toISOString();
      const bodytext = JSON.stringify({
        name:name,
        content:content,
        folderId:folderId,
        modified:time
      })
      const baseUrl = 'http://localhost:9090/notes/';
      const options = {
        method :'POST',
        headers:{
          "Content-Type":"application/json",
        },body: bodytext
        
      }
      return fetch(baseUrl,options);
    }

    static apiAddFolder(folderName){
      const bodytext = JSON.stringify({
        name:folderName
      })
      const baseUrl = 'http://localhost:9090/folders';
      const options = {
        method : "POST",
        headers:{
          "Content-Type":"application.json"
        },
        body: bodytext
      }
      return fetch(baseUrl,options)
    }

    static apiDelete(noteId) {

        const searchURL = `http://localhost:9090/notes/${noteId}/`;
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

