'use strict'
import {createStore} from 'redux'
import {reducer} from './../reducers'

export const configureStore = function(): any {
  return createStore(reducer)
}
