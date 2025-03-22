import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = () => {
  const [series] = useState([
    {
      name: 'Request',
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: 'Completed',
      data: [13, 23, 20, 8, 13, 27],
    },
  ]);

  const [options] = useState({
    chart: {
      type: 'bar',
      height: 50,
      stacked: true,
      toolbar: {
        show: false, // hide toolbar
      },
      zoom: {
        enabled: false, // disable zoom
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          xaxis: {
            categories: [
              '01/01/2011 GMT',
              '01/02/2011 GMT',
              '01/03/2011 GMT',
              '01/04/2011 GMT',
              '01/05/2011 GMT',
            ],
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          xaxis: {
            categories: [
              '01/01/2011 GMT',
              '01/02/2011 GMT',
              '01/03/2011 GMT',
              '01/04/2011 GMT',
              '01/05/2011 GMT',
              '01/06/2011 GMT',
              '01/07/2011 GMT',
              '01/08/2011 GMT',
              '01/09/2011 GMT',
              '01/10/2011 GMT',
              '01/11/2011 GMT',
              '01/12/2011 GMT',
            ],
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '0px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01/01/2011 GMT',
        '01/02/2011 GMT',
        '01/03/2011 GMT',
        '01/04/2011 GMT',
        '01/05/2011 GMT',
        '01/06/2011 GMT',
        '01/07/2011 GMT',
        '01/08/2011 GMT',
        '01/09/2011 GMT',
        '01/10/2011 GMT',
        '01/11/2011 GMT',
        '01/12/2011 GMT',
      ],
    },
    legend: {
      position: 'bottom',
      offsetY: 5,
    },
    fill: {
      opacity: 1,
    },
  });
  

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={120}
        className="font_sixze"
      />
    </div>
  );
};

export default Chart;
