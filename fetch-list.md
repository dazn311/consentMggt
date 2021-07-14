-Dashboard //290421 Dashboard page
	selectGenStats
	selectIsFetchingUserOnline


	fetchEventsPointShortAsync({limit: 1200, offset: 0}); // graphic new_rec 
	fetchAmountOGHForDashboardAsync(); 
	fetchAmountOGHToDayAsync();
	fetchAmountOGHToWeekAsync(); 
	fetchAmountOGHToThreeDaysAsync(); 
	fetchGenStatsAsync()


-LineChartWrap

fetchAmountUsers(todayStart,todayEnd);
fetchAmountNewEventsForGraphicAsync(todayStart,todayEnd);
fetchAmountEndEventsForGraphicAsync(todayStart,todayEnd);

===
historyChanges path="/stats/ogh"

	FirstTab (eventShortPoints)

		-DatePickers
		
		setDataStartforFetchEvents(new Date(eT).toISOString()); ????
		fetchEventFromPeriod(startDate, endDate);
		
		-DatePickerEnd
		fetchEventFromPeriod
		setDataEndforFetchEvents(Data + 'T23:58:00.000Z');

		-EventDetail
		fetchUpdateUsers(userDataS); // put http://localhost:3005/api/user (updateUser)

		-TabOGH
          	// перенести refactData в select modul
		
	TwoTab   //290421 historyChanges page - TwoTab
		-TabTwoMenu
			fetchAllUsersGraphic(dateStart, dateEndPlus);
			fetchAllEventsGraphic('new_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('done_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('deny_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('new_msg', dateStart, dateEndPlus);

	ThirdTab
		fetchNewOGH('new_obj', dateStart, dateEndPlus); //(fetchNewOGHThirdTabStaticPageGraphicAsync)

===========
ObjPage  path="/stats/objs)
	TabFirstObjCard from './FirstTab/tabOneMenu'
		-TabFirstObjCard	  //290421 ObjPage page - TabFirstObjCard
			selectObjsPage, // события короткие данные для таблицы
			selectObjsInfoPage, // события короткие данные для таблицы

			fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, newOffset, startDate, endDate, stFilterSearch.objName, stFilterSearch.orgName, newAllKind ,
	 			stFilterVal.objStatus,  stFilterVal.sortCol, stFilterVal.sortType)
		
        // доработать DatePickerEnd, что работал
		
		-EventDetail
			fetchObjRectList(orgRow.objID);
		-TabObjs
			 
			selectObjsInfoPage, // события короткие данные для таблицы
			fetchDataForEventShortPoints, //  дата начала и конца для запроса

			setObjCurrForDetailPage(row); 
            



	TabTwoMenu from './TwoTab/tabTwoMenu'   //290421 ObjPage page - TwoTab
		-TabTwoMenu
			selectNewEventsGraphOfStaticPage, // события короткие данные для таблицы
			selectEndEventsGraphOfStaticPage, // классификация статусов "new_msg"
			selectDenyEventsGraphOfStaticPage, // классификация статусов "new_msg"
			selectUsersOnlineGraphOfStaticPage, // for color elements
			selectNewMessageGraphOfStaticPage, //  дата начала и конца для запроса
			
			fetchAllUsersGraphic(dateStart, dateEndPlus);
			fetchAllEventsGraphic('new_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('done_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('deny_rec', dateStart, dateEndPlus);
			fetchAllEventsGraphic('new_msg', dateStart, dateEndPlus);


	TabThirdMenu from './ThirdTab/tabThirdMenu'
		-TabThirdMenu
			selectAmountNewOGH

			fetchNewOGH('new_obj', dateStart, dateEndPlus);

	
=====================
UsersPage
	TabFirstObjCard from './FirstTab/tabOneMenu'
		-TabFirstObjCard   //290421 UsersPage page - TabFirstObjCard
			selectAllUsersFromDb
			
			fetchAllUsers();	//fetchAllUsersFromDB
			setUsersFilter(val).  //setUsersNameFilterTxtForUsersPage(val)
			setOrgNameFilter(val) // setOrgNameFilterTxtForUsersPage
		-DatePickers
			fetchDataForEventShortPoints
	

	TabTwoMenu from './TwoTab/TabUsersList'
	TabTreeMenu from './ThirdTab/tabTreeMenu'

=========================
UserDetails
	-TabFirstObjCard
		





 
// Для ObjPage & historyChanges pages Tab2 -- Дублирование страницы
 





