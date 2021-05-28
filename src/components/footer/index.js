import React from 'react';
// import  EXIF, {getData} from 'exif-js';
// import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'; 
//new Date(document.lastModified).toLocaleString()
// import {formatDateISO} from '../../hoc/formatDate'
// import PicImg from '../../static/images/images.png'
// import mon from '../../static/images/mon.JPG'
import {buildVersion} from './buildVersion'
export default function Copyright() {
    // const newDate = new Date().toLocaleDateString() + ' (' + new Date().getHours() + ':' + new Date().getMinutes() + ')';

    // const img = new Image();
    // img.onload = function() {
    //     // alert(this.width + 'x' + this.height);
    //     console.log('img.onload', this.width, this.height, this.offsetHeight );
    // }
    // img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
    // console.log('img.sizes',img.getClientRects())
    // const fileSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-oHE7goGG5J-E6apSHcB6xD8182b94k6yw&usqp=CAU';
    //
    // console.log('footer refresh')
    // EXIF.getData(mon, function() {
    //     let exifData = EXIF.pretty(this);
    //     console.log('start EXIF')
    //     if (exifData) {
    //         console.log('exifData',exifData);
    //         console.log(EXIF.getTag(this, "Orientation"));
    //     } else {
    //         console.log("No EXIF data found in image '" + PicImg.name + "'.");
    //     }
    // });
    //
    // function handleChange({
    //                           target: {
    //                               files: [file]
    //                           }
    //                       }) {
    //     if (file && file.name) {
    //         EXIF.getData(file, function() {
    //             var exifData = EXIF.pretty(this);
    //             if (exifData) {
    //                 console.log(exifData);
    //                 console.log(EXIF.getTag(this, "Orientation"));
    //             } else {
    //                 console.log("No EXIF data found in image '" + file.name + "'.");
    //             }
    //         });
    //     }
    // }

    // let reader = new FileReader();
    // reader.readAsDataURL(mon);
    // reader.onload = () => {
    //     console.log(reader.result);
    // }
    // reader.onerror = () => {
    //     console.log(reader.error);
    // }

    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '} <Link color="inherit" href="https://mggt.ru/"> МосГеоТрест </Link>{' '}{new Date().getFullYear()}
        {'.'}<span style={{color:'grey'}} >build date: {buildVersion}</span>


      </Typography>
    );
  }