import React from 'react'
import queryString from 'query-string'
import './index.less'
import { Button, Message } from 'antd';
import { createChannel, sendMessage} from '@/utils/chatAction.js'
import { connect } from "react-redux";
import {videoConfig, roleConifg, channelConfig} from '@/utils/config.js'
import {add0} from '@/utils/util.js'
class Chat extends React.Component{
  constructor(props) {
    super(props)
    this.scheduleStr = queryString.parse(window.location.hash.split('?')[1]).scheduleStr
    this.state = {
      message: '',
      chatList: [],
      pos: true
    }
  }
  componentDidUpdate(val){
    console.log('chatvalval',val)
  }
  componentDidMount(){
    
    this.props.comDidMouted()

    try {
      this.props.msgClient.then(res=>{
        console.log('MessageClientMessageClientMessageClient',res)
  
        createChannel(res, channelConfig.channelChat, (text)=>{
          // console.log('回调成功',text,typeof text)
          this.setMessageContent(text, false)
          this.props.getMessage(text)
        }).then(res=>{
          console.log('channelchannelchannel',res)
          this.channel = res
        })
      })
    } catch (error) {
      Message.error('加入聊天频道失败')
    }
  }

  send = ()=>{
    const msg = this.refs.chatContent.innerHTML.trim()
    if(!msg)return
    this.setState({
      pos: !this.state.pos
    })
    sendMessage(this.channel, msg)
    this.refs.chatContent.innerHTML = ''
    this.setMessageContent(msg, true)
  }
  setMessageContent(msg, pos) {
    this.setState({
      chatList: [...this.state.chatList,{msg, pos}]
    },()=>{
      this.refs.chatMain.scrollTop =this.refs.chatMainInner.scrollHeight
    })
  }
  onKeyDown(e){
    if(e.keyCode === 13) {
      this.send()
      e.preventDefault()
    }
    
  }
  render() {
    let {message,chatList, } = this.state
    const {roomInfo} = this.props
    const date = new Date()
    return (
      <div className='chat-wrap'>
        <header className='chat-header'>聊天</header>
        <main className='chat-main' ref='chatMain'>
          <div className='chat-main-inner' ref='chatMainInner'>
            {
              chatList.map((item,i)=>(
                <div className={['user-msg-box', item.pos? 'right':'left'].join(' ')} 
                  key={i+1}>
                  <div className='user-title'>
                    <span>{`${add0(date.getHours())}:${add0(date.getMinutes())}  `}</span>
                    <span>{roomInfo.userInfo.name}</span>
                  </div>
                  <div className='user-message'>
                    <span>{item.msg}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
        <footer className='chat-footer'>
          <div ref='chatContent' 
            onKeyDown={(e)=>{this.onKeyDown(e)}}
            className='chat-send-content'
            contentEditable="plaintext-only"
            suppressContentEditableWarning="true"  placeholder='按回车键发送您的消息'>
            {message}
          </div>
          <Button className='chat-send' onClick={this.send} size='small' type='primary'>
            发送
          </Button>
        </footer>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    msgClient: state.msgClient,
    roomInfo: state.roomInfo
  }
}
export default connect(mapStateToProps)(Chat)