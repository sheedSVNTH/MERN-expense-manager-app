import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Add from './Add';
import Update from './Update';
import Delete from './Delete';

import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';

import '../css/App.css';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedMonth: 'All',
			selectedYear: 2018,
			data: [],
			activeTab: 2018
					 };
		this.getData = this.getData.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
		
		componentWillReceiveProps(nextProps) {
			if(nextProps.history.location.search) {
				var search = nextProps.history.location.search;
				search = search.substring(1);
				var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
				this.setState({activeTab: parseInt(searchObj.year)});
    			this.setState({selectedYear: searchObj.year});
				this.setState({selectedMonth: searchObj.month});
				this.getData(this, searchObj.year, searchObj.month);
			} else {
			this.getData(this, 2018, 'All');
			}
		}
	
		componentDidMount(){
			this.getData(this, 2018, 'All');
		}

		handleSelect(selectedTab) {
		 this.setState({
		   activeTab: selectedTab,
		   selectedYear: selectedTab
		 });
	  	}
			getData(ev, year, month){
			axios.get('/getAll?month='+month+'&year='+year)
			.then(function(response) {
				ev.setState({data: response.data});
				ev.setState({selectedYear: parseInt(year)});
				ev.setState({selectedMonth: month});
			});
		}
	
	
	render() {
		return (
		  <div>
			<Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
			  <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}><MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth}/></Tab>
			  <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth}/></Tab>
			  <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth}/></Tab>
			  <Tab eventKey={2021} title={<YearTabsRouter year='2021' />}><MonthTabs year='2021' monthlyActiveTab={this.state.selectedMonth}/></Tab>
			  <Tab eventKey={2022} title={<YearTabsRouter year='2022' />}><MonthTabs year='2022' monthlyActiveTab={this.state.selectedMonth}/></Tab>
        	</Tabs>
			<Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
			<table>
			  <thead>
				<tr><th></th><th className='desc-col'>DESCRIPTION</th><th className='button-col'>AMOUNT</th><th className='button-col'>MONTH</th><th className='button-col'>YEAR</th><th className='button-col'>UPDATE</th>
				<th className='button-col'>DELETE</th></tr>
			  </thead>
			  <tbody>
				{
			this.state.data.map(function(exp){
			return  <tr><td className='counterCell'></td><td className='desc-col'>{exp.description}</td><td className='button-col'>{exp.amount}</td><td className='button-col'>{exp.month}</td><td className='button-col'>{exp.year}</td><td className='button-col'><Update expense={exp} /></td><td className='button-col'><Delete id={exp._id} expense={exp} /></td></tr>
				})
				}
			</tbody>
			</table>
		  </div>
    );
  }
}