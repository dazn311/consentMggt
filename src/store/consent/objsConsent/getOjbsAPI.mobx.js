import axios from "axios";
import {runInAction} from "mobx";

export function fetchOrgData (userID)  {
    try {
        console.log('fetchOrgData -- orgName', userID)
        runInAction(() => {
            this.setStartFetchOrgData()

        })
            axios.post('https://ismggt.ru/query/user/info', {'userID': userID})
                .then(({data}) => {
                    console.log('fetchOrgData -- then data', data[0])
                    runInAction(() => {
                        this.setSuccessFetchOrgData(data[0])
                    })
                })
                .catch(error => {
                    runInAction(() => {
                        this.setErrorFetchOrgData(error.message)
                    })
                })
    } catch (e) {
        runInAction(() => {
            this.setErrorFetchOrgData(e.message)
        })
    }
}

export function fetchObjDataA(orgName) {
    // const endDate = new Date().toISOString();
    try {
        let objsData = sessionStorage.getItem('objsDataOfAuthUser')
        console.log('fetchOrgData -- orgName', orgName)
        console.log('fetchOrgData-sessionStorage -- objsData', objsData)

        if (JSON.stringify(objsData) === '{}' || objsData === null) { //This will check if the object is empty
            axios.post('https://ismggt.ru/query/objects/list', {
                "objectType": 2, "organization": 0, "limit": 100, "offset": 0, "startDate": "",
                "endDate": '', "objName": "", "orgName": orgName, "objKind": "", "objStatus": 10,
                "sortCol": "date", "sortType": "desc"
            })
                .then((data) => {
                    console.log('fetchOrgData -- then data', data)
                    sessionStorage.setItem('objsDataOfAuthUser', JSON.stringify(data))
                    runInAction(() => {
                        this.setSuccessFetchObjData(data)

                    })
                })
                .catch(error => {
                    runInAction(() => {
                        this.setErrorFetchOrgData(error.message)
                    })
                })

        } else {
            runInAction(() => {
                let dataLocal = JSON.parse(objsData)
                this.setSuccessFetchObjData(dataLocal)
            })
        }
    } catch (e) {
        runInAction(() => {
            this.setErrorFetchOrgData(e.message)
        })
    }
}

export default {fetchOrgData, fetchObjDataA}