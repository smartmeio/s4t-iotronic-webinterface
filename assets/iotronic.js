/**
 * Copyright 2017-2019 Carmelo Romeo (carmelo.romeo85@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

token_or_log = "";


function uuid(){
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generate_uuid(input_id){
	var id = (uuid() + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + uuid() + uuid());//.toUpperCase();
	//$('#registration_name').val(id);
	$('#'+input_id).val(id);
}

function convert_date(date) {

	var date = date; //new Date();
	var aaaa = date.getFullYear();
	var gg = date.getDate();
	var mm = (date.getMonth() + 1);

	if (gg < 10) gg = "0" + gg;
	if (mm < 10) mm = "0" + mm;
	var cur_day = aaaa + "-" + mm + "-" + gg;

	var hours = date.getHours()
	var minutes = date.getMinutes()
	var seconds = date.getSeconds();

	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	return cur_day + " " + hours + ":" + minutes + ":" + seconds;
}

function compare_dates(a, b){
	var a = new Date(a)
	var b = new Date(b)

	if(a.getTime() > b.getTime()) return false
	else return true
}

function verify_new_version(new_version, old_version){
	var array_old = old_version.split('.');
	var array_new = new_version.split('.');

	if(array_new.length != 3 || old_version == new_version){
		return false;
	}
	else{
		var array_pos = [];
		for(var i=0; i<array_new.length; i++){
			if( parseInt(array_new[i]) > parseInt(array_old[i]) )
				array_pos[i] = "true";
			else if( parseInt(array_new[i]) == parseInt(array_old[i]) )
				array_pos[i] = "equal";
			else
				array_pos[i] = "false";
		}
		//console.log(array_pos);
		if(array_pos[0] == "true") return true;
		else if(array_pos[0] == "equal"){
			if(array_pos[1] == "true") return true;
			else if(array_pos[1] == "equal"){
				if(array_pos[2] == "true") return true;
				else return false; //example: OLD: 1.2.3 --> NEW: 1.2.0
			}
			else return false; //example: OLD: 1.2.3 --> NEW: 1.0.3
		}
		else
			return false; //example: OLD: 1.2.3 --> NEW: 0.2.3
	}
}


function verify_boardslist_uniformity(list, field_to_check){
	var value = list[0][field_to_check];

	for(var i=0; i<list.length; i++){
		if(list[i].distro != value){
			value = false;
			break;
		}
	}
	return value;
}


function compose_service_shortcut(protocol, port){
	var shortcut = "";

	//if(protocol == "HTTP") shortcut = "http://"+wstun_ip+":"+port;
	if(protocol == "HTTP") shortcut = '<a href="http://'+wstun_ip+':'+port+'" target="_blank">http://'+wstun_ip+':'+port+'</a>';
	else if(protocol == "HTTPS") shortcut = '<a href="https://'+wstun_ip+':'+port+'" target="_blank">https://'+wstun_ip+':'+port+'</a>';
	else if(protocol == "MQTT") shortcut = 'mosquitto_sub -t "#" -h '+wstun_ip+' -p '+port;
	else if(protocol == "SSH") shortcut = "ssh -p "+port+" root@"+wstun_ip;

	return shortcut;
}



$('input[name="email"]').blur(function () {
	//console.log("BLUR");
	var email = $(this).val();

	//How to get closest button starting from the actual modal
	var modal = $(this).closest('.reveal-modal');
	var button = $('div[id="'+modal[0].id+'"] button:first');
	var button_id = button[0].id;
	//console.log(button_id);
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
	if (re.test(email)) {
		$('.msg').hide();
		$('.success').show();
		$('#'+button_id).show();
	}
	else {
		$('.msg').hide();
		$('.error').show();
		$('#'+button_id).hide();
	}
});


function SortByLabel(x,y) {
	return ((x.label == y.label) ? 0 : ((x.label > y.label) ? 1 : -1 ));
}

function SortByStatus(x,y) {
	return ((x.status == y.status) ? 0 : ((x.status > y.status) ? 1 : -1 ));
}

function SortByModel(x,y) {
	return ((x.model == y.model) ? 0 : ((x.model > y.model) ? 1 : -1 ));
}

function SortByUsername(x,y) {
	return ((x.username == y.username) ? 0 : ((x.username > y.username) ? 1 : -1 ));
}

function SortByName(x,y) {
	return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
}

function SortByType(x,y) {
	return ((x.type == y.type) ? 0 : ((x.type > y.type) ? 1 : -1 ));
}

function SortByVlanName(x,y) {
	return ((x.vlan_name == y.vlan_name) ? 0 : ((x.vlan_name > y.vlan_name) ? 1 : -1 ));
}

function SortByTimestamp(x,y) {
	return ((x.timestamp == y.timestamp) ? 0 : ((x.timestamp > y.timestamp) ? 1 : -1 ));
}

//CUSTOMIZED
//-------------------------------------------------------------------------------------------
function SortBySensPos(x,y) {
	return ((x.sens_pos == y.sens_pos) ? 0 : ((x.sens_pos > y.sens_pos) ? 1 : -1 ));

}
function SortByLast(x,y) {
	return ((x.last == y.last) ? 0 : ((x.last < y.last) ? 1 : -1 ));
}
function SortByOldest(x,y) {
	return ((x.last == y.last) ? 0 : ((x.last > y.last) ? 1 : -1 ));
}
//-------------------------------------------------------------------------------------------

function getCookie(cname) {
	var name = cname + "=";
	var cookies = document.cookie.split(';');
	//console.log(cookies);

	for(var i=0; i<cookies.length; i++){
		//remove space at the beginning of the string
		//cookies[i] = cookies[i].replace(/\s/g, '');  //Commented because the projects_list returned a list removing the spaces in fields! Verify if it creates problems somewhere else
		var ca = cookies[i].split(name);
		if(ca.length >1){
			//console.log(ca);
			return ca[1];
		}
	}
	/*
	for(var i=0; i<cookies.length; i++){
		var ca = cookies[i].split(name);

		if(ca.length > 1){
			var json = JSON.parse(ca[1]);
			return json;
		}
	}
	*/
}

// (useless ??)
function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=0';
}


function add_newlines_to_message(message, tobereplaced){
	var message_array = message.split(tobereplaced);
	//console.log(message_array);
	var restyled_message = '';
	for(var i=0; i<message_array.length; i++){
		restyled_message += message_array[i] + '&#13;';
	}
	return restyled_message;
}


function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function loading(){
	var loader_pathfile = site_url+"uploads/ajax-loader.gif";
	//document.getElementById('loading_bar').style.visibility='visible';
	document.getElementById('loading_bar').style.width='100%';
	document.getElementById('loading_bar').style.height='100%';
	document.getElementById('loading_bar').style.position='fixed';//'absolute';//'fixed';
	document.getElementById('loading_bar').style.top='0';
	document.getElementById('loading_bar').style.left='0';
	document.getElementById('loading_bar').style.zIndex='9999';
	document.getElementById('loading_bar').style.background="url('"+loader_pathfile+"') no-repeat center center rgba(0,0,0,0.25)";
	//setTimeout(function(){document.getElementById('loading_bar').style.visibility='hidden';},3000);
}


//TO BE FIXED
function loading_to_fix(){
	loading();
	document.getElementById('loading_bar').style.visibility='visible';
}


//This function returns a string (or a json) with ONLY the selected fields from the entire message
function parse_json_fields(fields, message, string_or_json){

	if(string_or_json){
		var stringa = "";
		//console.log(message);
		if(message instanceof Array){
			message.forEach(function(c){
				Object.keys(c).forEach(function(k){
					if(fields.includes(k)){
						stringa += "<b>"+k+": </b>"+c[k]+"<br>";
					}
				});
				stringa += "<br>";
			});
			//console.log(stringa);
			return stringa;
		}
		else return message;
	}
	else{
		var json_output = [];

		if(message instanceof Array){
			message.forEach(function(c){
				elem = {};
				Object.keys(c).forEach(function(k){
					if(fields.includes(k)){
						elem[k] = c[k];
					}
				});
				json_output.push(elem);
			});
			//console.log(json_output);
			//return '<pre>'+JSON.stringify(json_output,null,"\t")+'</pre>';
			return json_output;
		}
		else return message;
	}
}


//Copy all options from a select to another except the one selected!
function update_boardlist(from, to){

	$("#"+to).html( $("#"+from).html() );
	var board_value = $( "#"+from+" option:selected" ).val();
	var remote_boardlist = document.getElementById(to);

	for (var i=0; i<remote_boardlist.length; i++){
		if (remote_boardlist.options[i].value == board_value ){
			remote_boardlist.remove(i);
		}
	}
}


//StartsWith !!!
if ( typeof String.prototype.startsWith != 'function' ) {
	String.prototype.startsWith = function( str ) {
		return this.substring( 0, str.length ) === str;
	}
};

//UpperCase first letter !!!
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
}

function login(){

	//Clear cookies (useless ??)
	eraseCookie("token");
	eraseCookie("default_project");

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if(username == "") alert('Missing username');
	else if(password == "") alert('Missing password');
	else{
		$.ajax({
			url: s4t_api_url+'/auth',
			type: 'POST',
			data: {username: username, password: password},
			timeout: 5000, // sets timeout to 5 seconds
			success: function(response){

				var minutes = response.message.expire.slice(0,-1);

				expiring_date = new Date();
				expiring_date.setMinutes(expiring_date.getMinutes() + parseInt(minutes));

				document.cookie = "token="+response.message.token+"; expires="+expiring_date+"; path=/iotronic/Admin";
				document.cookie = "default_project="+default_project+"; path=/iotronic/Admin";

				//FROM
				//window.location.href = site_url+"Admin/web_ui";

				//TO
				ajax_headers = {
					"x-auth-token": response.message.token,
					"Content-Type": "application/json"
				};
				var fields_to_show = ["name", "uuid"];

				$.ajax({
					url: s4t_api_url+"/projects",
					type: "GET",
					dataType: 'json',
					headers: ajax_headers,
					success: function(response){
						parsed_response = parse_json_fields(fields_to_show, response.message, false).sort(SortByName);
						document.cookie = "projects_list="+JSON.stringify(parsed_response)+"; path=/iotronic/Admin";

						var pr = parsed_response;
						for(var i=0; i<pr.length; i++){
							if(pr[i].name == default_project){
								document.cookie = "selected_prj="+pr[i].uuid+"; path=/iotronic/Admin";
								break;
							}
						}

						window.location.href = site_url+"Admin/web_ui";
					},
					error: function(response){
						alert("Error getting the list of project! Refresh the page!");
						window.location.href = site_url+"Admin/web_ui";
					}
				});
			},
			/*
			error: function(response){
				alert('ERROR: '+JSON.stringify(response.responseJSON.message.log));
			}
			*/
			error: function(xmlhttprequest, textstatus, message) {
				if(textstatus==="timeout") {
					alert("API are temporary unavailable!");
				} else {
					if(message == "Forbidden"){
						alert("Wrong Username and/or Password");
					}
					else{
						alert("You need to accept first the certificate exception!");
						window.open(s4t_api_url);
					}
				}
			}
		});
	}
}


function logout(){

	//Clear cookies (useless ??)
	eraseCookie("token");
	eraseCookie("default_project");

	$.ajax({
		url: site_url+'Login/logout',
		type: 'GET',
		//dataType: 'json',
		//contentType: 'application/json',
		success: function (response) {
			token_or_log = "";
			alert(response);
			window.location.href = site_url+"Login";
		},
		error: function (response) {
			console.log(response);
		}
	});
}


function verify_token_expired(rcv_message, rcv_result, flag){
	//OLD version: javascript based  (login.php)!!!
	/*
	//alert(document.cookie);

	var flag = false;
	var array_cookies = document.cookie.split("; ");
	for(i=0; i<array_cookies.length; i++){
		//console.log(array_cookies[i]);
		if(array_cookies[i].startsWith("token")){
			flag = true;
			break;
		}
	}

	if(flag== false){
		alert("Token has expired. Please login again.");
		window.location.href = "<?= $this -> config -> site_url()?>Login";
	}
	*/

	//First attempt!!!
	/*
	if(result == "ERROR"){
		alert(token_or_log);
		window.location.href = site_url+"Login";
	}
	*/

	//console.log(rcv_message+" "+rcv_result);
	if(rcv_result == "ERROR"){
		token_or_log = "";
		if(!flag){
			if(rcv_message == "Wrong Token: TokenExpiredError: jwt expired"){
				alert(rcv_message);
				window.location.href = site_url+"Login";
			}
		}
		else
			window.location.href = site_url+"Login";
	}

}

function readFile(evt) {
	//Retrieve the first (and only!) File from the FileList object
	var f = evt.target.files[0];

	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			//alert('contents: '+contents);
			//document.getElementById(evt.target.element_id).innerHTML = contents;
			$('#'+evt.target.element_id).val(contents);
		}
		r.readAsText(f);
	}
	else { alert("Failed to load file"); }
}


function show_password(input_id){
	var x = document.getElementById(input_id);
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}


function get_boardname_from_uuid(uuid){
	board_name = "";
	for(i=0;i<boards_list.length;i++){
		if(boards_list[i].board_id == uuid){
			board_name = boards_list[i].label;
			break;
		}
	}
	return board_name;
}


function get_boardinfo_from_uuid_array(uuid_array){
	var selected_boards = [];

	for(var i=0; i<uuid_array.length; i++){
		for(var j=0; j<boards_list.length; j++){
			if(boards_list[j].board_id == uuid_array[i]){
				selected_boards.push(boards_list[j]);
				break;
			}
		}
	}

	return selected_boards.reverse();
}


function refresh_lists(){
	var project_id = getCookie("selected_prj");
	//console.log(project_id);

	$('#boardlist_status').empty();

	//CUSTOMIZED....USELESS????
	//test_wiotp();

	$.ajax({
		url: s4t_api_url+"/boards?project="+project_id,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			//$('#boardlist_c').empty();
			//$('#boardlist_d').empty();

			var connected_count = 0;
			var disconnected_count = 0;
			//console.log(response);

			boards_list = response.message.sort(SortByStatus);

			connected = [];
			disconnected = [];

			for(i=0;i<boards_list.length; i++){
				if(boards_list[i].status == "C")
					connected.push(boards_list[i]);
				else if(boards_list[i].status == "D")
					disconnected.push(boards_list[i]);
			}

			//Moved outside the ajax call to avoid the duplicated visualization of boards
			//$('#boardlist_status').empty();
			
			connected = connected.sort(SortByLabel);
			disconnected = disconnected.sort(SortByLabel);

			//CUSTOMIZED
			//We have to verify that the project is 
			//---------------------------------------------------------------------------------
			var project_name = get_project_name_by_uuid(getCookie("selected_prj"));
			wiotp_projects = Object.keys(wiotp_endpoints);
			//console.log(project_name +" "+ wiotp_projects);
			update_wiotp_frontend = document.getElementById("wiotp_frontend");

			if(wiotp_projects.indexOf(project_name) == -1){
			//---------------------------------------------------------------------------------
				if(update_wiotp_frontend != null)
					update_wiotp_frontend.setAttribute('href', '');
			
				document.getElementById("boards_status").innerHTML = '<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';

				for(i=0;i<connected.length;i++){
					$('#boardlist_status').append('<li>'+
						//      '<a href="#" onclick=populate_board_info("'+connected[i].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
						'<a href="#" onclick=populate_board_info("'+connected[i].board_id+'"); data-reveal-id="modal-board-info">'+
						'<img src="'+site_url+'uploads/green-circle.png" width=20 height=20>'+
						'<span>'+connected[i].label+'</span>'+
						'</a>'+
						'</li>');
				}


				for(j=0;j<disconnected.length;j++){
					$('#boardlist_status').append('<li>'+
						//      '<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
						'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-board-info">'+
						'<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>'+
						'<span>'+disconnected[j].label+'</span>'+
						'</a>'+
						'</li>');
				}

				//Refresh markers on the map accordingly to what is retrieved from IoTronic !!!
				refresh_map();
			}


	
			//CUSTOMIZED
			//---------------------------------------------------------------------------------------------------------------
			else {
				//console.log(wiotp_endpoints[project_name]["wiotp_frontend"])
				//console.log(update_wiotp_frontend)
				if(update_wiotp_frontend != null)
					update_wiotp_frontend.setAttribute('href', wiotp_endpoints[project_name]["wiotp_frontend"]);

				var array_promise = [];
				var degradated = [];

				if(connected.length == 0){
					if(sensors_flag)
						document.getElementById("boards_status").innerHTML = '<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/yellow-circle.png" width=20 height=20><span> '+degradated.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';
					else
						document.getElementById("boards_status").innerHTML = '<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';

					for(j=0;j<disconnected.length;j++){
						$('#boardlist_status').append('<li>'+
							//      '<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
								'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-board-info">'+
									'<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>'+
									'<span>'+disconnected[j].label+'</span>'+
								'</a>'+
							'</li>');
					}
					refresh_map();
				}

				else{
					if(sensors_flag){
						for(l=0;l<connected.length;l++){
							array_promise.push(new Promise(function(resolve){
								//console.log("BOARD: "+connected[i].board_id);
								//verify_sensors_status(connected[l].board_id, resolve);
								verify_sensors_status(connected[l].board_id, connected[l].model, resolve);
							}));
						}
						Promise.all(array_promise).then(function(results){
							//console.log(results);
		
							/*
							for(i=0;i<results.length;i++){

								if(results[i] != "NO WIOTP" && results[i] != "NO ACTION"){
									for(j=0;j<connected.length;j++){
										if(connected[j].board_id == results[i]){
											degradated.push(connected[j]);
											connected.splice(j, 1);
											break;
										}
									}
								}
							}
							*/


							for(i=0;i<results.length;i++){
								//if(results[i].status != "NO WIOTP" && results[i].status != "NO ACTION"){
								//if(results[i].status == "CHECKED" || results[i].status == "NO ACTION"){
									for(j=0;j<connected.length;j++){
										if(connected[j].board_id == results[i].board_id){

											connected[j].failed = results[i].failed
											connected[j].all = results[i].all

											//if(results[i].status == "CHECKED"){
											if(results[i].status == "CHECKED" || results[i].valid == false){
												degradated.push(connected[j]);
												connected.splice(j, 1);
											}
											break
										}
									}
								//}
							}

							for(i=0;i<connected.length;i++){

								title = "All: "+connected[i].all+"\n"+"Failed: "+connected[i].failed;

								$('#boardlist_status').append('<li>' +
										'<a href="#" onclick="populate_board_info(\''+connected[i].board_id+'\', \'true\');" title="'+title+'" data-reveal-id="modal-board-info">'+
											'<img src="'+site_url+'uploads/green-circle.png" width=20 height=20>'+
										'</a>'+
										'<a href="#" onclick="populate_board_info(\''+connected[i].board_id+'\');" title="'+title+'" data-reveal-id="modal-board-info">'+
										'&nbsp;'+connected[i].label+'</a>'+
									      '</li>');
							}

							for(k=0;k<degradated.length;k++){

								title = "All: "+degradated[k].all+"\n"+"Failed: "+degradated[k].failed;

								$('#boardlist_status').append('<li>' +
										'<a href="#" onclick="populate_board_info(\''+degradated[k].board_id+'\', \'true\');" title="'+title+'" data-reveal-id="modal-board-info">'+
											'<img src="'+site_url+'uploads/yellow-circle.png" width="20" height="20" />'+
										'</a>'+
										'<a href="#" onclick="populate_board_info(\''+degradated[k].board_id+'\')"; title="'+title+'"; data-reveal-id="modal-board-info">'+
										'&nbsp;'+degradated[k].label+'</a>'+
									      '</li>');
							}

							for(j=0;j<disconnected.length;j++){
								$('#boardlist_status').append('<li>'+
									//	'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
										'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-board-info">'+
											'<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>'+
											'<span>'+disconnected[j].label+'</span>'+
										'</a>'+
									      '</li>');
							}

							document.getElementById("boards_status").innerHTML = '<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/yellow-circle.png" width=20 height=20><span> '+degradated.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';

							//refresh_map();

						}); //close Promise.ALL
					}
					else{
						for(i=0;i<connected.length;i++){

							$('#boardlist_status').append('<li>' +
								'<a href="#" onclick="populate_board_info(\''+connected[i].board_id+'\', \'true\');" data-reveal-id="modal-board-info">'+
									'<img src="'+site_url+'uploads/green-circle.png" width=20 height=20>'+
								'</a>'+
								'<a href="#" onclick="populate_board_info(\''+connected[i].board_id+'\');" data-reveal-id="modal-board-info">'+'&nbsp;'+connected[i].label+'</a>'+
							      '</li>');
						}

						for(j=0;j<disconnected.length;j++){
							$('#boardlist_status').append('<li>'+
								// 	  '<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
								'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-board-info">'+
									'<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>'+'<span>'+disconnected[j].label+'</span>'+
								'</a>'+
							      '</li>');
						}

						document.getElementById("boards_status").innerHTML = '<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';
						//refresh_map();
					}
					refresh_map();
				}
			//---------------------------------------------------------------------------------------------------------------
			} //If-else in function of the presence of the project_name inside the JSON of the WIOTP projects
		},
		error: function(response){
			//verify_token_expired(JSON.stringify(response.responseJSON.message));
			verify_token_expired(response.responseJSON.message, response.responseJSON.result, true);
		}
	});
}


//OLD and not used!!!
/*
function sensors_list(select_id, callback){
	$('#'+select_id).empty();
	$.ajax({
		//url: site_url+"Admin/get_sensors_list",
		url: s4t_api_url+"/sensors",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			for(i=0; i<response.message.length; i++){
				$('#'+select_id).append('<input class="registration_sensorlist" type="checkbox" id="'+response.message[i].id+'">'+response.message[i].type+'</input><br>');

			}

			callback("OK");
		},
		error: function(response){
			//alert('ERROR: '+JSON.stringify(response));
			callback("OK");
		}
	});
}
*/


function update_boardsv2(select_id, status, flag){

	var prj = getCookie("selected_prj");

	$.ajax({
		//url: s4t_api_url+"/boards",
		url: s4t_api_url+"/boards?project="+prj,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			//console.log(response);
			boards_list = response.message.sort(SortByLabel);

			$('#'+select_id).empty();
			if(!flag)
				$('#'+select_id).append('<option value="--">--</option>');

			for(var i=0; i<boards_list.length; i++){

				if( (status && boards_list[i].status == status) || !status){

					$('#'+select_id).append('<option title="'+boards_list[i].board_id+'" value="'+boards_list[i].board_id+'" data-unit="">'+boards_list[i].label+'</option>');
				}
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//console.log(response);
		}
	});
}


function create_table_from_json(table_id, obj, array, checkbox_name){
	var result = "";

	//Check which column to order
	var column_to_order = 0;

	//Clean the table if not already empty
	if($('#'+table_id).html() != "") $('#'+table_id).DataTable().destroy();


	if( !(obj instanceof Array) || (obj instanceof Array && obj.length ==0) ){
		result = '<thead><tr><th>Empty</th></tr></thead>';
		result +='<tbody><tr><td>No entries</td></tr></tbody>';
	}
	else{
		var headers = null;
		var content = [];
		if(array instanceof Array)
			headers = array;
		else
			headers = Object.keys(obj[0]);

		for(i=0;i<obj.length;i++){
			var entry = [];
			for(j=0;j<headers.length;j++){
				entry.push(obj[i][headers[j]]);
			}
			content.push(entry);
		}

		var ths_start = "<thead><tr>";
		var ths_end = "</tr></thead>";

		//THEAD
		ths = "";
		//If we don't want to add the "checkbox_name" label on the first column of the table
		//FROM
		//if(checkbox_name) ths = "<th>"+checkbox_name+"</th>";
		//TO
		if(checkbox_name) ths = "<th></th>";

		for(i=0;i<headers.length;i++){
			ths += "<th>"+headers[i]+"</th>";

			//For order purposes
			if(headers[i] == "timestamp")
				column_to_order = i;
		}
		var thead = ths_start + ths + ths_end;

		var tbody_start = "<tbody>";
		var tbody_end = "</tbody>";

		//TBODY
		tbd = "";
		var line_count = 0;
		for(i=0;i<content.length;i++){
			tbd +="<tr>";

			if(checkbox_name){
				tbd += '<td>'+
					//'<div class="switch round tiny" style="margin-bottom: 0px">'+
					'<div style="text-align: center; margin-bottom: 0px">'+
						'<input id="'+checkbox_name+line_count+'" type="checkbox" />'+
						'<label for="'+checkbox_name+line_count+'"></label>'+
					'</div>'+
				        '</td>';
			}

			for(j=0;j<content[i].length;j++){
				if(table_id != "show_vfs_table" && table_id != "unmount_vfs_tabledirs"){
					//Added to remove iotronic from fields to show in tables
					if(String(content[i][j]).startsWith(String(s4t_iotronic_folder)))
						content[i][j] = String(content[i][j]).replace(s4t_iotronic_folder, '');


					//CUSTOMIZED
					//substitute the keywords "active" and "failed" with respectively
					//green and red circles as for devices status on the homepage layout
					//------------------------------------------------------------------------------
					//if (content[i][j] == "active")
					if (content[i][j] == "OK")
						content[i][j] = '<img src="'+site_url+'uploads/green-circle.png" width=20 height=20>';
					//NOT USED...
					//else if (content[i][j] == "degradated")
					//	content[i][j] = '<img src="'+site_url+'uploads/yellow-circle.png" width=20 height=20>';
					//else if (content[i][j] == "failed")
					else if (content[i][j] == "NOK")
						content[i][j] = '<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>';
					//------------------------------------------------------------------------------
						

					tbd += "<td>"+content[i][j]+"</td>";
				}
				else
					tbd += '<td style="word-wrap: break-word; max-width: 180px">'+content[i][j]+'</td>';
			}
			tbd += "</tr>";
			line_count++;
		}
		var tbody = tbody_start + tbd + tbody_end;

		result = thead + tbody;
	}
	$('#'+table_id).html(result);

	//To add space just after the table
	var div_id = $('#'+table_id).closest("div")[0].id;
	$('#'+div_id).css('margin-bottom', '20px');

	//To correcty render the DataTable (ordered or not)
	if(column_to_order == 0){
		$('#'+table_id).DataTable();	//WORKING without ordering!!!
		//$('#'+table_id).DataTable({"lengthMenu": [[1, 5, 10, -1], [1, 5, 10, "All"]]});
	}
	else{
		if(checkbox_name)
			column_to_order += 1;

		$('#'+table_id).DataTable({"order": [[ column_to_order, "desc" ]]});	//WORKING with timestamp ordering !!!
	}

	//TESTING...
	/*
	//$('#'+table_id).DataTable().on('page.dt', function () {console.log('Page');});


	let example = $('#'+table_id).DataTable({
		columnDefs: [{
			orderable: false,
			className: 'select-checkbox',
			targets: 0
		}],
		select: {
			style: 'os',
			selector: 'td:first-child'
		},
		order: [
			[1, 'asc']
		]
	});
	example.on("click", "th.select-checkbox", function() {

		if ($("th.select-checkbox").hasClass("selected")) {
			//example.rows().deselect();
			$("th.select-checkbox").removeClass("selected");
			console.log("IF");
		} else {
			//example.rows().select();
			$("th.select-checkbox").addClass("selected");
			console.log("ELSE");
		}
	}).on("select deselect", function() {
		("Some selection or deselection going on")
		if (example.rows({
				selected: true
			}).count() !== example.rows().count()) {
			$("th.select-checkbox").removeClass("selected");
		} else {
			$("th.select-checkbox").addClass("selected");
		}
	});
*/


}


function convert_arrayfields_into_boolean(json){
	var json_output = [];

	if(json instanceof Array){
		json.forEach(function(c){
			elem = {};
			Object.keys(c).forEach(function(k){
				if(k == "mobile" || k == "net_enabled" || k == "notify"){
					if(c[k] == 0)
						elem[k] = false;
					else if(c[k] == 1)
						elem[k] = true;
				}
				else
					elem[k] = c[k];
			});
			json_output.push(elem);
		});
	}
	return json_output;
}


function get_selected_rows_from_table(table_id, checkboxes_id_like){

	var table = $('[id="'+table_id+'"]');
	var checkboxes = $('[id^="'+checkboxes_id_like+'"]');
	
	var thead_fields = [];
	
	for(i=1;i<table[0].rows[0].cells.length;i++){
		//console.log(table[0].rows[0].cells[i].innerText);

		//BUG FIXING: newer versions of chrome add spaces in some strings
		//thead_fields.push(table[0].rows[0].cells[i].innerText);

		head = table[0].rows[0].cells[i].innerText;
		head = head.replace(/\s/g, '');
		thead_fields.push(head);
		
	}


	//NEW approach with rows selection on multiple table pages
	var oTable = $('#'+table_id).dataTable();
	var body_fields = [];
	$("input:checked", oTable.fnGetNodes()).each(function(){
		var row_fields = [];
		var tr = $(this).closest("tr");
		for(j=1;j<tr[0].cells.length;j++){

			//BUG FIXING: newer versions of chrome add spaces in some strings
			//row_fields.push(tr[0].cells[j].innerText);

			cell = tr[0].cells[j].innerText;
			cell = cell.replace(/\s/g, '');
			row_fields.push(cell);
		}
		body_fields.push(row_fields);
	});

	//OLD approach with rows selection on current table page
	/*
	var body_fields = [];
	
	for(i=0;i<checkboxes.length;i++){
		if ($('#'+checkboxes[i].id).is(':checked')){
	
			var row_fields = [];
	
			row = $('#'+checkboxes[i].id).closest('tr');
			//console.log(row[0].childElementCount);
	
			for(j=1;j<row[0].cells.length;j++){
				//console.log(row[0].cells[j].innerText);
				row_fields.push(row[0].cells[j].innerText);
			}
			body_fields.push(row_fields);
		}
	}
	*/

	var return_array = [];
	return_array.push(thead_fields);
	return_array.push(body_fields);

	return return_array;
}


//Refresh boards list on click at any modal and button
$('[data-reveal-id^="modal"]').on('click',
        function(){

		//Set scrolling capabilities to each modal once it is clicked
		var reveal_id = this.getAttribute("data-reveal-id");
		$('#'+reveal_id).css("overflow-y", "scroll");
		$('#'+reveal_id).css("max-height", "80%");
		$('#'+reveal_id).css("margin-top", "50px");
		$('#'+reveal_id).css("margin-bottom", "50px");


		last_valid_selection = null;
		refresh_lists();
        }
);

/*
$(':button').click(function(){
	last_valid_selection = null;
	loading();
	document.getElementById('loading_bar').style.visibility='visible';
	//refresh_lists();
});
*/

//Start from here to manage the icon-bar menu on the right

//$('#iconbar_container').mouseover(function() {
$('#pre-menu').mouseover(function() {
	$('#menu ul li ul').removeAttr("style");
	//console.log("HERE");
});

//$('#pre-menu, .side-menu, .parent-menu').mouseout(function() {
$('#pre-menu').mouseout(function() {
	$('#menu ul li ul').removeAttr("style");
	//console.log("HERE2");
});

$('.side-menu').mouseover(function(){
	//console.log("THERE");

	var children_number = $(this).parent().find('ul').find('li').length;
	var elem_offset = $(this).offset();
	var item_size_h = $("#menu ul li ul li").height();
	var item_size_w = $("#menu ul li ul li").width();

	/*
	console.log(children_number);
	console.log(elem_offset);
	console.log(item_size_h +" "+ item_size_w);
	console.log($(document).height()+" "+ $(window).height());
	*/

	//40 is the footer height !!!
	if(elem_offset.top + children_number * item_size_h > $(window).height()-40){
	
		if(elem_offset.top > $(window).height()/2){
			offset = children_number * item_size_h;
			$('#menu ul li ul').css("margin-top", "-"+offset+"px");
		}
		else
			$('#menu ul li ul').css("margin-top", "-"+elem_offset.top+"px");
	}
	else
		$('#menu ul li ul').css("margin-top", "-70px");

	return false;
});



$(document).ready(function() {
	//To resolve the problem of "Uncaught TypeError: $(...).DataTable is not a function"
	$.noConflict();

	//CUSTOMIZED
	//--------------------------------------------------------------
	update_wiotp_frontend = document.getElementById("wiotp_frontend");
	if(update_wiotp_frontend != null)
		update_wiotp_frontend.setAttribute('href', 'xxxx');
	//--------------------------------------------------------------

	/*
	//Mapdiv section
	height = ( $('#mapdiv').height() - $(".parent-menu").height() ) /2;
	//console.log(height);
	$('#pre-menu').css("height", height);
	//get_projects_list();
	*/
	//Fixed at middle height of the map
	$('#pre-menu').css("height", "0");

	// Force the selection of a limited number of options in selects (even if multiple is enabled)
	last_valid_selection = null;
	$('.select_one').change(function(event) {
		if ($(this).val().length > 1)
			$(this).val(last_valid_selection);
		else
			last_valid_selection = $(this).val();
	});


	//For BATCH/not BATCH api calls it is necessary to hide/show the "table lists" in the modals
	$('.flag_project').on('change',
		function(){
			var id = this.getAttribute("id");
			var reveal_modal_id = this.closest(".reveal-modal").getAttribute("id");

			//Clean output fieldset (if the fieldset exists)
			var p_id = $('#'+reveal_modal_id).find("p");
			if(p_id[0] != undefined)
				p_id[0].innerHTML = "";
	
			var array = id.split("_");
			var section = array[0];

			if ($('#'+id).is(':checked')){
				//console.log("CHECKED");

				if(section == 'deleterequest'){
					$('#'+section+'_requestlist_bundle').hide();

					//TESTING
					//var inputs = $('#'+section+'_requestlist_bundle :input[type="checkbox"]');
					//console.log(inputs);
				}
				else
					$('#'+section+'_boardlist_bundle').hide();

				$("#"+reveal_modal_id).addClass("small");
			}
			else{
				//console.log("NOT CHECKED");

				if(section == 'deleterequest'){
					$('#'+section+'_requestlist_bundle').show();
					$("#"+reveal_modal_id).removeClass("small");
				}
				else if(section == 'deleteboard'){
					$('#'+section+'_boardlist_bundle').show();
					$("#"+reveal_modal_id).removeClass("small");
				}
				else
					$('#'+section+'_boardlist_bundle').show();

				//Commented to remove the problem of resize of modals once the checkbox changes status
				//$("#"+reveal_modal_id).removeClass("small");
			}
		}
	);

});


//This section was disabled by default but now it starts to be useful in future scenarios
function endpoints_list(endpoints, divsection, outputlist, outputclass){

	$('#'+outputlist).empty();

	if(endpoints.length != 0){
		for(key in endpoints) {
			if(endpoints[key]){
				//window[key]();
				$('#'+outputlist).append('<input class="'+outputclass+'" type="checkbox" id="'+key+'">   '+key+'</input><br>');
			}
		}
	}
	else
		$('#'+divsection).hide();
}
