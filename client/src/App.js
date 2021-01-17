import './App.css';
import Customer from './components/Customer';

import React from 'react';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
root:{
   width: '100%',
   marginTop: theme.spacing.unit*3,
   overflowX:'auto'
},
table:{
  minWidth:1080
}
});
//고객 데이터를 서버에 접속해서 가져올 수 있어야 함.
//비동기적으로 값을 가져오기 때문에 처음에 웹 서비스 구동된 상태에서는 customer가 비어있음.
//this.state.customers가 true값일 때만
class App extends React.Component{
  //변경할 수 있는 데이터
  state={
      customers:''
  }
  //모든 컴포넌트가 마운트가 완료되었을 때 실행되는 것
  // 이곳에서 api를 불러와야 함.
  componentDidMount(){
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
  }
  callApi = async()=>{
    //접속하고자 하는 api 주소(/api/customers)를 response에 넣는다.
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  //props는 변경 불가한 데이터
  render(){
    const {classes}=this.props;
      return (
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {this.state.customers? 
      this.state.customers.map(c=>{
        return(<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> )
      })  : ''}  
      </TableBody>
      </Table>
     
    </Paper>
      );
  }
}


export default withStyles(styles)(App);
