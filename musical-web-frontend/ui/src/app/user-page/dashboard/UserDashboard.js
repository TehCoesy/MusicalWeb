import React from 'react';
import Navbar from '../../landing-page/components/navbar';
import logo from '../../../img/Google_Play_Music_icon-icons.com_75720.png';
import {
    Form,
    Upload,
    Button,
    Input,
  } from 'antd';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const Dashboard = () => {

    const normFile = e => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

    return (
        
        <div>
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

                    <div className="text-xl tracking-wider pr-3 cursor-pointer hover:underline">
                         <i className="ion-log-out"></i> Logout
                    </div>
                </div>
            </nav>

        <div className="m-10 border p-5">
            <Form>
                <div className="mb-5">
                    <label className="font-bold text-4xl text-blue-500 uppercase">Upload</label>
                </div>

                <Form.Item label="">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <div className="mb-5">
                    <label className="italic">Or send a link</label>
                </div>

                <Form.Item
                    name="link"
                    label="Link"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your link',
                    },
                    ]}
                >
                <Input placeholder="your wav link" />
                </Form.Item>

                
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
                
            </Form>
        </div>

        
    </div>
    )
}

export default Dashboard
