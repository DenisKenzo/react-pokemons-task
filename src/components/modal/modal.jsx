import React from "react";
import style from './modal.module.scss'

export default class Modal extends React.Component {
  constructor () {
    super()
    this.state = {
      animation: false,
      flag: false
    }
  }

  init = () => {
    if (this.props.show && !this.state.animation) {
      setTimeout(() => this.setState({animation: true, flag: true}), 1)
    } else if (!this.props.show && this.state.animation) {
      setTimeout(() => this.setState({animation: false}), 1)
      setTimeout(() => this.setState({flag: false}), 200)
    }
  }

  componentDidUpdate = () => this.init()

  componentDidMount = () => this.init()

  render () {
    return (
      <div>
        <div id={this.props.show ? style.modal_background : this.state.flag ? style.modal_background : style.hidden }
             className={this.state.animation ? style.fade_background : ''} onClick={this.props.onHide} >
          <div id={this.props.show ? style.modal_wrapper : this.state.flag ? style.modal_wrapper : style.hidden}>
            <div id={style.modal_content} className={this.state.animation ? style.fade_content : ''} onClick={e => e.stopPropagation()}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// Modal.propTypes = {
//   children: PropTypes.any,
//   onHide: PropTypes.func,
//   show: PropTypes.bool
// }
//
// Modal.defaultProps = {
//   onHide: () => {},
//   children: '',
//   show: false
// }

