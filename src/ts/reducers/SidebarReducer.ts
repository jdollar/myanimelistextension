'use strict'
interface state {
  open: boolean
}

const initialState = { open: false }

const sidebarReducer = function(state: state, action: any){
    switch(action.type) {
      case 'TOGGLE_SIDEBAR':
        return { open: !state.open }
    }

    return initialState
  }

export default sidebarReducer
