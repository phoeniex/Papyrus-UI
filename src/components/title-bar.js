import React, { Component } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const {app} = window.require('electron').remote;

class TitleBar extends Component {
  constructor() {
    super();
    this.state = {
        brandSuggestions: null
    };
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
      <div className="title-bar p-grid p-justify-between">
        <div className="p-col-fixed title-logo-col">
          <div className="title-logo">PAPYRUS</div>
          <div className="title-version">V {app.getVersion()}</div>
        </div>
        <div className="p-col title-project-col ">V 1.0.0</div>
        <div className="p-col-fixed title-search-col">
          <AutoComplete
            value={this.state.brand}
            onChange={(e) => this.setState({brand: e.value})}
            suggestions={this.state.brandSuggestions}
            completeMethod={this.suggestBrands.bind(this)} />
        </div>
      </div>
    )
  }
}

export default TitleBar;
