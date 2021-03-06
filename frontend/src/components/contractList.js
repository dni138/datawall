import React, { Component } from 'react';
import ContractListItem from './contractListItem'
import SideBar from './sideBar.js'

class ContractList extends Component {
  constructor(props){
    super(props);
    this.state = {
        contracts:props.contracts
    }
  }
  render() {
    const contractList = this.state.contracts.map(((contract, i) => {
      return (
        <ContractListItem 
          contractInfo = {contract}
          onDetailSelected = {this.props.onDetailSelected}
          key = {i}/>
      );
    }));
    return (
      <div style = {{marginTop: "20px", 
                     backgroundColor: "light gray"}}>
        {contractList}
      </div>
    );
  }
}

export default ContractList;
