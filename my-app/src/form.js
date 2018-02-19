import React, { Component } from 'react';
import * as R from "ramda";
import {cities} from './api/cities.js';
const groupByFirstLetter = R.groupBy(R.head,cities);

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      cities:[],
      groupByFirstLetter: groupByFirstLetter,
      isExist: true,
      step:"me"
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkName = this.checkName.bind(this);
    this.compStep = this.compStep.bind(this);
    this.finish = this.finish.bind(this);
  }
  handleChange(e){
    const  value = e.target.value;
    this.setState({value: value});

  }
  checkName(){
    this.setState({value:''});
    const currCity = this.state.value[0].toUpperCase() + this.state.value.toLowerCase().slice(1);
    const currCitiesArr = this.state.cities;
    const firstLetter = currCity[0].toUpperCase();
    const groupObj = this.state.groupByFirstLetter;
    let firstLetterCheck = null;
    if (firstLetter in groupObj) {firstLetterCheck = true}
    else {firstLetterCheck = false};
    if (!currCitiesArr.length && firstLetterCheck) {
      const cityFromGroup = groupObj[firstLetter].find(city=>city==currCity);
      if (cityFromGroup) {
        this.setState({cities: R.append(currCity,this.state.cities)}, this.props.updateData(this.state.cities));
        this.setState({isExist:true});
        let cityIndex = groupObj[firstLetter].indexOf(currCity);
        groupObj[firstLetter].splice(cityIndex,1);
      }  else { this.setState({isExist:false});
                this.setState({value:''});
              }
    } else if (!firstLetterCheck){ this.setState({isExist:false})}
      else {
      const lastCity = currCitiesArr[currCitiesArr.length-1];
      let lastSymb = null;
      (lastCity[lastCity.length-1]!=='ь')?(lastSymb=lastCity[lastCity.length-1].toUpperCase()):(lastSymb=lastCity[lastCity.length-2].toUpperCase());
      if (firstLetter===lastSymb) {
        const cityFromGroup = groupObj[firstLetter].find(city=>city==currCity);
        if (cityFromGroup) {
          this.setState({cities: R.append(currCity,this.state.cities)}, this.props.updateData(this.state.cities));
          this.setState({isExist:true});
          let cityIndex = groupObj[firstLetter].indexOf(currCity);
          groupObj[firstLetter].splice(cityIndex,1);
        }  else { this.setState({isExist:false});
                  this.setState({value:''});
                }
      } else {
         this.setState({isExist:false});
      }
    }

  }
  compStep(){
    this.setState({step:'comp'});
    const groupObj = this.state.groupByFirstLetter;
    const citiesArr = this.state.cities;
    const lastCity = citiesArr[citiesArr.length-1];
    let lastSymb = null;
    (lastCity[lastCity.length-1]!=='ь')?(lastSymb=lastCity[lastCity.length-1].toUpperCase()):(lastSymb=lastCity[lastCity.length-2].toUpperCase());
    const cityFromGroup = groupObj[lastSymb].splice(0,1);
    this.setState({cities: R.append(cityFromGroup[0] , this.state.cities)}, this.props.updateData(this.state.cities));
    setTimeout(()=>this.setState({step:'me'}), 1000);
    this.setState({value:''});
  }
    finish(){
      this.setState({step:'finish'});
   }
  render(){
    const currState = this.state.cities;
    const isExist = this.state.isExist;
    let title = null;
    if (currState&&isExist) {title = <h1>Выбран город : {currState[currState.length-1]} </h1>}
    else if (!isExist) {
      title = <h1>Нет такого города или город уже выбран.<br/>Попробуйте снова<br/>текущий город: {currState[currState.length-1]}</h1>;
    }
    else {title = <h1>Выбран город :  </h1>};
    return(
      <div>
            {  (this.state.step==='me') ?
               (<form>
                   <label className='main-input'>
                      Назовите город на русском языке:
                      <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="button" value="выбрать"  onClick={this.checkName} />
                      {title}
                      <input type="button" value="ход окончен" className="btn btn-primary" onClick={this.compStep} />
                      <input type="button" value="Сдаюсь" className="btn btn-danger" onClick={this.finish} />
                </form> ): (this.state.step==='comp') ?
                  (<h1>Ход компьютера...</h1>) : (this.state.step==='finish') ?
                  (
                    <div className="loose">
                      <h1>Ты проиграл</h1>
                      <ul className="list-group"> В игре были использованы города:
                        {this.state.cities.map(city=><li className="list-group-item">{city}</li>)}
                      </ul>
                    </div>
                  ) : <h1>Произошла неполадка...</h1>
            }
      </div>
    );
  }
}
