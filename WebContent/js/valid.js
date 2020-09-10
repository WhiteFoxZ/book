/*
 * Description		: This functions check validity of value.
 * Programmer		: Kim Dong-kyu (superkdk)
 * Last Modified	: 2003.02.26
 */

/*
 * Description		: This function checks whether the character of 'str' exists in valid.
 * Parameter		: type - 0(default) : all string is in valid(true)
 *					         1 : a string is in valid(true)
 * Last Modified	: 2002/09/05
 */
function check_valid(str, valid, type) {
	var flag, ch;

	if(type == 1) flag = 0;
	else flag = 1;

	for(var i = 0; i < str.length; i++) {
		ch = "" + str.substring(i, i+1);

		if(type == 1) {
			if(valid.indexOf(ch) != -1) flag = 1;	/* valid */
			if(flag) break;
		} else {
			if(valid.indexOf(ch) == -1) flag = 0;	/* not valid */
			if(!flag) break;
		}
	}

	return flag;
}

/*
 * Description		: This function checks whether 'str' is number.
 * Last Modified	: 2002/08/02
 */
function check_number(str, type) {
	var valid = "0123456789";
	return check_valid(str, valid, type);
}

function check_upper(str, type) {
	var valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return check_valid(str, valid, type);
}

function check_lower(str, type) {
	var valid = "abcdefghijklmnopqrstuvwxyz";
	return check_valid(str, valid, type);
}

function check_korean(str, type) {
	var flag;

	if(type == 1) flag = 0;
	else flag = 1;

	for(var i = 0; i < str.length; i++) {
		if(type == 1) {
			if(str.charCodeAt(i) > 128) flag = 1;
			if(flag) break;
		} else {
			if(str.charCodeAt(i) <= 128) flag = 0;
			if(!flag) break;
		}
	}

	return flag;
}

function check_blank(str, type) {
	var valid = " ";
	return check_valid(str, valid, type);
}

function check_symbol(str, type) {
	var valid = "~`!@#$%^&*()-_+=|\\{}[]:;\"'<>,.?/";
	return check_valid(str, valid, type);
}

/*
 * Description		: This function checks whether 'str' is email format.
 * Last Modified	: 2002/08/02
 */
function check_email(str) {
	if(str == "") return false;

	var regex = /[-!#$%&'*+/^_~{}|0-9a-zA-Z]+(.[-!#$%&'*+/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+/^_~{}|0-9a-zA-Z]+(.[-!#$%&'*+/^_~{}|0-9a-zA-Z]+)*/;
	//var regex = /^(\w+(?:\.\w+)*)@((?:\w+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if(regex.test(str)) return true;
	else return false;
}

/*
 * Description		: This function checks 주민등록번호(ssn). The parameter
 *					  'str' is 13 figure number. (XXXXXX-XXXXXXX, excluding '-')
 * Last Modified	: 2002/09/03
 */
function check_jumin(str) {
	IDtot = 0;
	IDAdd = "234567892345";

	for(var i=0; i <= 11; i++)
		IDtot += str.charAt(i)*IDAdd.charAt(i);

	IDtot = 11 - (IDtot % 11);

	if(str.charAt(str.length-1) == (IDtot % 10)) return true;
	else return false;
}

/*
 * Description		: This function checks whether 'obj' is empty.
 * Last Modified	: 2003.02.26
 */
function check_empty(obj, msg) {
	if(obj.value == "") {
		alert(msg);
		obj.focus();
		return false;
	}

	return true;
}