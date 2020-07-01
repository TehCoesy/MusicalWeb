import React from 'react';
import {
    Form,
    Upload,
    Button,
    Input,
  } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const UploadFile = () => {
    const normFile = e => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
    };

    return (
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
    )
}

export default UploadFile;