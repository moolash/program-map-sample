import React from 'react';
import { Link } from "react-router-dom";
import $ from 'jquery';

const Cards = (props) => {

  const openCard = (e) => {
    const card = $(e.target).closest('.material-card');
    let icon
    if (e.target.tagName === 'I') {
      icon = $(e.target)
    } else {
      icon = $(e.target).children().closest('I');
    }
    
    icon.addClass('fa-spin-fast');

    if (card.hasClass('mc-active')) {
        card.removeClass('mc-active');
            icon
                .removeClass('fa-arrow-left')
                .removeClass('fa-spin-fast')
                .addClass('fas fa-angle-double-down');
    } else {
        card.addClass('mc-active');
            icon
                .removeClass('fa-bars')
                .removeClass('fa-spin-fast')
                .addClass('fa-arrow-left');
    }
  }

  let cards = props.cards.map((card) => {
    let urlTitle = card.id.replace(/[^a-zA-Z0-9]/g , "");
    let flipMedia
    if (card.icon.includes('/')) {
      if (card.icon.includes('OSUL')) {
        flipMedia = <img src={"/_resources/images/id_img/map-test/dpplogo.png"} alt='Degree Partnership Logo' />
      } else {
        flipMedia = <img src={card.icon.ICON} alt='' />
      }
    } else {
      flipMedia = <i className={card.icon.ICON} />
    }
    let imgClass
    if (card.icon.includes('/')) {
      if (card.icon.includes('OSUL')) {
        imgClass = 'osu'
      } else if (card.icon.includes('Oregon')) {
        imgClass = 'oregon'
      }
    }
    return (
      <div key={card.id} className="col-md-4 col-sm-6 col-xs-12">
        <article className={`material-card ${props.meta.abbr}`}>
          <h2>
            <span>{card.id}</span>
          </h2>
          <div className="mc-content">
            <div className={`img-container ${imgClass}`}>
              {flipMedia}
            </div>
            <button tabIndex="0" className="mc-btn-action" onClick={openCard}>
              <i className="fas fa-angle-double-down"></i>
            </button>
            <div className="mc-description">
              <p>{card.description}</p>
            </div>
            <Link to={`/ProgramMap/${urlTitle}`} >
              <button className={`open_m ${props.meta.abbr}`} onClick={() => props.openMap(card.id)}>Open Program Map</button>
            </Link>
          </div>
        </article>
      </div>
    )
  });

  return (
    <section className="flip-container">
      <div className="row active-with-click">
        {cards}
        <div className="col-md-4 col-sm-6 col-xs-12">
          <article className={`material-card ${props.meta.abbr}`}>
            <h2>
              <span>Find Out About LBCC's Other Programs</span>
            </h2>
            <div className="mc-content">
              <div className="img-container lbcclogo">
                <img src="/_resources/images/id_img/lblogo.png" alt='' />
              </div>
              <div className="mc-description">
                <p>Find out about the various other programs LBCC offers!</p>
              </div>
              <a href='https://www.linnbenton.edu/future-students/programs-of-study/' >
                <button className={`button-one ${props.meta.abbr}`}>See Other Programs</button>
              </a>
            </div>
            <button className="mc-btn-action" onClick={openCard}>
              <i className="fas fa-angle-double-down"></i>
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Cards