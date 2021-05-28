import React from 'react'
import { Doughnut } from 'react-chartjs-2'


let data = {
  labels: ['В разработке ОГХ МГГТ', 'ОГХ смежников'],
  datasets: [
    {
      label: '# Объектов',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const ColomsChart = ({dataArr}) => {
    // console.log('dataArr',dataArr);
    data.datasets[0].data = dataArr;
    data.labels[0] = 'В разработке ОГХ МГГТ (' + dataArr[0] +')';
    data.labels[1] = 'ВОГХ смежников (' + dataArr[1] +')';

    return (
        <React.Fragment>
          <Doughnut data={data} />
        </React.Fragment>
      )
}

export default ColomsChart