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
        text: 'Revenue by Date',
        align: 'left'
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
        text: 'Revenue by Source',
        align: 'left'
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
        text: 'Revenue by Source',
        align: 'left'
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

export const revenueByCountryOptions = ({totalRevenueByCountry}) => ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Revenue by Country',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/> Revenue on the last 30 days: <b>$ {point.tooltip.revenue}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: false,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        },
        ignoreHiddenPoint: false
    },
    series: [
        {
            name: 'Revenue by Country',
            colorByPoint: true,
            data: totalRevenueByCountry.sort((a,b) => a[1] - b[1]).map( (item,i) => {
                const dataRow = {
                    name: item[0],
                    y: item[1],
                    tooltip: {
                        revenue: Highcharts.numberFormat(item[2], 0, ',', '.')
                    }
                };

                if (i === 0) {
                    return {
                        ...dataRow,
                        sliced: true,
                        selected: true
                    }
                }
                return dataRow;
            })
        }
    ]
});