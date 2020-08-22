import React, { Component } from 'react';
import Gotop from '../../../../components/common/gotop';
import '../../index.less';

class UesrLayout extends Component {

  render() {
    return (
      <div className='mine'>
        <div className="banner">
          <img index={1} src={require(`../../../../imgs/mine-banner.png`)} alt="img" />
          <span className="banner_text">个人中心</span>
        </div>
        <div className="content">
          {
            this.props.children
          }
        </div>
        {/* <Gotop /> */}
      </div>
    );
  }
}

export default UesrLayout;
