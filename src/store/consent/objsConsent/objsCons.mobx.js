import {fetchOrgDataA, fetchObjDataA, eventFetchByObjIdA} from "./getOjbsAPI.mobx";
import {
    // makeAutoObservable,
    makeObservable, observable, computed, action,
    //  flow, runInAction,
    toJS
} from "mobx"

// import {convertWT} from "./getBndConvert.mobx";
import {convertWT} from "./bndConvert.mobx";


import axios from "axios";


class ObjsMobX {
    // objectsEvn; //{amount: 0,startFetch: false, successFetch: false, errorFetch: false};

    objsArr;  // get bound by id
    objArrState;

    relativesData;
    curObjId; // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId; // выделенный объект - выбранный пользователем /consent page 270521
    selectedObjs;

    constructor() {
        //Organisation
        this.orgDataState = {start: false, success: false, errorMessage: '', data: null}; // user_id org_name user_name

        // Objects list
        this.objListState = {start: false, success: false, errorMessage: '', objLst: {amount: 0, data: null}, amRel: 0};



        //Objects & relatives

        // здесь только стейт загруженного объекта и данные только одного объекта
        this.objState = {start: false, success: false, errorMessage: '', objData: {amount: 0, data: null}};
        this.relState = {start: false, success: false, errorMessage: '', relData: {amount: 0, data: null}};


        this.objArrState = {start: false, success: false, errorMessage: ''};
        this.objsArr = {}; // {9750: {}, 1020: {} }

        this.relativesData = null;

        this.curObjId = null; // выделенный объект - выбранный пользователем /consent page 270521

        this.curRelId = null; // выделенный объект - выбранный пользователем /consent page 270521
        this.selectedObjs = {obj: {id: 0, objName: ''}, rel: {id: 0, relName: ''}};

        // events
        this.filterTypeEvents = 0; // 0 | 1 | 2
        this.eventState = {start: false, success: false, errorMessage: '', amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null}};

        this.showMap = false;
        this.showCanvas = false;

        makeObservable(this, {
            // organisation
            orgDataState: observable,

            objListState: observable,
            selectedObjs: observable,

            curObjId: observable,
            curRelId: observable,
            // objectsEvn: observable,
            eventState: observable,
            filterTypeEvents: observable,

            showMap: observable,
            showCanvas: observable,


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

    // organisation API ////
    fetchOrgData() {
        console.log('organisation API ')
    }

    ///// objects API ////
    async selElemOfObjsLst(objID, objName) {
        this.eventToDefaultState()
        await this.fetchObjById(objID)
        await this.eventFetchByObjId(objID)
        this.selectObj(objID, objName)
    }

    ///// relatives API ////
    async selElemOfRelLst(objID, objName) {
        await this.fetchRelById(objID)
        this.selectRelObj(objID, objName)
    }

    // objs this.objsArr[`${obj.obj_id}`] = obj
    async fetchObjById(objID) {
        if (this.objsArr[objID]) {
            // console.log('fetchObjById - такие данные уже есть', objID)
            this.selectRelObj(this.objsArr[objID].obj_relatives[0].obj_rel_id, this.objsArr[objID].obj_relatives[0].obj_rel_name)
        } else {
            const {data} = await axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
            // console.log('332 fetchObjById - data', data.data)
            this.appendObjArr(data.data)
            // this.setSuccessFetchOrgData(data.data)
            this.selectRelObj(data.data.obj_relatives[0].obj_rel_id, data.data.obj_relatives[0].obj_rel_name)
            await this.fetchRelById(data.data.obj_relatives[0].obj_rel_id)

        }
    }

    // objs this.objsArr[`${obj.obj_id}`] = obj
    async fetchRelById(objID) {
        if (this.objsArr[objID]) {
            // console.log('fetchObjById - такие данные уже есть', objID)
            // this.selectRelObj(this.objsArr[objID].obj_relatives[0].obj_rel_id, this.objsArr[objID].obj_relatives[0].obj_rel_name)
        } else {
            const {data} = await axios.post('https://ismggt.ru/query/object/data', {"objID": objID})
            // console.log('342 fetchRelById - data', data.data)
            this.appendObjArr(data.data)
            // this.selectRelObj(data.data.obj_relatives[0].obj_rel_id, data.data.obj_relatives[0].obj_rel_name)

        }
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

    setFilterEvents(type = 0) {
        this.filterTypeEvents = type
        // console.log('setFilterEvents ',this.filterTypeEvents)
    }

    eventFetchByObjId(obj_id = 0) {
        // перезапишится.. другая будет
        console.log('eventFetchByObjId ', obj_id)
    }


    // // this.objectsEvn = {amount: 0, startFetch: false, successFetch: false, errorFetch: false};
    //         this.selectedEvent = {recId: 0, data: null};
    //         this.eventState = {start: false, success: false, errorMessage: '', amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null} };
    get filterEvents() {
        if (this.filterTypeEvents === 0) {
            return this.eventState
        } else if (this.filterTypeEvents === 2) {
            let newRecs = this.eventState.evnData.recs.filter(rec => rec.rec_status === 5)
            let newData = {recs: newRecs}
            // let newEvent = {...this.eventState.evnData, amount: newRecs.length, data: newData }
            return {...this.eventState, amount: newRecs.length, data: newData}
        } else if (this.filterTypeEvents === 1) {
            let newRecs = this.eventState.evnData.recs.filter(rec => ((rec.receip.objectID === this.selectedObjs.obj.id || rec.sender.objectID === this.selectedObjs.obj.id)
                && (rec.receip.objectID === this.selectedObjs.rel.id || rec.sender.objectID === this.selectedObjs.rel.id)))
            let newData = {recs: newRecs}
            // let newEvent = {...this.eventState, amount: newRecs.length, data: newData }
            return {...this.eventState, amount: newRecs.length, data: newData}
        }
        return this.eventState
    }

    fetchObjData(data) {
        console.log('fetch 2', data)
    }

    setStartFetchOrgData() {
        this.orgDataState = {start: true, success: false, errorMessage: '', ...this.orgDataState}
    }

    setSuccessFetchOrgData() {
        this.orgDataState = {start: false, success: true, errorMessage: '', ...this.orgDataState}
    }

    updateOrgData(data) {
        this.orgDataState = {start: false, success: true, errorMessage: '', data: data};
    }

    setErrorFetchOrgData(mess) {
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
        this.objListState = {start: true, success: false, errorMessage: '', objLst: {amount: 0, data: null}, amRel: 0};
    }

    //setSuccessFetchOrgData() {
    setSuccessFetchObjLstData() {
        this.objListState = {start: true, success: false, errorMessage: '', amRel: 0, ...this.objListState};
    }

    setObjLstData(obj) {
        // console.log('setObjLstData(obj))', obj)
        // выделяем первый объект при загрузке
        this.selectObj(obj.data.objects[0].objID, obj.data.objects[0].objName)
        let amRel = obj.data.objects[0].objRelatives ? obj.data.objects[0].objRelatives.length : 0

        this.objListState = {start: false, success: true, errorMessage: '', objLst: {amount: obj.amount, data: obj}, amRel: amRel};
    }

    setErrorFetchObjData(mess) {
        console.log('Error Fetch Obj Data', mess)

    }


    appendObjArrSessionExtract(objsSession) {
        this.objArrState = {...this.objArrState, start: false, success: true, errorMessage: ''}
        this.objsArr = objsSession
        // console.log('toJS(stateObjsMobx)', toJS(stateObjsMobx))
    }

    appendObjArr(obj) {
        this.objArrState = {...this.objArrState, start: false, success: true, errorMessage: ''}
        if (this.objsArr[`${obj.obj_id}`]) {
            console.log('уже есть такой ', obj)
            return
        }

        // console.log('appendObjArr', obj)

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
    //this.eventState = {start: false, success: false, errorMessage: '', amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null} };
    eventToDefaultState() {
        this.eventState = {start: false, success: false, errorMessage: '', amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null}};
    }

    setSuccessFetchEvents(data) {
        // console.log('setSuccessFetchEvents', data)
        this.eventState = {
            start: false,
            success: true,
            errorMessage: null,
            amount: data.amount,
            selectedRecId: data.data.recs[0].rec_id,
            evnData: data.data // data.recs
        };
        // console.log('toJS(stateObjsMobx)', toJS(stateObjsMobx))
    }

    setErrorFetchEvents(mess) {
        this.eventState = {start: false, success: false, errorMessage: mess, amount: 0, selectedRecId: 0, evnData: {amount: 0, data: null}};
        // this.objectsEvn = {amount: 0, startFetch: false, successFetch: false, errorFetch: mess, data: null};
    }

    // bound for map
    getBndById(idObj) {

    }

}


let stateObjsMobx = new ObjsMobX();

stateObjsMobx.fetchOrgData = fetchOrgDataA
stateObjsMobx.fetchObjData = fetchObjDataA
stateObjsMobx.eventFetchByObjId = eventFetchByObjIdA

window.stateObjs = stateObjsMobx
window.toJS = toJS

// window.stateObjs = toJS(stateObjsMobx)
export default stateObjsMobx

