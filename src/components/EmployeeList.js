import React, { Component } from "react";
import { connect } from "react-redux";
import {ListView} from'depricated-react-native-listview'
import { employeesFetch } from "../actions";
import _ from 'lodash';
import ListItem from './Listitem'
class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component
    // will be rendered with
    //this.props is still the old set of props
  }
  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(employees);
  }
  renderRow(employee){
    return <ListItem employee={employee}/>
  }
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}

      />
        
      
    );
  }
}
const mapStateToProps = (state) => {
  //conversion from object to array
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};
export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
