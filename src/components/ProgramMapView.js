import React from 'react';
import ListItems from './ListItems';
import NonCurricular from './Noncurriculars';


const ProgramMapView = (props) => {
  console.log(props.courseData)
  console.log(props.degreeData)

  let numberYears = `list-view-years${props.degreeData.years.length}`
  return (
    <div className="list_view">
      {
        props.courseData.map((year, i) => {
          let createOR = year.map((term) => {
              return Object.values(term).reduce((total, current) => {
                if (!total[current.SortOrder - 1]) {
                  total[current.SortOrder - 1] = {
                    val: current,
                    extra: []
                  }
                } else {
                  total[current.SortOrder - 1].extra.push(current)
                }
                return total
              }, [])
            })
          return (
            <div className={`top-blocks ${numberYears}`} key={i}>
              <h1>{}</h1>
              {createOR.map((termData, j) => {
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let credits = []
                if (termData.length === 0) {
                  credits.push(0)
                } else {
                  termData.map((value) => {
                      if (value.length === 0) {
                        credits.push(0)
                      } else {
                        credits.push(parseInt(value.val.Credit))
                      }
                  })
                }
                let reducedCredits = credits.reduce(reducer)
                let hiddenTerm
                if (props.degreeData.years[i].terms[j].termName.includes("hidden")) {
                  hiddenTerm = "list-open-hidden"
                } else {
                  hiddenTerm = null
                }
                return (
                  <div key={j}>
                  <h2 className={hiddenTerm}>{props.degreeData.years[i].terms[j].termName}</h2>
                  <h3 className={`list-credits ${hiddenTerm}`}>{`Credits: ${reducedCredits}`}</h3>
                  <ul className={`filter-list ${hiddenTerm}`}>
                    {termData.map((termData, k) => {
                      return (
                        <ListItems key={k} data={termData} />
                      )
                    })}
                  </ul>
                  <NonCurricular data={props.degreeData.years[i].terms[j].noncurricular} />
                </div>
                )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ProgramMapView