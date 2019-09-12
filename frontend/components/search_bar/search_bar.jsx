import React from 'react';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "12",
      party_size: 2,
      city: "San Francisco",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllCities();
  }

  generateTimeOptions() {
    const timeOptions = [];
    for (let i = 9; i < 21; i++) {
      timeOptions.push(i);
    };
    let val;
    return timeOptions.map((opt, i) => {
      if (opt < 12) {
        val = opt + ":00 AM";
      } else if (opt === 12) {
        val = opt + ":00 PM";
      } else {
        val = (opt % 12) + ":00 PM";
      }
      return <option 
        className="select items" 
        key={i} 
        value={`${opt}`}
        >{val}
      </option>
    })
  }

  generatePartyOptions() {
    const partyOptions = [];
    for (let i = 1; i < 21; i++) {
      partyOptions.push(i);
    };
    let val;
    return partyOptions.map((opt, i) =>{
      if (opt === 1) { val = `${opt} person` }
      if (opt > 1) { val = `${opt} people` }
      return <option
        className="select items"
        key={i}
        value={`${opt}`}
      >{val}
      </option>
    })
  }

  generateCityOptions() {
    return this.props.cities.map((city, i) =>
      <option
        className="select items"
        key={i}
        value={city[0]}
      >{city[0] + " ," + city[1]}
      </option>
    )
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchKitchens(this.state)
      .then(kitchens => console.log(kitchens))
  }

  render() {
    return (
      <div className="search bar">
        <form onSubmit={this.handleSubmit}>
          <div className="date-time-party selector container"> 
            <input
            className="date selector" 
            type="date"
            value={this.state.date}
            onChange={this.handleChange("date")}
            />

            <select
            className="time selector"
            value={this.state.time}
            onChange={this.handleChange("time")}
            >
              { this.generateTimeOptions() }
            </select>

            <select
            className="party-size selector"
            value={this.state.party_size}
            onChange={this.handleChange("party_size")}
            >
              { this.generatePartyOptions() }
            </select>
          </div>

          <select
            className="city selector"
            value={this.state.city}
            onChange={this.handleChange("city")}
          >
            {this.generateCityOptions() }
          </select>

          <button type="submit" className="main medium button">Search</button>
        </form>
      </div>
    )
  }
};

export default SearchBar;

