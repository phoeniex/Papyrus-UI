import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchInputField from './search-input-field';
import IconButton from '@material-ui/core/IconButton';
import EditRounded from '@material-ui/icons/EditRounded';

const {app} = window.require('electron').remote;

class TitleBar extends Component {
  constructor() {
    super();
    this.state = {
        brandSuggestions: null
    };
    this.projectName = 'Digital Travel US';
    this.projectLogoImageLocation = require('./../images/icon-project-default.png');
    this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
  }

  suggestBrands(event) {
      let results = this.brands.filter((brand) => {
          return brand.toLowerCase().startsWith(event.query.toLowerCase());
      });
      this.setState({ brandSuggestions: results });
  }

  render() {
    return (
      <Grid container className='title-bar' direction="row" justify="space-between" alignItems="center">
        <Grid item className='title-logo-col'>
          <div className='title-logo' id='title-logo'>PAPYRUS</div>
          <div className="title-version" id="title-version">V {app.getVersion()}</div>
        </Grid>
        <Grid item className='title-project-col'>
          <img className='title-project-icon' id='title-project-icon' src={this.projectLogoImageLocation} alt="Project Logo" />
          <span className='title-project-name' id='title-project-name'>{this.projectName}</span>
          <IconButton size='small'>
            <EditRounded fontSize='small' htmlColor='#FCFCFC' />
          </IconButton>
        </Grid>
        <Grid item className="title-search-col">
          <SearchInputField defaultValue="Search For Screen or String" id="titile-search-input" />
        </Grid>
      </Grid>
    )
  }
}

export default TitleBar;
