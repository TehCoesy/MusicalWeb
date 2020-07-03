import React from 'react'
import axios, { post } from 'axios';
import {useToasts} from 'react-toast-notifications';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
    console.log(e.target.files[0].name)
    localStorage.setItem('file_name', e.target.files[0].name)
  }
  
  fileUpload(file){
    const url = 'http://localhost:3333/upload';
    const formData = new FormData();
    formData.append('audio',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
    }
    
    localStorage.setItem('just_upload', "ok");
    // return post(url, formData, config);
    axios.post(url, formData, config)
      .then(function (response) {
                window.location.reload();
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // setLoading(false);
            })
    }
  

  render() {
    return (

        <div class="flex items-center justify-center bg-grey-lighter m-10 p-10 border border-gray-300 ">
            <form onSubmit={this.onFormSubmit}>
            <h1 className="uppercase text-2xl text-red-500 font-bold tracking-wider py-5">Audio Upload</h1>

    <h1 className="uppercase italic text-xl py-5">{localStorage.getItem('file_name') || "your file"}</h1>
            
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type='file' class="text-blue-500 hidden" onChange={this.onChange}/>
            </label>
            <button type="submit" class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
            </form>
        </div>


    //   <form onSubmit={this.onFormSubmit} className="m-10 py-10 border border-blue-300 rounded text-center">
    //     <h1 className="uppercase text-2xl text-red-500 font-bold tracking-wider py-10">Audio Upload</h1>
    //     <input type="file" onChange={this.onChange}/>
    //     <button type="submit">Upload</button>
       
    //   </form>
   )
  }
}



export default SimpleReactFileUpload