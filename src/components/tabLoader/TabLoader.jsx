import React from 'react'
import ContentLoader from 'react-content-loader'

import {  useTheme } from '@material-ui/core/styles';

const TableLoader = props => {
  const theme = useTheme();
  const widthWin = window.innerWidth;
  let wViewBox="0 0 1200 550";
  let widthViewBox = 1200;
  if ( widthWin < 500) {
    wViewBox="0 40 414 550";
    widthViewBox = 370;

    return(
        <ContentLoader
            width={widthViewBox}
            height={550}
            viewBox={wViewBox}
            backgroundColor="#626262"
            foregroundColor={theme.palette.type === 'dark' ? "#374037": "lightgrey"}
            {...props}
        >
          <rect x="51" y="45" rx="3" ry="3" width="406" height="17" />

          {/* 1 line */}
          <rect x="84" y="115" rx="3" ry="3" width="141" height="15" />
          <rect x="255" y="115" rx="3" ry="3" width="129" height="15" />

          <rect x="55" y="155" rx="3" ry="3" width="400" height="2" />
          {/* <circle cx="880" cy="184" r="11" /> */}

          {/* 1 line */}
          <rect x="84" y="176" rx="3" ry="3" width="141" height="15" />
          <rect x="255" y="175" rx="3" ry="3" width="129" height="15" />

          <rect x="56" y="216" rx="3" ry="3" width="397" height="2" />

          {/* 1 line */}
          <rect x="84" y="234" rx="3" ry="3" width="141" height="15" />
          <rect x="255" y="233" rx="3" ry="3" width="129" height="15" />

          <rect x="57" y="274" rx="3" ry="3" width="397" height="2" />

          {/* 1 line */}
          <rect x="84" y="295" rx="3" ry="3" width="141" height="15" />
          <rect x="255" y="294" rx="3" ry="3" width="129" height="15" />

          <rect x="58" y="335" rx="3" ry="3" width="397" height="2" />

          {/* 1 line */}
          <rect x="84" y="355" rx="3" ry="3" width="141" height="15" />
          <rect x="255" y="354" rx="3" ry="3" width="129" height="15" />

          <rect x="57" y="395" rx="3" ry="3" width="397" height="2" />

          {/*vertical*/}
          <rect x="51" y="49" rx="3" ry="3" width="2" height="380" />
          <rect x="412" y="49" rx="3" ry="3" width="2" height="380" />
          {/*нижняя линия*/}
          <rect x="57" y="428" rx="3" ry="3" width="397" height="2" />

          <rect x="52" y="80" rx="3" ry="3" width="416" height="17" />
          <rect x="53" y="57" rx="3" ry="3" width="32" height="33" />
          <rect x="222" y="54" rx="3" ry="3" width="32" height="33" />
          <rect x="382" y="56" rx="3" ry="3" width="72" height="33" />
          <circle cx="313" cy="413" r="11" />
          <circle cx="343" cy="413" r="11" />
          <circle cx="373" cy="413" r="11" />
        </ContentLoader>
    )

  }
  return(
  <ContentLoader
    width={widthViewBox}
    height={550}
    viewBox={wViewBox}
    backgroundColor="#626262"
    foregroundColor={theme.palette.type === 'dark' ? "#374037": "lightgrey"}
    {...props}
  >
    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
    {/* <circle cx="879" cy="123" r="11" /> */}
    <rect x="854" y="115" rx="3" ry="3" width="91" height="15" />
    {/* <circle cx="914" cy="123" r="11" /> */}
    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
    {/* <circle cx="880" cy="184" r="11" /> */}
    <rect x="854" y="175" rx="3" ry="3" width="91" height="15" />
    {/* <circle cx="915" cy="184" r="11" /> */}
    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
    {/* <circle cx="881" cy="242" r="11" /> */}
    <rect x="854" y="235" rx="3" ry="3" width="91" height="15" />
    {/* <circle cx="916" cy="242" r="11" /> */}
    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
    {/* <circle cx="882" cy="303" r="11" /> */}
    <rect x="854" y="295" rx="3" ry="3" width="91" height="15" />
    {/* <circle cx="917" cy="303" r="11" /> */}
    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" /> 
    {/* <circle cx="881" cy="363" r="11" /> */}
    <rect x="854" y="355" rx="3" ry="3" width="91" height="15" />
    {/* <circle cx="916" cy="363" r="11" /> */}
    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
    <rect x="51" y="49" rx="3" ry="3" width="2" height="380" />
    <rect x="955" y="49" rx="3" ry="3" width="2" height="380" />
    <rect x="57" y="428" rx="3" ry="3" width="897" height="2" />
    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
    <circle cx="813" cy="413" r="11" />
    <circle cx="843" cy="413" r="11" />
    <circle cx="873" cy="413" r="11" />
    <circle cx="903" cy="413" r="11" />
    <circle cx="933" cy="413" r="11" />
  </ContentLoader>
)}

TableLoader.metadata = {
  name: 'Sridhar Easwaran',
  github: 'sridhareaswaran',
  description: 'Loader for Tables',
  filename: 'TableLoader',
}

export default TableLoader