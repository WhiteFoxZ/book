/*******************************************************************************
	Description		: commonly used function
	Programmer		: Kim Dong-kyu (superkdk)
	Last Modified	: 2003.12.29
*******************************************************************************/
/*
 * Select object
 */
// initialize select object.
function init_select(el, value) {
	var obj = (typeof el == 'string' ? document.getElementById(el) : el);
	if(!obj) return;

	for(i = 0; i < obj.options.length; i++) {
		if(obj.options[i].value == value)
			obj.selectedIndex = i;
	}
}

// sort select object.
function select_sort(obj) {
	var htable = new Array();
	var text, value;
	var i;

	// make hash table.
	for(i = 0; i < obj.options.length; i++) {
		text = obj.options[i].text;
		value = obj.options[i].value;
		htable[text] = value;
	}

	// sort hash table.
	var keys = hash_sort(htable);

	// init. select.
	for(i = obj.options.length - 1; i >= 0; i--)
		obj.options[i] = null;

	for(i = 0; i < keys.length; i++)
		obj.options[i] = new Option(keys[i], htable[keys[i]]);
}

function hash_sort(htable, reverse) {
	var keys = new Array();

	// get key array from hash table.
	for(key in htable) {
		keys[keys.length] = key;
	}

	// sort key array.
	keys.sort();
	if(reverse == 1) keys.reverse();

	return keys;
}

/*
 * Radio object
 */
// initialize radio object.
function init_radio(obj, idx) {
	if(!obj) return;
	obj[idx].checked = true;
}