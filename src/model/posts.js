import Hoverboard from 'hoverboard';
import $ from 'jquery';

const store = Hoverboard({
	andrea: function (state,id) {
		console.log('haa',state)
		console.log('haa1',id)
	},
	load: function (state, params) {
	    // getDataFromAPI(params, function (error, data) {
	    //     store.done(error, data);
	    // });
	    return { isLoading: true, error: null, data: null };
	},
  set: (state=[], posts) => posts
});

// load posts via ajax
$.get('/admin/api/posts', posts => store.set(posts));

store.load();

export default store;
