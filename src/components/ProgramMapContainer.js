import React, {Component} from 'react';
import { withApollo } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import gql from 'graphql-tag';
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import ProgramMapView from './ProgramMapView'

const GET_DEGREE_DATA = gql`
query Degree ($degree: ID!) {
	degrees(where: {id: $degree}) {
    id
    icon
    programTitle {
      metaTitle {
        abbr
      }
    }
    years {
      id
      year
      terms {
        termName
        term
        classes {
          sortorder
          subsortorder
          url
          className
          requirement {
            id
            description
          }
        }
        noncurricular {
          id
          description
        }
      }
    }
  }
}
`

const regex = /(<([^>]+)>)/ig;

class ProgramMapContainer extends Component {
  state = {
    data: [],
    courseData: [],
    isLoaded: false
  }

  componentDidMount() {
    const selectedMap = this.props.map ? this.props.map : this.props.history.location.pathname.split('/')[2].replace(/([a-z])([A-Z])/g, '$1 $2').trim()
    console.log(selectedMap)
    this.props.client.query({
      query: GET_DEGREE_DATA,
      variables: {degree: selectedMap}
    })
    .then((res)=>{
      this.setState({data: res.data.degrees[0]})
      let sortedClasses = [];
      res.data.degrees[0].years.map((year) => {
        let array = [];
        year.terms.map((term) => {
          if (term.classes === undefined) {
            array.push([{requirement: {description: null,id: 'none'},sortorder: 1,subsortorder: 1,url: "https://iq2prod1.smartcatalogiq.com/APIs/courseapi?path=/sitecore/content/Catalogs/Linn-Benton-Community-College/current/Catalog/Courses/VT-Veterinary-Technology/100/VT-115"}])
          } else {
            let result = term.classes.map((c) => {
              return {...c, year: year.year, term: term.term};
            })
            array.push(result.sort(
              function (a, b) {
                if (a.sortorder === b.sortorder) {
                  return a.subsortorder - b.subsortorder;
                }
                return a.sortorder > b.sortorder ? 1 : -1;
              })
            )
          }
        })
        sortedClasses.push(array)
      })
      const classSmartCatalogData = new Promise ((resolve, reject) => {
        setTimeout(() => resolve (sortedClasses.map((year) => {
          return year.map((term) => {
            const termCourses = []
            term.map((course) => {
              let classur = course.url;
              let sortorder = course.sortorder;
              let subsortorder = course.subsortorder;
              let Requirement = course.requirement.description;
              let reqType = course.requirement.id;
              $.ajax({
                url: `${classur}&format=jsonp`,
                dataType: "jsonp",
                global: false,
                crossDomain: true,
                success: (data) => {
                  termCourses.push({
                    title: data.courses.course.subject_code + " " + data.courses.course.number,
                    Credit: data.courses.course.credits,
                    CreditId: "Credits:" + " " + data.courses.course.credits,
                    SubjNumber: data.courses.course.number,
                    LongName: data.courses.course.name,
                    Descrip: data.courses.course.description.replace(regex, ""),
                    SortOrder: sortorder,
                    SubSortOrder: subsortorder,
                    Requirement: Requirement,
                    ReqType: reqType,
                    classKey: uuidv4()
                  })
                },
                error: (status,errorThrown) => {
                  this.setState({listviewError: errorThrown, listviewStatus: status})
                }
              })
            })
            return termCourses
          })
        })), 1000)
      })
      Promise.all([classSmartCatalogData]).then((values)=>{
        setTimeout(() => {
          const sd = []
          values[0].map((year) => {
            let array = [];
            year.map((term) => {
              let result = term.map((c) => {
                return {...c, year: year.year, term: term.term};
              })
              array.push(result.sort(
                function (a, b) {
                  if (a.sortorder === b.sortorder) {
                    return a.subsortorder - b.subsortorder;
                  }
                  return a.sortorder > b.sortorder ? 1 : -1;
                })
              )
            })
            sd.push(array)
          })
          this.setState({courseData: sd, isLoaded: true})
        }, 1000)
      })
    })
  }

  render() {
    const { isLoaded } = this.state

    if (isLoaded) {
      console.log(this.state.courseData)
      let degreeDescription
      if (this.state.data.id.includes('AAS')) {
        degreeDescription = 'The Associate of Applied Science degree leads you directly to employment in a specific career. The degree is offered in a number of programs areas, and is awarded to students who complete the requirements of a specified, two-year career and technical program.'
      } else if (this.state.data.id.includes('AS')) {
        degreeDescription = 'The Associate of Science degree is lower-division degree intended to transfer to Oregon State University, with a focus on the first two years of college coursework in your area of study.'
      } else if (this.state.data.id.includes('AAOT')) {
        degreeDescription = 'The Associate of Arts Oregon Transfer degree will satisfy lower-division (first two years) general education requirements of any institution in the Oregon University System (but not necessarily school, department or major requirements with regard to courses or GPA). The degree does not require a designated major. Check with your advisor to concentrate your studies to an area of interest.'
      } else if (this.state.data.id.includes('OYC')) {
        degreeDescription = 'Certificates of Completion are career technical in nature and are designed to prepare students for entry into the workforce.'
      } else {
        degreeDescription = 'Certificates of Completion are career technical in nature and are designed to prepare students for entry into the workforce.'
      }
      let cardMedia
      if (this.state.data.icon.includes('/')) {
        if (this.state.data.icon.includes('OSUL')) {
          cardMedia = <img src={"/_resources/images/id_img/map-test/dpplogo-inner.png"} alt='' />
        } else {
          cardMedia = <img src={this.state.data.icon} alt='' />
        }
      } else {
        cardMedia = <i className={this.state.data.icon} />
      }
      let imgClass
      if (this.state.data.icon.includes('/')) {
        if (this.state.data.icon.includes('OSUL')) {
          imgClass = 'osu'
        } else if (this.state.data.icon.includes('Oregon')) {
          imgClass = 'oregon'
        }
      }
      return (
        <section className={`dashboard ${this.state.data.programTitle.metaTitle.abbr}`}>
          <Link to='/'>
            <div tabIndex="0" className={"dash-close"} onKeyDown={this.props.keyClosePath} onKeyUp={this.keyClose} onClick={this.props.closePath}>
              <i className="fas fa-times"></i>
            </div>
          </Link>
          <div className={`profil-block ${this.state.data.programTitle.metaTitle.abbr}`}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="shadowed-goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                  <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                  <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                  <feComposite in2="shadow" in="goo" result="goo" />
                  <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
              </defs>
            </svg>
            <div className={`avatar ${imgClass}`}>
              {cardMedia}
            </div>
            <h1 className="name">{this.state.data.id}
              <span className="gauge-help">
                <span className="tool" data-tip={degreeDescription}>
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                </span>
              </span>
            </h1>
          </div>
          <ProgramMapView degreeData={this.state.data} courseData={this.state.courseData} />
        </section>
      )
    } else {
      return <div></div>
    }
  }
}

export default withApollo(withRouter(ProgramMapContainer))