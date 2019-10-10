import Http from '../../utils/http'
import API from "../../utils/api";
import {TMap} from '../../assets/js/TMap'

let http = new Http();

export default {
  get_common_data({commit, state}, router){
    var store_info = localStorage.getItem('store_info');
    var desk_info = localStorage.getItem('desk_info');
    //从本地缓存中先获取
    if(store_info){
      commit('set_common_data_store_info', JSON.parse(store_info));
    }
    if(desk_info){
      commit('set_common_data_desk_info', JSON.parse(desk_info));
    }

    //从接口获取
    if (state.common_data.desk_info && state.common_data.store_info) {
      http.post(API.seller.store_info,{store_id:state.common_data.store_info.store_id,desk_id:state.common_data.desk_info.desk_id}).then( result => {
        if(result.return_code == '0000'){
          commit('set_common_data_desk_info', result.data.desk);
        }
      });
    }
  },
  get_common_positioning({commit, state}){    //获取定位信息
    //从缓存获取上次定位
    var location_data = localStorage.getItem('location_data');
    var location_city = localStorage.getItem('location_city');

    if(location_data) commit('set_location_data', JSON.parse(location_data));
    if(location_city) commit('set_location_city', location_city);

    TMap().then(qqMap => {
      qqMap.getLocation(
        position => {
          commit('set_location_data', position);
          commit('set_location_city', position.city);
        },
        () => {
          console.log('定位失败')
        })
    })
  }
}
