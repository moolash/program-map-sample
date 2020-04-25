import React from 'react';
import $ from 'jquery';

const NonCurriculars = (props) => {

  const ncOpen = (e) => {
    $(e.target).closest('.NC_container').toggleClass('NC_expand');
  }
  let nc = props.data;
  if (nc.id === 'none') {
    return null
  } else {
    let ncIcon
    if (nc.ICON === "grad-cap"){
      ncIcon = "fa fa-graduation-cap"
    } else {
      ncIcon = 'fa fa-group'
    }
    return (
      <div className="NC_container">
          <button onClick={ncOpen} className="List_ellipse_NC List_ellipse_3_0 List_question">
            <i className={ncIcon}></i>
          </button>
        <div className="NC_content">
          <div className="NC_head">
            <h1>{nc.id}</h1>
          </div>
          <div className="NC_body">
            <p dangerouslySetInnerHTML={{__html: nc.description}}></p>
          </div>
        </div>
      </div>
    )
  }
}

export default NonCurriculars