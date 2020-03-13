import React, { Component } from 'react'
import { Transition, Trail } from 'react-spring/renderprops'
import LanguageSwitcher from './LanguageSwitcher'
import menu from '../menu.png'

class ResponsiveMenu extends Component {
  state = {
    expand: false
  }

  handleButton = () => {
    this.setState(prevState => ({ expand: !prevState.expand }));
  };

  render() {
    let { items, locale } = this.props;
    let { expand } = this.state;

    console.log(expand)
    return (
      <div className="menu-language">
        <div className="d-flex">
          <LanguageSwitcher language={locale} />
          <div className="menu" onClick={this.handleButton}>
            <img src={menu} alt="menu" />
          </div>
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
          className="responsive-menu"
        >
          {item =>
            item &&
            (props => (
              <div style={props} className="responsive-dropdown-menu">
                <Trail
                  // unique
                  // reset
                  items={items}
                  keys={Object.values(items).map(item => item.key)}
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                >
                  {(trailItem, key) => trailProps => (
                    <div style={trailProps} className="responsive-dropdown-item btn m-2" onClick={this.handleButton}>
                      {trailItem}
                    </div>
                  )}
                </Trail>
              </div>
            ))
          }
        </Transition>
      </div>
    );
  }
}

export default ResponsiveMenu;
