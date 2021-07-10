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

    // startFetchObjLst;
    // successFetchObjLst;
    // errorFetchObjLst;

    objectsData; // {9750: {}, 1020: {} }
    // amRelOfObjectsData;

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
        this.orgData = null; // user_id org_name user_name
        this.orgDataState = {start: false, success: false, errorMessage: '', data: null}; // user_id org_name user_name

        // Objects list
        // this.startFetchObj = false;
        // this.successFetchObjLst = false;
        // this.errorFetchObjLst = false;
        // this.objectsDataLst = {amount: 0, data: null};
        // this.amRelOfObjectsData = 0;
        this.objListState = {start: false, success: false, errorMessage: '', objLst: {amount: 0, data: null}, amRel: 0};


        //Objects & relatives

        // здесь только стейт загруженного объекта и данные только одного объекта
        this.objState = {start: false, success: false, errorMessage: '', objData: {amount: 0, data: null} };
        this.relState = {start: false, success: false, errorMessage: '', relData: {amount: 0, data: null} };

        this.startFetchObjArr = false;
        this.successFetchObjArr = false;
        this.errorFetchObjArr = false;
        this.objsArr = {}; // {9750: {}, 1020: {} }
        this.relativesData = null;
        this.curObjId = null; // выделенный объект - выбранный пользователем /consent page 270521

        this.curRelId = null; // выделенный объект - выбранный пользователем /consent page 270521
        this.selectedObjs = {obj: {id: 0, objName: ''}, rel: {id: 0, relName: ''}};

        // events
        this.filterTypeEvents = 0; // 0 | 1 | 2
        this.objectsEvn = {amount: 0, startFetch: false, successFetch: false, errorFetch: false};
        this.selectedEvent = {recId: 0, data: null};
        this.eventState = {start: false, success: false, errorMessage: '', amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null} };

        this.showMap = false;

        makeObservable(this, {
            // organisation
            orgDataState: observable,
            successFetchOrg: observable,
            orgData: observable,
            errorFetchOrg: observable,

            // successFetchObjLst: observable,
            // errorFetchObjLst: observable,

            objListState: observable,
            selectedObjs: observable,

            successFetchObjArr: observable,
            errorFetchObjArr: observable,
            curObjId: observable,
            curRelId: observable,
            objectsEvn: observable,
            filterTypeEvents: observable,
            showMap: observable,

            selectedEvent: observable,

            // setStartFetchOrgData: action,
            // setSuccessFetchOrgData: action,
            // setErrorFetchOrgData: action,
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
            this.selectRelObj(this.objsArr[objID].obj_relatives[0].obj_rel_id, this.objsArr[objID].obj_relatives[0].obj_rel_name)
        } else {
            const {data} = await axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
            console.log('332 fetchObjById - data', data.data)
            this.appendObjArr(data.data)
            // this.setSuccessFetchOrgData(data.data)
            this.selectRelObj(data.data.obj_relatives[0].obj_rel_id, data.data.obj_relatives[0].obj_rel_name)

        }
    }


    setFilterEvents(type = 0) {
        this.filterTypeEvents = type
        // console.log('setFilterEvents ',this.filterTypeEvents)
    }

    // возвращает координаты объектов, которые активны в данный момент
    get selBndForMap() {

        const resBnd = {}
        let objID = this.selectedObjs.obj.id
        let relID = this.selectedObjs.rel.id

        resBnd.objBnd = this.objsArr[objID] ? this.objsArr[objID].objBnd : null
        resBnd.relBnd = this.objsArr[relID] ? this.objsArr[relID].objBnd : null
        // console.log('selBndForMap', resBnd)

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

        this.orgDataState = {start: true, success: false, errorMessage: '', ...this.orgDataState}

    }

    setSuccessFetchOrgData() {
        this.startFetchOrg = false
        this.successFetchOrg = true
        this.errorFetchOrg = false
        // this.fetchObjById(11718)
        this.orgDataState = {start: false, success: true, errorMessage: '', ...this.orgDataState}
    }

    updateOrgData(data) {
        this.orgData = data

        this.orgDataState = {start: false, success: true, errorMessage: '', data: data};
    }

    setErrorFetchOrgData(mess) {
        this.startFetchOrg = false
        this.successFetchOrg = false
        this.errorFetchOrg = true
        this.errorFetchOrgMessage = mess

        this.orgDataState = {start: false, success: false, errorMessage: mess, ...this.orgDataState}

        this.showMap = false
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
        // this.startFetchObj = true
        // this.successFetchObjLst = false
        // this.errorFetchObjLst = false


        this.objListState = {start: true, success: false, errorMessage: '', objLst: {amount: 0, data: null}, amRel: 0};
    }
    //setSuccessFetchOrgData() {
    setSuccessFetchObjLstData() {
        this.startFetchObjLst = false
        this.successFetchObjLst = true
        this.errorFetchObjLst = false

        this.objListState = {start: true, success: false, errorMessage: '', amRel: 0, ...this.objListState};
    }

    setObjLstData(obj) {
        // console.log('setObjLstData(obj))', obj)
        // this.objectsDataLst = obj
        // выделяем первый объект при загрузке
        this.selectObj(obj.data.objects[0].objID, obj.data.objects[0].objName)
        let amRel = obj.data.objects[0].objRelatives ? obj.data.objects[0].objRelatives.length : 0
        // this.amRelOfObjectsData = amRel

        this.objListState = {start: false, success: true, errorMessage: '', objLst: {amount: obj.amount, data: obj}, amRel: amRel};
    }

    setErrorFetchObjData(mess) {
        // this.startFetchObjLst = false
        // this.successFetchObjLst = false
        // this.errorFetchObjLst = true
        this.errorFetchObjMessage = mess
    }


    appendObjArrSessionExtract(objsSession) {
        this.startFetchObjArr = false
        this.successFetchObjArr = true
        this.errorFetchObjArr = false
        this.objsArr = objsSession
        // console.log('toJS(stateObjsMobx)', toJS(stateObjsMobx))
    }

    appendObjArr(obj) {
        console.log('appendObjArr', obj)
        this.startFetchObjArr = false
        this.successFetchObjArr = true
        this.errorFetchObjArr = false
        if(this.objsArr[`${obj.obj_id}`]){
            console.log('appendObjArr 2 ', obj)
            return
        }

        let resConvert = convertWT(obj.obj_bounds.obj_bnd_geometry)
        if (resConvert) {
            this.objsArr[`${obj.obj_id}`] = {...obj, objBnd: resConvert}
        } else {
            this.objsArr[`${obj.obj_id}`] = obj
        }
        sessionStorage.setItem('objsArrData', JSON.stringify(this.objsArr))
        // this.selectRelObj(obj.obj_relatives[0].obj_rel_id, obj.obj_relatives[0].obj_rel_name)

        // console.log(' stateObjsMobx ', toJS(stateObjsMobx))
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

