import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import Cards from './Cards'
import MapSelect from './MapSelect'

const GET_PROGRAMS = gql`
  query {
    programs {
      id
    }
  }
`

const GET_DEGREES = gql`
  query Programs ($program: ID!) {
    programs(where: {id: $program}) {
      degrees {
        id
        icon
        description
      }
      metaTitle {
        id
        abbr
      }
    }
  }
`

const CardContainer = (props) => {

  return (
    <div id="programmapping">
      <div className="program-map-heading">
        <Query query={GET_PROGRAMS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <MapSelect programSelected={props.programSelected} programs={data.programs} programSelect={props.programSelect} />
            );
          }}
        </Query>
        <div className="text-center">
          <h2>Choose Your Program Map</h2>
          <h3 className="catalog">All program maps reflect the 2019-2020 catalog requirements</h3>
        </div>
      </div>
      <div id="cards">
        <Query query={GET_DEGREES} variables={{program: props.programSelected}}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Cards cards={data.programs[0].degrees} meta={data.programs[0].metaTitle} openMap={props.openMap} />
            );
          }}
        </Query>
      </div>
    </div>
  )
}

export default CardContainer