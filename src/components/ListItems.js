import React, {Component} from 'react';
import $ from 'jquery';

const OrList = (props) => {
  let count = props.count;

  return (
    <option value={count}>{props.extra.title}</option>
  )
}

const OrListValues = (props) => {
  const val = props.extra;
  let count = props.count;
  const opc = props.opc;
  let style = {opacity: opc}

  return (
    <div className={`or-choice${count} not-visible`}>
      <div className="tab" style={style}>
        <input onKeyUp={props.classToggle} id={val.classKey} type="checkbox" name="tabs" />
        <label className="labelfocus" htmlFor={val.classKey} key={val.LongName}>{val.title}</label>
        <div className="tab-content">
          <h3>{val.LongName}</h3>
          <p>{val.CreditId}</p>
          <p>{val.Descrip}</p>
          <p>{val.Requirement}</p>
        </div>
      </div>
    </div>
  )
}

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orTitle: 'or',
      orSelected: false
    }
  }

  renderSelectOr = (extra, i) => {
    let count = i+1;
    return (
      <OrList key={i} classToggle={this.props.classToggle} extra={extra} count={count++} />
    )
  }

  renderOrValues = (extra, i) => {
    let count = i+1;
    return (
      <OrListValues key={i} classToggle={this.props.classToggle} extra={extra} count={count++} opc={this.props.opc} />
    )
  }

  orListChange = (e) => {
    if (e.target.value === 0) {
      this.setState({orTitle: 'or'})
    } else if (!(e.target.value === 0)) {
      this.setState({orTitle: this.props.data.val.title, orSelected: true})
    }
    var nextAside = $(e.target).parent('.list-aside').next('.list-aside');
    nextAside.children().addClass('not-visible')
    nextAside.children().removeClass('visible')
    nextAside.find(".or-choice" + e.target.value).removeClass('not-visible')
    nextAside.find(".or-choice" + e.target.value).addClass('visible')
  }

  render () {
    const val = this.props.data.val;
    const ext = this.props.data.extra;
    const opc = this.props.opc;
    let style = {opacity: opc}
    if (!ext.length > 0) {
      return (
        <li>
          <div className="tab" style={style}>
            <input onKeyUp={this.props.classToggle} id={val.classKey} type="checkbox" name="tabs" />
            <label className="labelfocus" htmlFor={val.classKey} key={val.LongName}>{val.title}</label>
            <div className="tab-content">
              <h3>{val.LongName}</h3>
              <p>{val.CreditId}</p>
              <p>{val.Descrip}</p>
              <p>{val.Requirement}</p>
            </div>
          </div>
        </li>
      )
      } else {
        let orTitle = this.state.orSelected ? this.state.orTitle:'or'
        return (
          <React.Fragment>
            <div className="list-aside listor" style={style}>
              <select className="list-toggle-divs" onChange={this.orListChange}>
                <option value="0" selected='selected'>{orTitle}</option>
                {
                  ext.map(this.renderSelectOr)
                }
              </select>
            </div>
            <li className="list-aside">
              <div className="or-choice0">
                <div className="tab" style={style}>
                  <input onKeyUp={this.props.classToggle} id={val.classKey} type="checkbox" name="tabs" />
                  <label className="labelfocus" htmlFor={val.classKey} key={val.LongName}>{val.title}</label>
                  <div className="tab-content">
                    <h3>{val.LongName}</h3>
                    <p>{val.CreditId}</p>
                    <p>{val.Descrip}</p>
                    <p>{val.Requirement}</p>
                  </div>
                </div>
              </div>
              {
                ext.map(this.renderOrValues)
              }
            </li>
          </React.Fragment>
        )
      }
    }
}

export default ListItems