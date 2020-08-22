import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import Tabone from './modules/tabone';
import Tabtwo from './modules/tabtwo';
import Tabthree from './modules/tabthree';
import Tabfour from './modules/tabfour';
import Tabfive from './modules/tabfive';
import TabthreeShenbian from './modules/tabthreeShenbian';
import TabthreeAiche from './modules/tabthreeAiche';
import { getParamsObj } from '../../../utils/util'
import { carOwnerApi } from '../api'
import './index.less'

class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // tabIndex: +getParamsObj(props.location.search).tabs,
      oneIndex: +getParamsObj().oneindex || 0,
      twoIndex: +getParamsObj().twoindex || 0
      // carType: []
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        oneIndex: +getParamsObj().oneindex
      })
    }
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        twoIndex: +getParamsObj().twoindex
      })
    }
  }
  // getTabIndex(v,i) {
  //   const tabIndex = getParamsObj().tabsIndex ? +getParamsObj().tabsIndex : 0
  //   if (tabIndex) {
  //     this.setState({
  //       tabIndex: 1,
  //       subTabIndex: tabIndex
  //     })
  //   }else {
  //     this.setState({
  //       tabIndex: 1,
  //       subTabIndex: i
  //     })
  //   }
  // }
  setOneIndex(v, i) {
    this.props.history.push(`/carowner/introduce?oneindex=${i}`)
    // this.setState({
    //   oneIndex: i,
    // })
  }
  setTwoIndex(v, i) {
    this.props.history.push(`/carowner/introduce?oneindex=1&twoindex=${i}`)
    // this.setState({
    //   twoIndex:i
    // })
  }
  componentDidMount() {
    // this.getCarType()
    // this.getTabIndex();
  }
  // getCarType() {
  //   if(!!this.state.carType.length) {
  //     return
  //   }
  //   carOwnerApi.getVehicleList()
  //     .then(res => {
  //       if(res && res.code == '0') {
  //         this.setState({
  //           carType:res.data.map(v => {
  //             return {
  //               value:v.cid,
  //               label:v.name
  //             }
  //           })
  //         })
  //       }
  //     })
  // }
  render() {
    // console.log('this.state.tabIndex',this.state.tabIndex)
    // if(!this.state.tabIndex) {
    //   return null
    // }
    const tabs = [
      { title: '诚信服务' },
      { title: '服务产品' },
      { title: '服务活动' },
      { title: '保修政策' },
      { title: '满意度调查' },
    ];
    return (
      <div className='introduce'>
        <div className="title-img-b">
          <img src={require('../../../imgs/czzx-top-pic.jpg')} alt="" />
          <span>服务介绍</span>
        </div>
        <div className="content just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.oneIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
            // onChange={(v, i) => this.setState({ tabIndex: i })}
            onTabClick={(v, i) => this.setOneIndex(v, i)}
          >
            <Tabone />
            <Tabtwo setTwoIndex={(v, i) => this.setTwoIndex(v, i)} twoIndex={this.state.twoIndex} />
            <Tabthree setIndex={this.setOneIndex} />
            {/* {
              this.state.fuwuIndex === 1 ?
                <Tabthree setIndex={this.setIndex} />
              :
              this.state.fuwuIndex === 2 ?
                <TabthreeShenbian />
              :
                <TabthreeAiche />
            } */}

            <Tabfour />
            <Tabfive />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Introduce;
