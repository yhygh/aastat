console.log('hello from test!');
// alert('hello');

var sideDrawerOpen = false;

const backdrop = document.querySelector('#backdrop');
const sideDrawer = document.querySelector('#side-drawer'); 
const drawerToggleContainer = document.querySelector('#drawer-toggle-container');

backdrop.addEventListener('click', function() {
	sideDrawerOpen = false;

    // hide backdrop
    backdrop.classList.remove('open');
    // hide side drawer
	sideDrawer.classList.remove('open');
})

drawerToggleContainer.addEventListener('click', function() {
	sideDrawerOpen = !sideDrawerOpen;
	if (sideDrawerOpen) {
		sideDrawer.classList.add('open');
        backdrop.classList.add('open');
	} else {
    	backdrop.classList.remove('open');
		sideDrawer.classList.remove('open');
	}
})
