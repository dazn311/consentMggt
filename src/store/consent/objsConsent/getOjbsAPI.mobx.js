import axios from "axios";
import {runInAction} from "mobx";
// import stateObjsMobx from "./objsCons.mobx";

const lstData = {
    objsLst: {
        url: 'https://ismggt.ru/query/objects/list',
        data: {
            "objectType": 2, "organization": 0, "limit": 200, "offset": 0, "startDate": "2021-01-01",
            "endDate": '', "objName": "", "orgName": '', "objKind": "", "objStatus": 10,
            "sortCol": "date", "sortType": "desc"
        },
        comment: 'загрузка объектов организации'
    },

    objData: {
        url: 'https://ismggt.ru/query/object/data',
        data: {"objID": ''},
        comment: 'загрузка одного объекта для получения смежных объ-ов'
    },

    recsLst: {
        url: 'https://ismggt.ru/query/object/recs/list',
        data: {"objectID": '640', "limit": "160", "offset": "0"},
        comment: 'загрузка событий по выбранному объекту'
    },

}

export function fetchOrgDataA(userID) {
    try {
        runInAction(() => {
            this.setStartFetchOrgData()
        })
        let orgData = sessionStorage.getItem('orgData')
        if (JSON.stringify(orgData) === '{}' || orgData === null) { //This will check if the object is empty
            axios.post('https://ismggt.ru/query/user/info', {'userID': userID})
                .then(({data}) => {
                    // console.log('fetchOrgData -- then data', data[0])
                    sessionStorage.setItem('orgData', JSON.stringify(data[0]))
                    runInAction(() => {
                        this.updateOrgData(data[0])
                        this.setSuccessFetchOrgData()
                        this.fetchObjData(data[0].org_name)
                    })
                })
                .catch(error => {
                    runInAction(() => {
                        this.setErrorFetchOrgData(error.message)
                    })
                })
        } else {
            runInAction(() => {
                let dataLocal = JSON.parse(orgData)
                // console.log('fetchOrgData -- then data 2', dataLocal)
                this.updateOrgData(dataLocal)
                this.setSuccessFetchOrgData()
                this.fetchObjData(dataLocal.org_name)
            })
        }
    } catch (e) {
        runInAction(() => {
            this.setErrorFetchOrgData(e.message)
        })
    }
}


const fetchParam = ({typeF = '', dataFetch = {}}) => new Promise((resolve, reject) => {
    let newUrl = '',
        newData = {},
        endDate = new Date().toISOString()

    if (typeF === 'objsLst') {
        newUrl = lstData.objsLst.url
        newData = {...lstData.objsLst.data, endDate: endDate, orgName: dataFetch.orgName}
    } else if (typeF === 'objData') {
        newUrl = lstData.objData.url
        newData = {...lstData.objData.data, objID: dataFetch.objID}
    } else if (typeF === 'recsLst') {
        newUrl = lstData.recsLst.url
        newData = {...lstData.recsLst.data, objectID: dataFetch.objID}
    }

    axios.post(newUrl, newData)
        .then(({data}) => {
            resolve(data)
        })
        .catch(error => {
            console.log(error)
        })

    return false
})

//

export function startFetchA(orgName) {
    let res = {}

    return fetchParam({typeF: 'objsLst', dataFetch: {orgName: orgName}})
        .then(objsLstRes => {
            res.objsLstData = objsLstRes
            return fetchParam({typeF: 'objData', dataFetch: {objID: objsLstRes.data.objects[0].objID}})
        })
        .then(objDataRes => {
            res.objData = objDataRes
            return fetchParam({typeF: 'recsLst', dataFetch: {objID: objDataRes.data.obj_id}})
        })
        .then(recsLstRes => {
            res.recsData = recsLstRes

            if (res.objData.data.hasOwnProperty('obj_relatives')) {
                if (res.objData.data.obj_relatives.length) {
                    return fetchParam({
                        typeF: 'objData',
                        dataFetch: {objID: res.objData.data.obj_relatives[0].obj_rel_id}
                    })
                } else {
                    res.relData = null;
                    return res;
                }
            } else {
                res.relData = null;
                return res;
            }
        })
        .then(relRes => {
            res.relData = relRes
            return res;
        })
        .catch(e => console.log(e))
}

export function eventFetchByObjIdA(obj_id) {
     fetchParam({typeF: 'recsLst', dataFetch: {objID: obj_id}})
        .then(recsData => {
            // console.log('44 recsData', recsData)
            runInAction(() => {
                this.setSuccessFetchEvents( recsData)

                //сразу записать нужный формат
                sessionStorage.setItem('recsData', JSON.stringify(recsData))
            })




        })
        .catch(e => console.log(e))
}

export function fetchObjDataA(orgName) {
    try {
        let objsDataSessionStore = sessionStorage.getItem('objsDataOfAuthUser')

        if (JSON.stringify(objsDataSessionStore) === '{}' || objsDataSessionStore === null) { //This will check if the object is empty
            startFetchA(orgName)
                .then(res => {
                    // console.log('44res', res)
                    runInAction(() => {
                        this.setObjLstData(res.objsLstData)
                        this.setSuccessFetchObjLstData()
                        this.appendObjArr(res.objData.data)
                        if (res.relData) {
                            this.appendObjArr(res.relData.data)
                            this.selectRelObj(res.relData.data.obj_id, res.relData.data.obj_name)
                        } else {
                            this.selectRelObj(0, 'is not rel of this obj')
                        }

                        this.setSuccessFetchEvents(res.recsData)

                        sessionStorage.setItem('objsDataOfAuthUser', JSON.stringify(res.objsLstData))
                        //сразу записать нужный формат
                        sessionStorage.setItem('recsData', JSON.stringify(res.recsData))

                        sessionStorage.setItem('selectedObjs', JSON.stringify(this.selectedObjs))

                    })
                })
        } else {  // objsDataSessionStore is valid
            runInAction(() => {
                let objsLstData = sessionStorage.getItem('objsDataOfAuthUser')
                let objData = sessionStorage.getItem('objsArrData')
                let recsData = sessionStorage.getItem('recsData')
                let selectedObjsData = sessionStorage.getItem('selectedObjs')

                this.setObjLstData(JSON.parse(objsLstData))
                this.setSuccessFetchObjLstData()
                this.appendObjArrSessionExtract(JSON.parse(objData))
                this.setSuccessFetchEvents(JSON.parse(recsData))

                this.extractSessionStorage(JSON.parse(selectedObjsData))

            })

        }
    } catch (e) {
        runInAction(() => {
            this.setErrorFetchObjData(e.message)
        })
    }
}

const fetchFunc = {fetchOrgDataA, fetchObjDataA, eventFetchByObjIdA}
export default fetchFunc