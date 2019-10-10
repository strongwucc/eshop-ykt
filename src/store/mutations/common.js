export default {
	set_common_data_momey_mark: (state, text) =>{
		state.common_data.money_mark = text;
	},
	set_common_data_title_info: (state, data) =>{
		state.common_data.logo = data.phone_logo;
		state.common_data.title = data.name;
	},
	set_location_data(state, data){	//设置定位数据
		state.location.point_x = data.lng;
		state.location.point_y = data.lat;
		state.location.province = data.province;
		state.location.city = data.city;
		state.location.district = data.district ? data.district : '';
		state.location.is_location = true;
		state.location.address = data.addr ? data.addr : '';
		localStorage.setItem('location_data', JSON.stringify(data));
	},
	set_location_city(state, cityname){	//设置定位、选择城市
		state.location.location_city = cityname;
		localStorage.setItem('location_city', cityname);
	},
  set_common_data_store_info: (state, data) =>{
    state.common_data.store_info = data;
    localStorage.setItem('store_info', JSON.stringify(data));
  },
  set_common_data_desk_info: (state, data) =>{
    state.common_data.desk_info = data;
    localStorage.setItem('desk_info', JSON.stringify(data));
  },

  start_pos: (state, data) => {//获取触摸点
	  state.common_data.startX = data.x
    state.common_data.startY = data.y
  }
}
