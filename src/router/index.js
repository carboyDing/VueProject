import Vue from 'vue'
import Router from 'vue-router'
import {MainRouter} from './router'

Vue.use(Router)
const router = {
	routes: MainRouter
}

export default new Router(router)
