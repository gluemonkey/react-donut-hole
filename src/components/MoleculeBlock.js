import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';

import { Link } from "react-router-dom";

import DoughnutChart from './DoughnutChart';

require('core-js/fn/array/flatten');

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`

const StyledDoughnutChart = styled(DoughnutChart)`

`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`

const add = (a, b) => a + b
const uniq = (value, index, self) => self.indexOf(value) === index

const LinkComponenet = (props) => {
  const { molecule } = props;
  return molecule.title.includes('CDK4 and') ? 
  (
    <StyledLink key={'link'} to="/page-1">{props.children}</StyledLink>
  ) : (
    <Fragment>{props.children}</Fragment>
  )
}

class MoleculeBlock extends Component {
  render() {
    const { molecule, phaseFilters } = this.props;
    const segmentParse = molecule.trials.reduce((accum, val) => {
      switch(val.phases) {
        case 'Phase I':
          return {...accum, ...{'phase1': (accum.phase1 += 1)}}
        case 'Phase II':
          return {...accum, ...{'phase2': (accum.phase2 += 1)}}
        case 'Phase III':
          return {...accum, ...{'phase3': (accum.phase3 += 1)}}
        default:
          return accum
      }
    }, {
      'phase1': 0,
      'phase2': 0,
      'phase3': 0
    });

    const segmentFilteredParse = Object.entries(segmentParse).filter(([key,val]) => val !== 0 && !phaseFilters.includes(key)).map(([key,val]) => val);
    const sumSegments = Object.values(segmentParse).reduce(add);
    const sum = segmentFilteredParse.length > 0 ? segmentFilteredParse.reduce(add) : 0;
    const segments = Object.entries(segmentParse).map(([key,val], idx, segs) => {
      return {phase: key, percent: (val/sumSegments)*100};
    })

    const allTags = molecule.trials.map((trial) => trial['specific cancers'].map((cancer) => cancer.title)).flatten().filter(uniq).map((cancerType) => {
      const keyMap = {
        'Early Development': 'childhood',
        'Breast Cancer': 'breast',
        'Melanoma': 'colon',
        'NSCLC': 'childhood',
        'SCLC': 'childhood',
        'Sarcoma': 'sarcoma',
        'Pancreatic Cancer': 'gentiourinary',
        'Squamous NSCLC': 'lung',
        'Ovarian Cancer': 'ovaries',
      }
      return keyMap[cancerType];
    }).filter(uniq);

    const tags = allTags.filter((tag) => tag !== undefined);

    return (
      <Container>
        <LinkComponenet molecule={molecule}>
          <StyledDoughnutChart phaseFilters={phaseFilters} 
            header={molecule.title}
            subhead={molecule.identifier}
            tags={tags}
            trialCount={sum}
            segments={segments} />
        </LinkComponenet>
      </Container>
    );
  }
}

export default MoleculeBlock;
