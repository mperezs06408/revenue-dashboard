import React, { useState, useEffect} from 'react';

//CSV Manage
import { fetchData } from 'api/getCSVInfo';
import moment from 'moment';

const CSV_PATH = '/revenue-dashboard/revenue-by-date.csv';
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatter =  (value) => {
    const valueToInt = parseInt(value)
    const suffixes = ["", "k", "M", "G", "T", "P", "E"];
    const suffixNum = Math.floor((""+valueToInt).length/3);
    let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : valueToInt).toPrecision(2));
    console.log(shortValue);
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }

    console.log('type', Number.isInteger(value))
    return Number.isInteger(value) ?
                shortValue+suffixes[suffixNum] : 
                value.toFixed(2)
    ;
}

export function useDashboardData() {
    const [data, setData] = useState([]);
    const [generalMetrics, setGeneralMetrics] = useState({
        totalRevenue:0,
        generalTotalOrders:0,
        newCustomers:0,
        percentageNewCustomersRevenue:0
    })
    const [averagePerformance, setAveragePerformance] = useState({
        avgRevenueDay:0,
        avgOrdersDay:0,
        avgItemsPerOrder:0,
        avgOrderValue:0,
        avgNewCustomersPerDay:0
    })
    const [revenueByDate, setRevenueByDate] = useState({
        existingCustomerRevenue: [],
        newCustomerRevenue: [],
        totalOrders: [],
        newCustomerOrders: []
    });
    const [revenueBySource, setRevenueBySource] = useState({
        totalRevenueBySource: [],
        revenueBySourcePercentage: [[],['','',[]]]
    })

    const {
        totalRevenue,
        generalTotalOrders,
        newCustomers,
        percentageNewCustomersRevenue
    } = generalMetrics;

    const {
        avgRevenueDay,
        avgOrdersDay,
        avgItemsPerOrder,
        avgOrderValue,
        avgNewCustomersPerDay
    } = averagePerformance;
    
    const {
        existingCustomerRevenue,
        newCustomerRevenue,
        totalOrders,
        newCustomerOrders
    } = revenueByDate

    const {
        totalRevenueBySource,
        revenueBySourcePercentage
    } = revenueBySource;
    
    useEffect(() => {
        fetchData(CSV_PATH, setDataFromCSV)
    }, []);

    useEffect(() => {
        const monthLabels = [...new Set(data.map((row) => row.order_date))];
        const sourcesLabels = [...new Set(data.map((row) => row.order_revenue_source))];

        orderByGeneralMetrics();
        orderByDashboardRevenues(monthLabels);
        OrderByDashboardRevenueSource(sourcesLabels);
    }, [data])

    const setDataFromCSV = (results) => {
        let newData = results.data.map( (row) => {
            const timestamp = moment(row.order_date, ['M/D/YY','DD/MM/YYYY']).valueOf();

            return {
                ...row,
                order_date: timestamp
            }
        })

        newData = newData.sort((a, b) => {
            return a.order_date - b.order_date
        })

        newData = getLast30DaysData(newData);

        setData(newData)
    }

    const getLast30DaysData = (array) => {
        const mostRecentDay = array[array.length - 1].order_date;

        const dateFromArr = new Date(mostRecentDay)

        dateFromArr.setDate(dateFromArr.getDate() - 30);

        const dataFiltered = array.filter( (row) => {
            const timestamptToDate = new Date(row.order_date);

            return timestamptToDate > dateFromArr
        })

        return dataFiltered;
    }

    const orderByGeneralMetrics = () => {
        let countTotalRevenue = 0;
        let countTotalOrders = 0;
        let countNewCustomers = 0;
        let countNewCustomersRevenue = 0.0;

        let avgItemsOrder = 0;
        let totalItemsQuantity = 0;

        for (let i = 0; i < data.length; i++) {
            const value = data[i];

            countTotalRevenue+= Math.floor(value.order_revenue)
            countTotalOrders += parseInt(value.num_orders);
            avgItemsOrder += parseInt(value.item_quantity);
            totalItemsQuantity += parseInt(value.item_quantity);
            
            if (value.customer_type === 'New') {
                countNewCustomers += 1;
                countNewCustomersRevenue+= parseFloat(value.order_revenue)
            }
        }

        const avgRevenueDay = parseInt(countTotalRevenue/30);
        const avgOrdersDay = parseInt(countTotalOrders/30);
        avgItemsOrder = avgItemsOrder/data.length;
        const avgOrderValue = countTotalRevenue/totalItemsQuantity;
        const avgNewCustomersDay = parseInt(countNewCustomers/30);

        setGeneralMetrics({
            ...generalMetrics,
            totalRevenue: formatter(countTotalRevenue),
            generalTotalOrders:formatter(countTotalOrders),
            newCustomers:formatter(countNewCustomers),
            percentageNewCustomersRevenue: formatter(parseFloat((countNewCustomersRevenue / countTotalRevenue) * 100))
        });
        setAveragePerformance({
            ...averagePerformance,
            avgRevenueDay:formatter(avgRevenueDay),
            avgOrdersDay:avgOrdersDay,
            avgItemsPerOrder:formatter(avgItemsOrder),
            avgOrderValue:formatter(avgOrderValue),
            avgNewCustomersPerDay:avgNewCustomersDay
        });
    }
    const orderByDashboardRevenues = (labels) => {
        let dataPivot = data;
        let dataNewCustomersResume = [];
        let dataExistingCustomerResume = [];
        let dataTotalOrders = [];
        let dataNewCustomerOrders = [];
        let checkedItems = [];

        for (let i = 0; i < labels.length; i++) {
            let countNewCustomers = 0.0;
            let countExistingCustomers = 0.0;
            let countTotalOrders = 0.0;
            let countNewCustomerOrders = 0.0;

            for (let j = 0; j < dataPivot.length; j++) {
                if (checkedItems.includes(j)) continue;

                const value = dataPivot[j];

                if (labels[i] === value.order_date) {                    
                    if (value.customer_type === 'Existing') countExistingCustomers += parseFloat(value.order_revenue);
                    
                    if (value.customer_type === 'New') {
                        countNewCustomers += parseFloat(value.order_revenue);
                        countNewCustomerOrders += parseFloat(value.num_orders);
                    }

                    countTotalOrders += parseFloat(value.num_orders);

                    checkedItems.push(j);
                }
            }

            dataNewCustomersResume.push([labels[i], parseInt(countNewCustomers)]);
            dataExistingCustomerResume.push([labels[i], parseInt(countExistingCustomers)]);
            dataTotalOrders.push([labels[i], parseInt(countTotalOrders)])
            dataNewCustomerOrders.push([labels[i], parseInt(countNewCustomerOrders)])
        }

        setRevenueByDate({
            ...revenueByDate,
            existingCustomerRevenue: dataExistingCustomerResume,
            newCustomerRevenue: dataNewCustomersResume,
            totalOrders:dataTotalOrders,
            newCustomerOrders:dataNewCustomerOrders
            
        })
    }

    const OrderByDashboardRevenueSource = (labels) => {
        let mostRecentDate = new Date();
        let datesArray = [Date.now(), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7)].reverse();

        if (data.length != 0) {
            mostRecentDate = new Date(data[data.length-1].order_date);
            datesArray = [data[data.length-1].order_date, mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7)].reverse();
        }

        let dataBySource = [];
        let dataBySourcePercentage = [];
        let checkedItems = [];

        for (let i = 0; i < labels.length; i++) {
            let countRevenue = 0.0;
            let dateArrayIndex = 0;
            let revenueByWeek = [0,0,0,0,0];
            const label = labels[i];

            for (let j = 0; j < data.length; j++) {
                if (checkedItems.includes(j)) continue;

                const value = data[j];
                if (label === value.order_revenue_source) {
                    countRevenue+= parseFloat(value.order_revenue);
                    checkedItems.push(j);

                    const valueDate = new Date(value.order_date);
                    let dateArrayValue = new Date(datesArray[dateArrayIndex]);
                    let weekRevenue = 0;
                    
                    if (valueDate <= dateArrayValue) {
                        weekRevenue = revenueByWeek[dateArrayIndex] + parseInt(value.order_revenue)
                        revenueByWeek[dateArrayIndex] = weekRevenue
                    } else {
                        weekRevenue = revenueByWeek[dateArrayIndex + 1] + parseInt(value.order_revenue)
                        revenueByWeek[dateArrayIndex + 1] = weekRevenue;
                        dateArrayIndex += 1;
                    }
                }
            }
            
            dataBySourcePercentage.push([label, revenueByWeek])
            dataBySource.push([label, parseInt(countRevenue)]);
        }

        console.log(datesArray.map(timestamp => `${monthNames[new Date(timestamp).getMonth()]} ${new Date(timestamp).getDate()}`));
        console.log([datesArray.map(timestamp => `${monthNames[new Date(timestamp).getMonth()]} ${new Date(timestamp).getDate()}`), dataBySourcePercentage.sort((a,b) =>  a[1].reduce((pSum, i) => pSum + i) - b[1].reduce((pSum, i) => pSum + i))], 'arr')
        setRevenueBySource({
            ...revenueBySource,
            totalRevenueBySource: dataBySource.sort((a,b) => b[1] - a[1]),
            revenueBySourcePercentage: [datesArray.map(timestamp => `${monthNames[new Date(timestamp).getMonth()]} ${new Date(timestamp).getDate()}`), dataBySourcePercentage.sort((a,b) =>  a[1].reduce((pSum, i) => pSum + i) - b[1].reduce((pSum, i) => pSum + i))]
        })
    }



    const states = {
        totalRevenue,
        generalTotalOrders,
        newCustomers,
        percentageNewCustomersRevenue,
        avgRevenueDay,
        avgOrdersDay,
        avgItemsPerOrder,
        avgOrderValue,
        avgNewCustomersPerDay,
        existingCustomerRevenue,
        newCustomerRevenue,
        totalOrders,
        newCustomerOrders,
        totalRevenueBySource,
        revenueBySourcePercentage
    }

    return {
        states
    }
}