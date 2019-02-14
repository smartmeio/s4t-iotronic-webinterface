
//TO BE USED !!!
function test_wiotp(){
	$.ajax({
		url: site_url+'Sacertis/verify_wiotp_conn',
		success: function(response){
			console.log(response);
		}
	});
}


function get_board_sensors(uuid, callback){

	project_name = get_project_name_by_uuid(getCookie("selected_prj"));

	data = {'uuid': uuid, 'project_name': project_name};

	$.ajax({
		url: site_url+'Sacertis/get_board_sensors',
		type: 'POST',
		dataType: 'json',
		data: data,
		success: function(response){
//console.log(response)
			if(response.payload){
				parsed = $.parseJSON(atob(response.payload))
				sensor_data = parsed.d.r.sensor_data

				status_report = {"typeId": response.typeId, "deviceId": response.deviceId, "timestamp": response.timestamp, "payload": sensor_data}
				callback(status_report)
			}
			else
				callback("OK")
		},
		error: function(response){
//console.log(response)
			callback("NO WIOTP")
		}
	});
}

function verify_sensors_status(uuid, callback){
	var failed = 0;

	project_name = get_project_name_by_uuid(getCookie("selected_prj"));

	data = {'uuid': uuid, 'project_name': project_name};

        $.ajax({
                url: site_url+'Sacertis/get_board_sensors',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(response){
			if(response.payload){
				parsed = $.parseJSON(atob(response.payload))

				sensor_data = parsed.d.r.sensor_data
				for(i=0;i<sensor_data.length;i++){
					if(sensor_data[i].status == "NOK")
						failed += 1;
				}

				data = {"board_id": parsed.d.group, "failed": failed, "all": sensor_data.length};

				if(failed >= response.threshold){
					data.status = "CHECKED"
					//callback(parsed.d.group) //returns the board_id
				}
				else{
					data.status = "NO ACTION"
					//callback("NO ACTION")
				}
				callback(data)
			}
			else
				callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO ACTION"})
                },
		error: function(response){
			//console.log("ERROR")
			//console.log(response)
			//callback("NO WIOTP")

			callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO WIOTP"})
		}
        });
}
