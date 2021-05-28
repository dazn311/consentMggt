import React from 'react';

import { connect } from 'react-redux';


import { countUsers, countOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
 
import DetailLineItem from '../detailLineItem/detailLineItem.component';
import { Chart } from 'react-charts'
import './blockOGH.styles.scss';


 
const BlockOGH = ({ users, ogh }) => {
    const usersData =  users.data;
    // console.log(users);
    const data = React.useMemo(
        () => [
          {
            label: 'Users',
            data: [[8, 0], [9, 2], [12, 22], [13, 32], [14, 37], [16, 48], [17, 13], [18, 6]]
          },
          {
            label: 'Events',
            data: [[8, 3], [9, 1], [12, 5], [13, 6], [14, 4], [16, 4], [18, 4], [19, 0]]
          },
          {
            label: 'Orders',
            data: [[8, 0], [9, 0], [12, 1], [13, 2], [14, 2], [16, 4], [18, 1], [19, 0]]
          }
        ],
        []
      )
     
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'time', position: 'left' }
        ],
        []
      )
      const series = React.useMemo(
        () => ({
          showPoints: true
        }),
        []
      )

    return (
        <div  className="admin-list-graphics">
            <div className="list-group">
                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">объекты ОГХ</div>
                    <table className="table table-hover" >
                        <tbody>
                            <DetailLineItem header="Количество наших объектов: " contect={ogh.data.objMggt}/>
                            <DetailLineItem header="Количество смежных объектов: " contect={ogh.data.objRelatives}/> 
                            <DetailLineItem header="Последнее обновление данных:" contect={ogh.dataTime}/>
                        </tbody>
                    </table>
                </div>

                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Пользователи</div>
                    <table className="table table-hover" >
                        <tbody>
                            <DetailLineItem header="Операторов:" contect={usersData.operators}/>
                            <DetailLineItem header="Стороних пользователей:" contect={usersData.users}/>
                            <DetailLineItem header="Последнее обновление данных:" contect={users.dataTime}/>
                            
                        </tbody>
                    </table>
                </div>

                
            </div>
            <div className="list-group">
                <div className="graphics-activeCompany">
                    <div className="admin-list__header header-tab mr-m20-twig">Диаграмма активности</div>
                    <div className="char-wrap">
                        <Chart series={series} data={data} axes={axes} />
                    </div>
                    <div className="wrap-graphic-desc">
                        <div className='graphic-desc users'>График пользователей</div>
                        <div className='graphic-desc'> | </div>
                        <div className='graphic-desc events'>График созданных событий</div>
                        <div className='graphic-desc'> | </div>
                        <div className='graphic-desc orders'>закрытые заявки(шт).</div>
                    </div>
                    
                </div>

                

                
            </div>
        </div>
        
    )
}

  const mapStateToProps = (state) => ({
    users: countUsers(state),
    ogh: countOGH(state),
  })

  export default connect(mapStateToProps)(BlockOGH);
   