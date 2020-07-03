import React, {useState, useEffect} from 'react';
import Navbar from '../../landing-page/components/navbar';
import logo from '../../../img/Google_Play_Music_icon-icons.com_75720.png';
import LoadingScreen from 'react-loading-screen';
import UploadFile from './components/upload';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios, { post, get } from 'axios';
import {useToasts} from 'react-toast-notifications';
import { Alert } from 'antd';


const Dashboard = () => {

    const {addToast} = useToasts()
    const [loading, setLoading] = useState(false);
    const [detectResult, setDetectResult] = useState(""); 
    const [showUpload, setShowUpload] = useState("hidden");
    const [showList, setShowList] = useState("hidden");
    const [list, setList] = useState([]);


    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
        localStorage.removeItem('file_name');
        localStorage.removeItem('genre');
    }

    const hiddenUpload = () => {
      if (showUpload == "") setShowUpload("hidden")
      if (showUpload == "hidden") setShowUpload("")
    }

    let detect = () => {

      setLoading(true);

      axios.get('http://localhost:3333/detect', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then(function (response) {
                // if(response.data) window.location.reload();
                setLoading(false);
                for(let i = 0; i< response.data.length; i++) {
                  setDetectResult(response.data[0]);
                }
                
                addToast("Detect: " + response.data[0], { appearance : 'success'});
                localStorage.setItem('genre', response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false);
            })
    }

    let generate = () => {

      setShowList("");

      axios.get('http://localhost:3333/generate?genre='+localStorage.getItem('genre'), {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        }).then(function (response) {
            // if(response.data) window.location.reload();
            setLoading(false);

            console.log(response.data);

            let listData = [];
            for (let i = 0; i < 10; i++) {
              listData.push({
                  href: response.data[i].master_url,
                  title: response.data[i].title,
                  avatar: response.data[i].thumbnail,
                  description:
                  response.data[i].year,
                  content:
                  response.data[i].genre,
              });
              }

              setList(listData);
            
            // addToast("Detect: " + response.data[0], { appearance : 'success'})
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            setLoading(false);
        })
    }

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            setLoading(true);
            logout();  
        }

        if(localStorage.getItem('just_upload') ==="ok") {
          addToast('Uploaded successfully!', { appearance : 'info'})
          localStorage.removeItem('just_upload');
        }
    })

    const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
    );

    return (
        
        <div>
            <LoadingScreen
                loading={loading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Detect Processing...Please wait...'
            >
            <nav className="flex items-center justify-between flex-wrap bg-pink-200 p-6">
                <div className="flex items-center flex-shrink-0 text-red-600 mr-6">
                    <img src={logo} width={50} className="px-2"></img>
                    <span className="font-semibold text-xl tracking-wider">Music4Life</span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-end px-3 py-2 border rounded text-red-400 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-end lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        
                    </div>
                    <div className="text-xl text-blue-500 tracking-wider px-3">
                        Welcome, <i className="ion-person"></i> User! 
                    </div>

                    <div onClick={() => logout()} className="text-xl tracking-wider pr-3 cursor-pointer hover:underline">
                         <i className="ion-log-out"></i> Logout
                    </div>
                </div>
            </nav>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10" onClick={() => hiddenUpload()}>
                <i className="ion-upload"></i> {"Upload file"}
            </button>

            <div className={"mb-10 " + showUpload}>
              <UploadFile />
            </div>

            <div>
            <button onClick={()=> detect()} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
               Detect your genre <i className="ion-radio-waves"></i> <i className="ion-radio-waves" ></i>
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => generate()}>
               Generate your playlist <i className="ion-ipod"></i> <i className="ion-ipod"></i>
            </button>
            </div>

            <div className="text-2xl uppercase text-teal-500">
                    <i className="ion-ios7-musical-notes"></i> <i className="ion-ios7-musical-notes"></i> {detectResult || "your favorite genre"}
            </div>

            <div className={"border border-blue-300 text-center p-6 m-10 bg-gray-300 rounded " + showList}>
                <h3 className="text-red-500 uppercase tracking-wider text-2xl">Your awesome list <i className="ion-music-note text-purple"></i> <i className="ion-music-note text-purple"></i></h3> 

                <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}
    dataSource={list}
    footer={
      <div>
        Made by <b>Musical_Team 2020</b>
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;{ ADD YOUR PARAMETERS HERE }">
          </iframe>
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={item.avatar}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        
      </List.Item>
    )}
  />

                </div>

            </LoadingScreen>
    </div>
    )
}

export default Dashboard
