// Babel has deprecated @babel/polyfill, and the following two imports are used for polyfills instead.
import m from 'mithril';
import { MainView } from './MainView';

var footer = {
	view:function(){
		
	}
}

var App = {
	view : function(){
		return m("",
					m("nav",m(".nav-wrapper"
				  			,m("span.brand-logo center","Todo app")
				  		)
				  	),
					m(".container p-3 mt-3",
					m(MainView),
				  ),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
				  	m("br"),
					m("footer.page-footer",
						m(".footer-copyright",
							m(".container",
								"© copyright 2021")))
				)
	}
}



m.mount(document.body,App);
