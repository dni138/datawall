import React, { Component } from 'react';
import axios from './axios';
import ContractList from './components/contractList';
import SideBar from './components/sideBar';
import CreateContract from './components/createContract';
import SettingsPage from './components/settingsPage';
import ContractDetail from './components/contractDetail';
import NavBar from './components/navBar';
import { Grid, Row, Col } from "react-bootstrap";
class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        // MyContract, Explore, Settings, Create, MyDetail, ExploreDetail
        contentState: undefined,
        myContracts: undefined,
        globalContracts: undefined,
        contractDetail: undefined
    }
  }
  componentDidMount(){
    let myContracts = undefined;
    let globalContracts = undefined;
    axios.get(`company/jpm/contracts`)
    .then(res => {
        myContracts = res.data.contracts;
        // console.log(myContracts);
        axios.get(`contract/all`)
        .then(res => {
            globalContracts = res.data.contracts;
            this.setState({ myContracts:myContracts, globalContracts:globalContracts });
        });
    });
  }
  onContentChange = (content) => {
      console.log("switching to content " + content);
      this.setState({contentState:content});
  }

  onDetailSelected = (contractName) => {
    console.log("detail selected", contractName);
    var selectedContract = undefined;
    for (var i = 0; i < this.state.globalContracts.length; i++) {
      if (contractName === this.state.globalContracts[i].name) {
        selectedContract = this.state.globalContracts[i];
        break;
      }
    }
    console.log("found contract: ", selectedContract);
    if (this.state.contentState === "MyContract") {
      this.setState({contentState : "MyDetail", contractDetail:selectedContract});
    } else if (this.state.contentState == "Explore") {
      this.setState({contentState : "ExploreDetail", contractDetail:selectedContract})
    }
  }
  render() {
    let displayContent = undefined;
    console.log("[render] current content is ", this.state.contentState);
    if (this.state.contentState === "MyContract") {
      displayContent = <ContractList 
                            contracts = {this.state.myContracts}
                            onDetailSelected = {this.onDetailSelected}
                          />;
    } else if (this.state.contentState === "Explore"){
      console.log(this.state.globalContracts);
      displayContent = <ContractList 
                           contracts = {this.state.globalContracts}
                           onDetailSelected = {this.onDetailSelected} 
                          />;
      // displayContent = <p>This is display</p>
    } else if (this.state.contentState === "Create") {
      displayContent = <CreateContract />;
    } else if (this.state.contentState === "Settings") {
      displayContent = <SettingsPage />;
    } else if (this.state.contentState === "MyDetail") {
      console.log("showing details of ", this.state.contractDetail);
      displayContent = <ContractDetail 
                        membership = {true}
                        contractInfo = {this.state.contractDetail}
                        />
    } else if (this.state.contentState === "ExploreDetail") {
      console.log("showing details of ", this.state.contractDetail);
      displayContent = <ContractDetail 
                        membership = {false}
                        contractInfo = {this.state.contractDetail}
                        />
    }else {
      displayContent = undefined;
    }
    console.log(displayContent);
    return (
      <Grid style = {{padding: 0, margin: 0, width : "100%", height: "100%"}}>
        <Row className="show-grid">
         <NavBar/>
        </Row>
        <Row className="show-grid" STYLE = {{height: "100%"}}>
          <Col xs={6} lg={3}>
          <SideBar onContentSelected = {this.onContentChange}/>
          </Col>
          <Col xs={6} lg={9}>
            <div>
              {displayContent}
            </div>
          </Col>
        </Row>
      </Grid>
      // <div className ="tight" style = {{height:"100%"}}>
      //   <NavBar />
      //   <div className = "tight" style = {{height:"100%"}}>
      //     <div className="row tight">
      //       <div className = "col-lg-3" style={{backgroundColor: "#FF0000"}}>
      //         <SideBar onContentSelected = {this.onContentChange}/>
      //       </div>
      //       <div className = "col-lg-9" style={{backgroundColor: "black"}}>
      //          {displayContent}
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default HomePage;