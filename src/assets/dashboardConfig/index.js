//Highcharts
import Highcharts from 'highcharts';

//highcharts initial config
export const revenueByDateOptions = ({
    existingCustomerRevenue,
    newCustomerRevenue,
    totalOrders,
    newCustomerOrders
}) => ({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Revenue by Date'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%e %b'
        }
    },
    yAxis: [
        {
            title: {
                text: 'Existing Customer Revenue'
            },
            stackLabels: {
                enabled: true,
                formatter: function () {
                  return '$' + Highcharts.numberFormat(this.total, 0, ',', '.');
                }
            }
        },
        {
            labels: {
                formatter: function() {
                    const value = this.value;
                    const shortValue = parseFloat(value / 1000);

                    return `${shortValue}K`}
            },
            title: {
                text: 'Total Orders'
            },
            opposite: true,
            max: 2500
        }
    ],
    tooltip: {
        formatter: function() {
          return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>$${Highcharts.numberFormat(this.y, 0, ",", ".")}</b><br/><span style="color:${this.color}">\u25CF</span> Date: <b>${new Date(this.x).getDate() + '/' + (new Date(this.x).getMonth() + 1)}</b><br/>`;
        },
    },
    plotOptions: {
        column: {
            stacking: 'normal'
        },
        spline: {
            marker: {
                enabled: false
            }
        }
    },
    series: [
        {
            name: 'Existing Customer Revenue',
            data: existingCustomerRevenue,
            yAxis: 0
        },
        {
            name: 'New Customer Revenue',
            data: newCustomerRevenue,
            yAxis: 0
        },
        {
            type: 'spline',
            name: 'Total Orders',
            data: totalOrders,
            yAxis: 1
        },
        {
            type: 'spline',
            name: 'New Customer Orders',
            data: newCustomerOrders,
            yAxis: 1
        }
    ]
});

export const revenueBySourcePercentageOptions = ({revenueBySourcePercentage}) => ({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Revenue by Source'
    },
    xAxis: {
        categories: revenueBySourcePercentage[0]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage'
        },
        labels: {
            formatter: function() {
                var value = this.value;
                var suffixes = ["", "k", "M", "G", "T", "P", "E"];
                var suffixNum = Math.floor((""+value).length/3);
                var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
                if (shortValue % 1 !== 0) {
                    shortValue = shortValue.toFixed(1);
                }
                return shortValue+suffixes[suffixNum];
            }
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [
        ...revenueBySourcePercentage[1].map( item => ({
            name: item[0],
            data: item[1]
        }))
    ]
});

export const revenueBySourceOptions = ({totalRevenueBySource}) => ({
    chart: {
        type: 'column',
        inverted: true
    },
    title: {
        text: 'Revenue by Source'
    },
    xAxis: {
        categories: totalRevenueBySource.map( item => item[0])
    },
    yAxis: {
        labels: {
            formatter: function() {
                var value = this.value;
                var suffixes = ["", "k", "M", "G", "T", "P", "E"];
                var suffixNum = Math.floor((""+value).length/3);
                var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
                if (shortValue % 1 !== 0) {
                    shortValue = shortValue.toFixed(1);
                }
                return shortValue+suffixes[suffixNum];
            }
        }
    },
    tooltip: {
        formatter: function() {
          return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>$${Highcharts.numberFormat(this.y, 0, ",", ".")}</b><br/>`;
        },
    },
    series: [
        {
            name: 'Revenue by Source',
            data: totalRevenueBySource.map( item => item[1]),
            dataLabels: {
                enabled: false
            }
        }
    ]
});