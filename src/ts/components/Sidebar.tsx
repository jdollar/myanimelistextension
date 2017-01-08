'use strict'
import {PropTypes} from 'react'
import * as React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from './../actions'

interface SidebarProps extends React.Props<any> {
  open: boolean
}

class SidebarComponent extends React.Component<SidebarProps, void> {
  divStyle = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '30%',
    height: '100%',
    background: 'white',
    zIndex: 999999
  }

  getClassName(open: boolean): string {
    if (open) {
      return "anime-list-sidebar"
    }

    return "anime-list-sidebar hidden"
  }

  render():any {
    const { open } = this.props

    return <div id="animeListSidebar" className={this.getClassName(open)} style={this.divStyle}>
      <h1>Hello</h1>
      World
    </div>
  }
}

const mapStateToProps = (state: any): any => {
  return {
    open: state.open
  }
}

// const mapDispatchToProps = (dispatch: any): any => {
//   return {
//     toggleClick: (open: boolean) => {
//       dispatch(toggleSidebar(open))
//     }
//   }
// }

const Sidebar = connect(
  mapStateToProps,
)(SidebarComponent)

export default Sidebar
