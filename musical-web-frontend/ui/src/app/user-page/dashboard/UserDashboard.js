import React, {useState, useEffect} from 'react';
import Navbar from '../../landing-page/components/navbar';
import logo from '../../../img/Google_Play_Music_icon-icons.com_75720.png';
import LoadingScreen from 'react-loading-screen';
import UploadFile from './components/upload';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios, { post, get } from 'axios';


const Dashboard = () => {

    const [loading, setLoading] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    let detect = () => {

      console.log("click!");
      console.log(localStorage.getItem('token'))

      axios.get('http://localhost:3333/detect', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then(function (response) {
                // if(response.data) window.location.reload();
                console.log(response)
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
    })

    const listData = [];
    for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
    }

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
                text='Please login your account first...'
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

            <UploadFile />

            <div>
            <button onClick={()=> detect()} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
               Detect your genre <i className="ion-radio-waves"></i> <i className="ion-radio-waves" ></i>
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
               Generate youy playlist <i className="ion-ipod"></i> <i className="ion-ipod"></i>
            </button>
            </div>
            {/* <iframe width="30%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;{ ADD YOUR PARAMETERS HERE }">
            </iframe> */}

            <div className="border border-blue-300 text-center p-6 m-10 bg-gray-300 rounded hidden">
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
    dataSource={listData}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />

                </div>

            </LoadingScreen>
    </div>
    )
}

export default Dashboard
