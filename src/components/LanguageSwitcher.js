import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Transition, Trail } from 'react-spring/renderprops'
import hr from '../hr.png'
import gb from '../gb.png'

const Language = () => (
  <div>
    {' '}
    /{' '}

  </div>
)

class LanguageSwitcher extends Component {
  container = React.createRef();
  state = {
    expand: false,
  }

  handleButton = () => {
    this.setState(prevState => ({ expand: !prevState.expand }));
  };

  render() {
    let { language, footer } = this.props;
    let { expand } = this.state;
    let show = language === "hr" ? <img src={hr} alt="hr" /> : <img src={gb} alt="en" />;
    let dropdownStyle = footer === undefined ? "dropdown-menu" : "dropdown-menu-footer";

    console.log(footer)

    const menuItems = [
      (<Link className="btn" hrefLang="hr" to="/" key="hr" onClick={this.handleButton}>HR</Link>),
      (<Link className="btn" hrefLang="en-gb" to="/en/" key="en" onClick={this.handleButton}>EN</Link>)
    ];
    return (
      <div>
        <div className="btn country-switcher" onClick={this.handleButton}>
          {show}
        </div>
        <Transition
          unique
          reset
          items={expand}
          from={{
            opacity: 0,
            height: 0,
            transform: 'translateY(-10%)',
          }}
          enter={{
            opacity: 1,
            height: 'auto',
            transform: 'translate(0%)',
          }}
          leave={{ opacity: 0 }}
          className="dropdown"
        >
          {item =>
            item &&
            (props => (
              <div style={props} className={dropdownStyle}>
                <Trail
                  // unique
                  // reset
                  items={menuItems}
                  keys={Object.values(menuItems).map(item => item.key)}
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                >
                  {(trailItem, key) => trailProps => (
                    <div style={trailProps} className="dropdown-item">
                      {trailItem}
                    </div>
                  )}
                </Trail>
              </div>
            ))
          }
        </Transition>
      </div>
    )
  }
}

export default LanguageSwitcher;
