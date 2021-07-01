import {fetchOrgData, fetchObjDataA} from "./getOjbsAPI.mobx";
import {
    // makeAutoObservable,
    makeObservable, observable, computed, action, flow
} from "mobx"



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
    relativesData;
    curObjId; // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId; // выделенный объект - выбранный пользователем /consent page 270521
    selectedObjAndRel;

    constructor() {
        this.startFetchOrg = false;
        this.successFetchOrg = false;
        this.errorFetchOrg = false;
        this.errorFetchOrgMessage = '';
        this.orgData = null;

        this.startFetchObj = false;
        this.successFetchObj = false;
        this.errorFetchObj = false;
        this.objectsData = {}; // {9750: {}, 1020: {} }
        this.relativesData = {};
        this.curObjId = null; // выделенный объект - выбранный пользователем /consent page 270521
        this.activeRelId = null; // выделенный объект - выбранный пользователем /consent page 270521
        this.selectedObjAndRel = {obj: {id: 0, objName: ''}, rel: {id: 0, relName: ''}};

        makeObservable(this, {
            startFetchOrg: observable,
            successFetchOrg: observable,
            errorFetchOrg: observable,
            orgData: observable,
            startFetchObj: observable,
            successFetchObj: observable,
            errorFetchObj: observable,
            objectsData: observable,
            relativesData: observable,

            setStartFetchOrgData: action,
            setSuccessFetchOrgData: action,
            setErrorFetchOrgData: action,
            selectObj: action,
            selectRelObj: action,
            setStartFetchObjData: action,
            setSuccessFetchObjData: action,
            setErrorFetchObjData: action,
            fetchOrgData: action,
            fetchObjData: action
        })
    }


    // organisation

    fetchOrgData() {
        console.log('fetch 1')
    }


    fetchObjData() {
        console.log('fetch 2')
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
    }

    setErrorFetchOrgData(mess) {
        this.startFetchOrg = false
        this.successFetchOrg = false
        this.errorFetchOrg = true
        this.errorFetchOrgMessage = mess
    }

    // objects
    selectObj(objId, objName = '') {
        this.selectedObjAndRel['obj'] = {id: objId, objName: objName}
    }

    selectRelObj(objId, relName = '') {
        this.selectedObjAndRel['rel'] = {id: objId, relName: relName}
    }

    setStartFetchObjData() {
        this.startFetchObj = true
        this.successFetchObj = false
        this.errorFetchObj = false
    }

    setSuccessFetchObjData(data) {
        this.startFetchObj = false
        this.successFetchObj = true
        this.errorFetchObj = false
        this.objectsData = data
    }

    setErrorFetchObjData(mess) {
        this.startFetchObj = false
        this.successFetchObj = false
        this.errorFetchObj = true
        this.errorFetchObjMessage = mess
    }



}


let stateObjsMobx = new ObjsMobX();

stateObjsMobx.fetchOrgData = fetchOrgData
stateObjsMobx.fetchObjData = fetchObjDataA

export default stateObjsMobx

