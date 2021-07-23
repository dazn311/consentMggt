// import axios from "axios";
// import {runInAction} from "mobx";
//
// export function fetchOrgDataA(userID) {
//     try {
//         // console.log('fetchOrgData -- orgName', userID)
//         runInAction(() => {
//             this.setStartFetchOrgData()
//
//         })
//         let orgData = sessionStorage.getItem('orgData')
//         if (JSON.stringify(orgData) === '{}' || orgData === null) { //This will check if the object is empty
//             axios.post('https://ismggt.ru/query/user/info', {'userID': userID})
//                 .then(({data}) => {
//                     console.log('fetchOrgData -- then data', data[0])
//                     sessionStorage.setItem('orgData', JSON.stringify(data[0]))
//                     runInAction(() => {
//                         this.setSuccessFetchOrgData(data[0])
//                     })
//
//                 })
//                 .catch(error => {
//                     runInAction(() => {
//                         this.setErrorFetchOrgData(error.message)
//                     })
//                 })
//         } else {
//             runInAction(() => {
//                 let dataLocal = JSON.parse(orgData)
//                 console.log('fetchOrgData -- then data', dataLocal)
//                 this.setSuccessFetchOrgData(dataLocal)
//             })
//         }
//     } catch (e) {
//         runInAction(() => {
//             this.setErrorFetchOrgData(e.message)
//         })
//     }
// }
// const fetchParam = (props) => {
//
//     return [
//         {url: 'https://ismggt.ru/query/objects/list',
//          data: {"objectType": 2, "organization": 0, "limit": 100, "offset": 0, "startDate": "2021-01-01",
//                 "endDate": props.endDate, "objName": "", "orgName": props.orgName, "objKind": "", "objStatus": 10,
//                 "sortCol": "date", "sortType": "desc"  },
//          comment: ''},
//         {url: 'https://ismggt.ru/query/object/recs/list',
//          data: {"objectID": props.data.data.obj_id, "limit":"160", "offset":"0" },
//          comment: ''},
//     ]
// }
//
// export function fetchObjDataA(orgName) {
//     const endDate = new Date().toISOString();
//     try {
//         let objsData = sessionStorage.getItem('objsDataOfAuthUser')
//
//
//         if (JSON.stringify(objsData) === '{}' || objsData === null) { //This will check if the object is empty
//
//             axios.post('https://ismggt.ru/query/objects/list', {
//                 "objectType": 2, "organization": 0, "limit": 100, "offset": 0, "startDate": "2021-01-01",
//                 "endDate": endDate, "objName": "", "orgName": orgName, "objKind": "", "objStatus": 10,
//                 "sortCol": "date", "sortType": "desc"
//             })
//                 .then(({data}) => {
//                     // console.log('fetchObjDataA -- then data', data)
//                     sessionStorage.setItem('objsDataOfAuthUser', JSON.stringify(data))
//                     runInAction(() => {
//                         this.setSuccessFetchObjData(data)
//
//                     })
//
//                 })
//                 .catch(error => {
//                     runInAction(() => {
//                         this.setErrorFetchObjData(error.message)
//                     })
//                 })
//
//         } else {
//             runInAction(() => {
//                 let dataLocal = JSON.parse(objsData)
//                 // console.log('fetchObjDataA -- objsData', dataLocal)
//                 this.setSuccessFetchObjData(dataLocal)
//
//                 // objs list loading
//                 axios.post('https://ismggt.ru/query/object/data', {"objID": dataLocal.data.objects[0].objID})
//                     .then(({data}) => {
//                         console.log('fetchObjByIdA -- then data', data.data)
//                         runInAction(() => {
//                             this.upendObjArr(data.data)
//                         })
//                         sessionStorage.setItem('objsArrData', JSON.stringify(this.objsArr))
//                         console.log('data.data.obj_id',data.data.obj_id);
//                         axios.post('https://ismggt.ru/query/object/recs/list', {"objectID": data.data.obj_id, "limit":"160", "offset":"0"})
//                             .then(({data}) => {
//                                 console.log('query/object/recs/list -- then data', data)
//                                 runInAction(() => {
//                                     this.setSuccessFetchEvents(data)
//                                 })
//                                 // sessionStorage.setItem('objsArrData', JSON.stringify(this.objsArr))
//                             })
//                     })
//                 // this.fetchObjById(dataLocal.data.objects[0].objID)
//             })
//
//         }
//     } catch (e) {
//         runInAction(() => {
//             this.setErrorFetchObjData(e.message)
//         })
//     }
// }
//
// // export function fetchObjByIdA(objID) {
// //         return  axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
// // }
//
// export default {fetchOrgDataA, fetchObjDataA}