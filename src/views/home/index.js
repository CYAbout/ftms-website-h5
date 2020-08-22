import React, { Component } from 'react';
import { SegmentedControl, Carousel, Toast } from 'antd-mobile'
import Swiper from 'react-id-swiper'
import Carswiper from '../../components/carswiper'
// import Gotop from '../../components/common/gotop'
import { homeApi } from './api'
import config from '../../config.json'
import './index.less'
import 'react-id-swiper/src/styles/css/swiper.css';
const BMap = window.BMap || {}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsValue: ['轿车', 'SUV', '中型客车', '原装进口'],
      tabsIndex: -1,
      carList: [],
      showLastFlex: false,
      page: 0,
      bottomList: [
        // {
        //   title: '数字展厅',
        //   link: '/3d/room',
        //   imgName: 'home-show.png'
        // },
        // {
        //   title:'官方商城',
        //   link:'https://mall.ftms.com.cn/wx',
        //   imgName:'home-shop.png'
        // },
        // {
        //   title: '丰享汇',
        //   link: '/carowner/fengxianghui',
        //   imgName: 'home-fengxiang.png'
        // },
        // {
        //   title: '粉丝互动',
        //   link: '/brand/fans',
        //   imgName: 'home-fans.png'
        // },
        // {
        //   title: '安心二手车',
        //   link: 'http://www.ft-ucar.com.cn/',
        //   imgName: 'home-esc-1.png'
        // },
      ],
      params: {
        // direction: 'vertical',
        // mousewheel: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      },
      lbData: [],
      show: false,
      flags: false,
      position: { x: 0, y: 0 },
      nx: '',
      ny: '', 
      dx: '', 
      dy: '', 
      xPum: '', 
      yPum: '',
    }
  }
  componentWillMount() {
    this.slideshow()
  }
  componentDidMount() {
    this.brandModels()
    this.getAdvertisement()
    // 阻止滚动条滚动
    var moveDiv = document.getElementById('lucky')
      moveDiv.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
  }
  // "id": "1",              // id
  // "name": "广告位测试",   // 广告位名称
  // "pc_pic": "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/757226784895923185322933541689.jpg",// 广告位pc端图片
  // "m_pic": "",            // 广告位移动端图片
  // "url": "www.baidu.com", // 跳转链接
  // "position": "pc"        // 显示位置，pc：pc端显示，app：移动端显示
  getAdvertisement() {
    homeApi.getAdvertisement('app')
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            bottomList: res.data.filter(v => v.list.position.includes('app'))
          })
        }
      })
  }
  brandModels() {
    homeApi.brandModels()
      .then(res => {
        let carList = res.data;
        // for(let m in carList){
        //   let brandid = carList[m]['brand_id'];
        //   let item = carList[m]['car_series'];
        //   for(let n in item){
        //     item[n].brandid = brandid;
        //   }
        // }
        if (res && res.code == 0) {
          this.setState({
            carList: carList,
            // tabsValue: res.data.filter(v => !!v.car_series.length).map(v => v.title)
            tabsValue: res.data.map(v => v.title)
          })
        }
      })
  }
  slideshow() {
    homeApi.slideshow(3)
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            lbData: res.data
          })
        }
      })
  }

  jumpLink(e, link) {
    e && e.preventDefault()
    if (link.startsWith('http')) {
      window.location.href = link
    } else {
      this.props.history.push(link)
    }
  }

  onChange = (v, e) => {
    e.preventDefault()
    const haveYuanzhuang = this.state.carList.find(v => +v.brand_id === 16).car_series.length
    console.log(!haveYuanzhuang)
    if (v === 3 && !haveYuanzhuang ) {
      this.setState({
        tabsValue: ['轿车', 'SUV', '中型客车', '原装进口（敬请期待）'],
        showLastFlex: true,
        tabsIndex: this.state.tabsIndex
      }, () => this.forceUpdate())

      // selectedIndex
      // if(this.state.tabsIndex == -1 || this.state.tabsIndex != 2 || this.state.tabsIndex != 1) {
      //   this.setState({
      //     showLastFlex:true
      //   })
      //   return false
      // }
      return false
    } else {
      this.setState({
        tabsValue: ['轿车', 'SUV', '中型客车', '原装进口'],
        showLastFlex: false,
        tabsIndex: v,
      }, () => this.forceUpdate())
      // this.setState({
      //   tabsIndex: v,
      // })
    }

  }
  onValueChange = (v) => {
    // if(v == 3) {
    //   return
    // }
  }

  onTmove(e) {
    console.log(e.target)
  }
  jumpSwiper(url) {
    return
    // console.log(url)
    // Toast.info(url, 1)

    // window.location.href = url
  }
  goLucky() {
    const userString = localStorage.getItem('userInfo');
    let token = '';
    console.log(userString)
    if (userString) {
      const user = JSON.parse(userString);
      token = user.accessToken;
    }
    token?window.open(`${config.mallServerPath}/luckdraw?token=${token}`):window.open(`${config.mallServerPath}/luckdraw`)
  }
  // 实现移动端拖拽
  down(event){
    // 阻止滚动条滚动
    document.documentElement.style.overflowY = 'hidden'
    event.stopPropagation()
    var moveDiv = document.getElementById('lucky')
    this.setState({
      flags: true
    })
    var touch;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.setState({
      position: {
        x: touch.clientX,
        y: touch.clientY
      },
      dx: moveDiv.offsetLeft,
      dy: moveDiv.offsetTop
    })
  }
  move(event){
    event.stopPropagation()
    var moveDiv = document.getElementById('lucky')
    if(this.state.flags){
    var touch ;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.setState({
      nx: touch.clientX - this.state.position.x,
      ny: touch.clientY - this.state.position.y,
      xPum: this.state.dx+this.state.nx,
      yPum: this.state.dy+this.state.ny
    })
    moveDiv.style.right = document.documentElement.clientWidth - this.state.xPum - moveDiv.offsetWidth + 'px'
    moveDiv.style.bottom = document.documentElement.clientHeight - this.state.yPum - moveDiv.offsetHeight + 'px'
    //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        event.preventDefault();
    }
  }
  //鼠标释放时候的函数
  end(){
    // 放开滚动条滚动
    document.documentElement.style.overflowY = 'scroll'
    this.setState({
      flags: false
    })
    console.log('--end--')
    let moveDiv = document.getElementById('lucky')
    let myHeader = document.getElementById('myHeader')
    let winWith = document.documentElement.clientWidth // 窗口宽度
    let winHeight = document.documentElement.clientHeight // 窗口高度
    let boxWidth = moveDiv.offsetWidth // 事件盒子宽度
    let boxHeight = moveDiv.offsetHeight // 事件盒子高度
    let headHeight = myHeader.offsetHeight // 头部header高度
    console.log(winWith - this.state.xPum - boxWidth)
    // 判断右侧边界
    if ((winWith - this.state.xPum - boxWidth) < 0) moveDiv.style.right = 0
    // 判断下侧边界
    if ((winHeight - this.state.yPum - boxHeight) < 0) moveDiv.style.bottom = 0
    // 判断左侧边界
    if (moveDiv.offsetLeft < 0) moveDiv.style.right = winWith - boxWidth + 'px'
    // 判断上侧边界
    if (moveDiv.offsetTop - headHeight < 0) moveDiv.style.bottom = winHeight - headHeight - boxHeight + 'px'
  }


  goOther(url) {
    window.location.href = url;
  }

  render() {
    const { tabsValue, tabsIndex, bottomList, tabs, params, lbData, carList, showLastFlex } = this.state
    if (!lbData) {
      return null
    }
    // console.log(lbData)
    return (
      <div className="home">
        <div className="t">
          {
            tabsIndex === -1 ?
              <div className="img-box" onTouchEnd={this.onTmove}>
                {!!lbData.length && <Swiper {...params}>
                  {
                    lbData.map((v, i) => {
                      return (
                        <div
                          className="v-item"
                          key={v.id}
                        // onClick={() => this.jumpSwiper(v.mUrl)}
                        >
                          <a href={v.mUrl}>
                            <img index={v.id} src={v.mThumb} alt="img" />
                          </a>
                        </div>
                      )
                    })
                  }
                </Swiper>}
              </div>
              :
              <div className="tabs">
                <Carswiper tabs={carList[tabsIndex].car_series.length ? carList[tabsIndex].car_series : carList[tabsIndex - 1].car_series} onChange={this.onChange} />
              </div>
          }
          <div className={ showLastFlex ? 'flex-2 car-nav' : 'car-nav'}>
            <SegmentedControl
              className={'box' + tabsIndex}
              selectedIndex={tabsIndex}
              values={tabsValue}
              tintColor={'#d3b078'}
              onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex, e)}
              onValueChange={(v) => this.onValueChange(v)}
            />
          </div>
          <div className="modal" />
        </div>

        <ul className="b">
          {
            bottomList.map((v, i) => {
              return (
                <li key={i} onClick={this.goOther.bind(this,v.list.m_url)}>
                  <img src={v.list.m_pic} alt="img" />
                  <a>
                    {v.list.name}
                  </a>
                </li>
              )
            })
          }
          {/* {
            bottomList.map((v, i) => {
              return (
                <li key={i}>
                  <img src={require(`../../imgs/${v.imgName}`)} alt="img" />
                    <span
                    
                      onClick={(e) => this.jumpLink(e,v.link)}
                    >
                      {v.title}
                    </span>
                </li>
              )
            })
          } */}
        </ul>
        {/* <Gotop /> */}
        <div className="lucky" id="lucky"
        onClick={this.goLucky.bind(this)} 
        onMouseDown={this.down.bind(this)} 
        onTouchStart={this.down.bind(this)} 
        onMouseMove={this.move.bind(this)} 
        onTouchMove={this.move.bind(this)} 
        onMouseUp={this.end.bind(this)} 
        onTouchEnd={this.end.bind(this)}>
          <img src={require(`../../imgs/choujiang.png`)} alt="" />
        </div>
      </div>
    );
  }
}

export default Home;
