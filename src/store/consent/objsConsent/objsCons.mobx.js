import {fetchOrgDataA, fetchObjDataA} from "./getOjbsAPI.mobx";
import {
    // makeAutoObservable,
    makeObservable, observable, computed, action,
    //  flow, runInAction,
    toJS
} from "mobx"

import {convertWT} from "./getBndConvert.mobx";


import axios from "axios";


class ObjsMobX {
    startFetchOrg;
    successFetchOrg;
    errorFetchOrg;
    errorFetchOrgMessage;
    orgData;

    startFetchObj;
    successFetchObj;
    errorFetchObj;
    objectsData; // {9750: {}, 1020: {} }
    amRelOfObjectsData; // {9750: {}, 1020: {} }

    objectsEvn; //{amount: 0,startFetch: false, successFetch: false, errorFetch: false};

    startFetchObjArr;
    successFetchObjArr;
    errorFetchObjArr;
    objsArr;  // get bound by id
    relativesData;
    curObjId; // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId; // выделенный объект - выбранный пользователем /consent page 270521
    selectedObjs;

    constructor() {
        //Organisation
        this.startFetchOrg = false;
        this.successFetchOrg = false;
        this.errorFetchOrg = false;
        this.errorFetchOrgMessage = '';
        this.orgData = null;

        // Objects
        this.startFetchObj = false;
        this.successFetchObj = false;
        this.errorFetchObj = false;
        this.objectsData = {amount: 0};
        this.amRelOfObjectsData = 0;

        // relatives

        this.startFetchObjArr = false;
        this.successFetchObjArr = false;
        this.errorFetchObjArr = false;
        this.objsArr = {}; // {9750: {}, 1020: {} }
        this.relativesData = null;
        this.curObjId = null; // выделенный объект - выбранный пользователем /consent page 270521

        this.curRelId = null; // выделенный объект - выбранный пользователем /consent page 270521
        this.selectedObjs = {obj: {id: 0, objName: ''}, rel: {id: 0, relName: ''}};
        // events

        this.filterTypeEvents = 0;
        this.objectsEvn = {amount: 0, startFetch: false, successFetch: false, errorFetch: false};
        this.selectedEvent = {recId: 0, data: null};

        this.showMap = false;

        makeObservable(this, {
            successFetchOrg: observable,
            errorFetchOrg: observable,
            successFetchObj: observable,
            errorFetchObj: observable,
            successFetchObjArr: observable,
            errorFetchObjArr: observable,
            curObjId: observable,
            curRelId: observable,
            objectsEvn: observable,
            filterTypeEvents: observable,
            showMap: observable,

            setStartFetchOrgData: action,
            setSuccessFetchOrgData: action,
            setErrorFetchOrgData: action,
            selectObj: action,
            selectRelObj: action,
            setStartFetchObjData: action,
            setObjLstData: action,
            setErrorFetchObjData: action,
            fetchOrgData: action,
            fetchObjData: action,
            fetchObjById: action,
            setFilterEvents: action,
            filterEvents: computed,
            selBndForMap: computed,
        })
    }

    // organisation

    fetchOrgData() {
        console.log('fetch 1')
    }

    // objs this.objsArr[`${obj.obj_id}`] = obj
    async fetchObjById(objID) {
        if (this.objsArr[objID]) {
            console.log('fetchObjById - такие данные уже есть', objID)
        } else {
            const {data} = await axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
            console.log('332 fetchObjById - data', data.data)
            // this.setSuccessFetchOrgData(data.data)

        }
    }


    setFilterEvents(type = 0) {
        this.filterTypeEvents = type
        // console.log('setFilterEvents ',this.filterTypeEvents)
    }

    get selBndForMap() {

        const resBnd = {}
        let objID = this.selectedObjs.obj.id
        let relID = this.selectedObjs.rel.id

        resBnd.objBnd = this.objsArr[objID] ? this.objsArr[objID].objBnd : null
        resBnd.relBnd = this.objsArr[relID] ? this.objsArr[relID].objBnd : null
        console.log('selBndForMap', resBnd)

        return resBnd
    }


    get filterEvents() {
        if (this.filterTypeEvents === 0) {
            return this.objectsEvn
        } else if (this.filterTypeEvents === 2) {
            let newRecs = this.objectsEvn.data.recs.filter(rec => rec.rec_status === 5)
            let newData = {recs: newRecs}
            // let newEvent = {...this.objectsEvn, amount: newRecs.length, data: newData }
            return {...this.objectsEvn, amount: newRecs.length, data: newData}
        } else if (this.filterTypeEvents === 1) {
            let newRecs = this.objectsEvn.data.recs.filter(rec => ((rec.receip.objectID === this.selectedObjs.obj.id || rec.sender.objectID === this.selectedObjs.obj.id)
                && (rec.receip.objectID === this.selectedObjs.rel.id || rec.sender.objectID === this.selectedObjs.rel.id)))
            let newData = {recs: newRecs}
            // let newEvent = {...this.objectsEvn, amount: newRecs.length, data: newData }
            return {...this.objectsEvn, amount: newRecs.length, data: newData}
        }
        return this.objectsEvn
    }

    fetchObjData(data) {
        console.log('fetch 2', data)
    }

    setStartFetchOrgData() {
        this.startFetchOrg = true
        this.successFetchOrg = false
        this.errorFetchOrg = false
    }

    setSuccessFetchOrgData(data) {
        this.startFetchOrg = false
        this.successFetchOrg = true
        this.errorFetchOrg = false
        this.orgData = data
        // this.fetchObjById(11718)
    }

    setErrorFetchOrgData(mess) {
        this.startFetchOrg = false
        this.successFetchOrg = false
        this.errorFetchOrg = true
        this.errorFetchOrgMessage = mess
    }

    // objects
    selectObj(objId, objName = '') {
        this.selectedObjs['obj'] = {id: objId, objName: objName}
        this.curObjId = objId;
        this.showMap = true
    }

    selectRelObj(objId, relName = '') {
        this.selectedObjs['rel'] = {id: objId, relName: relName}
        this.curRelId = objId;
        // console.log('this.selectedObjs', this.selectedObjs)
    }

    extractSessionStorage(data) {
        this.selectedObjs = data
    }

    setStartFetchObjData() {
        this.startFetchObj = true
        this.successFetchObj = false
        this.errorFetchObj = false
    }

    setObjLstData(obj) {
        this.startFetchObj = false
        this.successFetchObj = true
        this.errorFetchObj = false

        this.objectsData = obj
        this.selectObj(obj.data.objects[0].objID, obj.data.objects[0].objName)
        this.amRelOfObjectsData = obj.data.objects[0].objRelatives ? obj.data.objects[0].objRelatives.length : 0
    }


    upendObjArrSessionExtract(objsSession) {
        this.startFetchObjArr = false
        this.successFetchObjArr = true
        this.errorFetchObjArr = false
        this.objsArr = objsSession
        console.log('toJS(stateObjsMobx)', toJS(stateObjsMobx))
    }

    upendObjArr(obj) {
        console.log('upendObjArr', obj)
        this.startFetchObjArr = false
        this.successFetchObjArr = true
        this.errorFetchObjArr = false
        let resConvert = convertWT(obj.obj_bounds.obj_bnd_geometry)
        if (resConvert) {
            let newObj = {...obj, objBnd: resConvert}
            this.objsArr[`${obj.obj_id}`] = newObj
        } else {
            this.objsArr[`${obj.obj_id}`] = obj
        }
        sessionStorage.setItem('objsArrData', JSON.stringify(this.objsArr))
        // this.selectRelObj(obj.obj_relatives[0].obj_rel_id, obj.obj_relatives[0].obj_rel_name)

        console.log(' stateObjsMobx ', toJS(stateObjsMobx))
    }

    setErrorFetchObjData(mess) {
        this.startFetchObj = false
        this.successFetchObj = false
        this.errorFetchObj = true
        this.errorFetchObjMessage = mess
    }

    // events
    setSuccessFetchEvents(data) {
        // console.log('setSuccessFetchEvents', data)
        this.objectsEvn = {
            amount: data.amount,
            startFetch: false,
            successFetch: true,
            errorFetch: false,
            data: data.data
        };
        // console.log('toJS(stateObjsMobx)', toJS(stateObjsMobx))
    }

    setErrorFetchEvents(mess) {
        this.objectsEvn = {amount: 0, startFetch: false, successFetch: false, errorFetch: mess, data: null};
    }

    // bound for map
    getBndById(idObj) {

    }

}


let stateObjsMobx = new ObjsMobX();

stateObjsMobx.fetchOrgData = fetchOrgDataA
stateObjsMobx.fetchObjData = fetchObjDataA

window.stateObjs = stateObjsMobx
window.toJS = toJS

// window.stateObjs = toJS(stateObjsMobx)
export default stateObjsMobx


// objs this.objsArr[`${obj.obj_id}`] = obj
// fetchObjById(objID) {
//     if (this.objsArr[objID]) {
//         console.log('fetchObjById - такие данные уже есть',objID)
//     } else {
//         axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
//             .then(({data}) => {
//                 console.log('23 fetchObjById -- then data', data.data)
//                 sessionStorage.setItem('objsDataOfAuthUser', JSON.stringify(data.data))
//                     // this.setSuccessFetchObjArr(data)
//                 this.setSuccessFetchObjArr(data.data)
//             })
//         // console.log('fetchObjById - data',data.data)
//
//     }
// }


// setSuccessFetchObjArr(data) {
// this.startFetchObj = false
// this.successFetchObj = true
// this.errorFetchObj = false
// this.objectsData = data
// this.curObjId = data.data.objects[0].objID
// }