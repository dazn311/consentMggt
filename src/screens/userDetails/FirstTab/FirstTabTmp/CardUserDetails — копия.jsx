import React, { useEffect } from 'react';
 

import { makeStyles } from '@material-ui/core/styles'; 
 
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '95%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: 'auto',
    border: '1px solid #8080802e',
    margin: '4px 8px',
  },
  span: {
    color: '#1976d2'
  },
  red: {
    color: 'red'
  }
}));
// curUser={curUser} objRect={selectObjRect}
const CardUserDetails = ({ curUser }) => {
  const classNamees = useStyles();

  console.log('curUser', curUser); 

 
 
  // const formatDate = (data) => {
  //   // console.log('999 data',data);
  //   return new Intl.DateTimeFormat('ru-Ru').format(new Date(data))
  // }

  return (
    <div className="row">
        <div className="col-md-4">
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-star"/> </span>
                    <span className="panel-title"> User Popularity</span>
                </div>
                <div className="panel-body pn">
                    <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr className="hidden">
                                <th className="mw30">#</th>
                                <th>First Name</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="fa fa-desktop text-warning"></span>
                                </td>
                                <td>Television</td>
                                <td> <i className="fa fa-caret-up text-info pr10"/>$855,913</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-microphone text-primary"></span></td>
                                <td>Radio</td>
                                <td> <i className="fa fa-caret-down text-danger pr10"/>$349,712</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td>Newspaper</td>
                                <td> <i className="fa fa-caret-up text-info pr10"/>$1,259,742</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-trophy"/> </span>
                    <span className="panel-title"> My Skills</span>
                </div>
                <div className="panel-body pb5">
                    <span className="label label-warning mr5 mb10 ib lh15">Default</span>
                    <span className="label label-primary mr5 mb10 ib lh15">Primary</span>
                    <span className="label label-info mr5 mb10 ib lh15">Success</span>
                    <span className="label label-success mr5 mb10 ib lh15">Info</span>
                    <span className="label label-alert mr5 mb10 ib lh15">Warning</span>
                    <span className="label label-system mr5 mb10 ib lh15">Danger</span>
                    <span className="label label-info mr5 mb10 ib lh15">Success</span>
                    <span className="label label-success mr5 mb10 ib lh15">Ui Design</span>
                    <span className="label label-primary mr5 mb10 ib lh15">Primary</span>
                </div>
            </div>

            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-pencil"/>
                    </span> <span className="panel-title">About Me</span>
                </div>
                <div className="panel-body pb5">
                    <h6>Experience</h6>

                    <h4>Facebook Internship</h4>

                    <p className="text-muted" > University of Missouri, Columbia <br/> Student Health Center, June 2010 - 2012 </p>

                    <hr className="short br-lighter"/>

                    <h6>Education</h6>
                    <h4>Bachelor of Science, PhD</h4>
                    <p className="text-muted"> University of Missouri, Columbia <br/> Student Health Center, June 2010 through Aug 2011</p>
                    <hr className="short br-lighter"/>
                    <h6>Accomplishments</h6>
                    <h4>Successful Business</h4>
                    <p className="text-muted pb10"> University of Missouri, Columbia <br/> Student Health Center, June 2010 through Aug 2011</p>
                </div>
            </div>
        </div>
    </div>
  );
}

 

export default  CardUserDetails ;
