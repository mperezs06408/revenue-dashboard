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
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [previousData, setPreviousData] = useState([]);
    const [generalMetrics, setGeneralMetrics] = useState({
        isLoading: true,
        totalRevenue:0,
        generalTotalOrders:0,
        newCustomers:0,
        percentageNewCustomersRevenue:0,
        variationTotalRevenue:0,
        variationGeneralTotalOrders:0,
        variationNewCustomers:0,
        variationNewCustomersRevenue:0
    })
    const [averagePerformance, setAveragePerformance] = useState({
        isLoading: true,
        avgRevenueDay:0,
        avgOrdersDay:0,
        avgItemsPerOrder:0,
        avgOrderValue:0,
        avgNewCustomersPerDay:0,
        variationAvgRevenueDay:0,
        variationAvgOrdersDay:0,
        variationAvgItemsPerOrder:0,
        variationAvgOrderValue:0,
        variationAvgNewCustomersPerDay:0,
    })
    const [revenueByDate, setRevenueByDate] = useState({
        isLoading: true,
        existingCustomerRevenue: [],
        newCustomerRevenue: [],
        totalOrders: [],
        newCustomerOrders: []
    });
    const [revenueBySource, setRevenueBySource] = useState({
        isLoading: true,
        totalRevenueBySource: [],
        revenueBySourcePercentage: [[],['','',[]]]
    })
    const [revenueByCountry, setRevenueByCountry] = useState({
        isLoading: true,
        totalRevenueByCountry: [['',0]]
    })

    const {
        totalRevenue,
        generalTotalOrders,
        newCustomers,
        percentageNewCustomersRevenue,
        variationTotalRevenue,
        variationGeneralTotalOrders,
        variationNewCustomers,
        variationNewCustomersRevenue,
    } = generalMetrics;

    const {
        avgRevenueDay,
        avgOrdersDay,
        avgItemsPerOrder,
        avgOrderValue,
        avgNewCustomersPerDay,
        variationAvgRevenueDay,
        variationAvgOrdersDay,
        variationAvgItemsPerOrder,
        variationAvgOrderValue,
        variationAvgNewCustomersPerDay,
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

    const {
        totalRevenueByCountry
    } = revenueByCountry
    
    useEffect(() => {
        fetchData(CSV_PATH, setDataFromCSV)
    }, []);

    useEffect(() => {
        if (!!data.length) {
            const monthLabels = [...new Set(data.map((row) => row.order_date))];
            const sourcesLabels = [...new Set(data.map((row) => row.order_revenue_source))];
            const countryLabels = [...new Set(data.map((row) => row.order_country))];
    
            orderByGeneralMetrics();
            orderByDashboardRevenues(monthLabels);
            orderByDashboardRevenueSource(sourcesLabels);
            orderByCountriesRevenue(countryLabels);
        }
    }, [data])

    useEffect(() => {
        console.log(generalMetrics.isLoading, averagePerformance.isLoading, revenueByDate.isLoading, revenueBySource.isLoading);
        if (!generalMetrics.isLoading && !averagePerformance.isLoading && !revenueByDate.isLoading && !revenueBySource.isLoading && !revenueByCountry.isLoading) {
            setIsLoading(false);
            console.log(totalRevenueByCountry);
        }

    }, [generalMetrics.isLoading, averagePerformance.isLoading, revenueByDate.isLoading, revenueBySource.isLoading, revenueByCountry.isLoading])

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

        newData = getLast60DaysData(newData);

        setData(newData.one_month_ago);
        setPreviousData(newData.two_months_ago);
    }

    const getLast60DaysData = (array) => {
        const mostRecentDay = array[array.length - 1].order_date;

        const dateFrom30DaysAgo = new Date(mostRecentDay)
        dateFrom30DaysAgo.setDate(dateFrom30DaysAgo.getDate() - 30);

        const dateFrom60DaysAgo = new Date(dateFrom30DaysAgo);
        dateFrom60DaysAgo.setDate(dateFrom60DaysAgo.getDate() - 30);

        let dataFilteredFrom60DA = array.filter( (row) => {
            const timestamptToDate = new Date(row.order_date);

            return timestamptToDate > dateFrom60DaysAgo
        })

        const dataFilteredFrom30DA = dataFilteredFrom60DA.filter( (row) => {
            const timestampToDate = new Date(row.order_date);

            return timestampToDate > dateFrom30DaysAgo
        })
        dataFilteredFrom60DA = dataFilteredFrom60DA.filter( (row) => {
            const timestampToDate = new Date(row.order_date);

            return timestampToDate <= dateFrom30DaysAgo
        })


        return {
            "one_month_ago" : dataFilteredFrom30DA,
            "two_months_ago" : dataFilteredFrom60DA
        };
    }

    const orderByGeneralMetrics = () => {
        const countTotalRevenue = data.reduce((accumulator, item) => accumulator + Math.floor(item.order_revenue),0);
        const countTotalOrders = data.reduce((accumulator, item) => accumulator + parseInt(item.num_orders),0);
        const countNewCustomers = data.reduce((accumulator, item) => item.customer_type === "New" ? accumulator + 1 : accumulator,0);
        const countNewCustomersRevenue = data.reduce((accumulator, item) => item.customer_type === "New" ? accumulator + parseFloat(item.order_revenue) : accumulator,0);
        const totalItemsQuantity = data.reduce((accumulator, item) => accumulator + parseInt(item.item_quantity),0);
        const avgItemsOrder = totalItemsQuantity/countTotalOrders;

        //Previous metrics
        const previousCountTotalRevenue = previousData.reduce((accumulator, item) => accumulator + Math.floor(item.order_revenue),0);
        const previousCountTotalOrders = previousData.reduce((accumulator, item) => accumulator + parseInt(item.num_orders),0);
        const previousCountNewCustomers = previousData.reduce((accumulator, item) => item.customer_type === "New" ? accumulator + 1 : accumulator,0);
        const previousCountNewCustomersRevenue = previousData.reduce((accumulator, item) => item.customer_type === "New" ? accumulator + parseFloat(item.order_revenue) : accumulator,0);
        const previousTotalItemsQuantity = previousData.reduce((accumulator, item) => accumulator + parseInt(item.item_quantity),0);
        const previousAvgItemsOrder = previousTotalItemsQuantity/previousCountTotalOrders;

        console.log('prev', previousCountTotalRevenue)

        const avgRevenueDay = parseInt(countTotalRevenue/30);
        const avgOrdersDay = parseInt(countTotalOrders/30);
        const avgOrderValue = countTotalRevenue/countTotalOrders;
        const avgNewCustomersDay = parseInt(countNewCustomers/30);

        //Previous metrics
        const previousAvgRevenueDay = parseInt(previousCountTotalRevenue/30);
        const previousAvgOrdersDay = parseInt(previousCountTotalOrders/30);
        const previousAvgOrderValue = previousCountTotalRevenue/previousCountTotalOrders;
        const previousAvgNewCustomersDay = parseInt(previousCountNewCustomers/30);

        const diffPercentage = (previousValue, currentValue) => Math.floor(((currentValue - previousValue)/previousValue) * 100)

        setGeneralMetrics({
            ...generalMetrics,
            isLoading: false,
            totalRevenue: formatter(countTotalRevenue),
            generalTotalOrders:formatter(countTotalOrders),
            newCustomers:formatter(countNewCustomers),
            percentageNewCustomersRevenue: formatter(parseFloat((countNewCustomersRevenue / countTotalRevenue) * 100)),
            variationTotalRevenue: diffPercentage(previousCountTotalRevenue, countTotalRevenue),
            variationGeneralTotalOrders: diffPercentage(previousCountTotalOrders,countTotalOrders),
            variationNewCustomers: diffPercentage(previousCountNewCustomers,countNewCustomers),
            variationNewCustomersRevenue: diffPercentage(previousCountNewCustomersRevenue,countNewCustomersRevenue),
        });
        console.log(diffPercentage(previousAvgOrderValue,avgOrderValue),previousAvgOrderValue,avgOrderValue);
        setAveragePerformance({
            ...averagePerformance,
            isLoading: false,
            avgRevenueDay:formatter(avgRevenueDay),
            avgOrdersDay:avgOrdersDay,
            avgItemsPerOrder:formatter(avgItemsOrder),
            avgOrderValue:formatter(avgOrderValue),
            avgNewCustomersPerDay:avgNewCustomersDay,
            variationAvgRevenueDay:diffPercentage(previousAvgRevenueDay,avgRevenueDay),
            variationAvgOrdersDay:diffPercentage(previousAvgOrdersDay,avgOrdersDay),
            variationAvgItemsPerOrder:diffPercentage(previousAvgItemsOrder,avgItemsOrder),
            variationAvgOrderValue:diffPercentage(previousAvgOrderValue,avgOrderValue),
            variationAvgNewCustomersPerDay:diffPercentage(previousAvgNewCustomersDay,avgNewCustomersDay),
        })
    }
    const orderByDashboardRevenues = (labels) => {
        let dataNewCustomersResume = [];
        let dataExistingCustomerResume = [];
        let dataNewCustomerOrders = [];
        let dataTotalOrders = [];

        const newCustomers = data.filter(row => row.customer_type === "New");
        const existingCustomers = data.filter(row => row.customer_type === "Existing");

        labels.map((label) => {
            const dataPivot = data.filter(row => label === row.order_date);
            const newCustomersPivot = newCustomers.filter(row => label === row.order_date);
            const existingCustomersPivot = existingCustomers.filter(row => label === row.order_date);


            const countNewCustomersRevenue = newCustomersPivot.reduce((accumulator, item) => accumulator + parseFloat(item.order_revenue), 0);
            const countExistingCustomersRevenue = existingCustomersPivot.reduce((accumulator, item) => accumulator + parseFloat(item.order_revenue), 0);
            const countTotalOrders = dataPivot.reduce((accumulator, item) => accumulator + parseInt(item.num_orders),0);
            const countNewCustomerOrders = newCustomersPivot.reduce( (accumulator, item) => accumulator + parseInt(item.num_orders),0);

            dataNewCustomersResume.push([label, parseInt(countNewCustomersRevenue)]);
            dataExistingCustomerResume.push([label, parseInt(countExistingCustomersRevenue)]);
            dataTotalOrders.push([label, parseInt(countTotalOrders)])
            dataNewCustomerOrders.push([label, parseInt(countNewCustomerOrders)])
        })

        setRevenueByDate({
            ...revenueByDate,
            isLoading: false,
            existingCustomerRevenue: dataExistingCustomerResume,
            newCustomerRevenue: dataNewCustomersResume,
            totalOrders:dataTotalOrders,
            newCustomerOrders:dataNewCustomerOrders
            
        })
    }

    const orderByDashboardRevenueSource = (labels) => {
        let mostRecentDate = new Date(data[data.length-1].order_date);
        let datesArray = [data[data.length-1].order_date, mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7), mostRecentDate.setDate(mostRecentDate.getDate() - 7)].reverse();

        let dataBySource = [];
        let dataBySourcePercentage = [];

        labels.map((label) => {
            let lastDateComparison = null;

            const dataPivot = [...data.filter( row => label === row.order_revenue_source)];
            const revenueByWeek = [
                ...datesArray.map((date, i) => {
                    const dateComparison = new Date(date);
                    if (i !== 0) {
                        lastDateComparison = new Date(datesArray[i-1])
                    }

                    const sumPerDate = dataPivot.reduce((accumulator, item) => {
                        const itemDate = new Date(item.order_date);

                        if (!lastDateComparison) {
                            return itemDate <= dateComparison ? accumulator + parseInt(item.order_revenue) : accumulator
                        }
                        return itemDate > lastDateComparison && itemDate <= dateComparison ? accumulator + parseInt(item.order_revenue) : accumulator
                    }, 0)

                    return sumPerDate
                })

            ];


            const countRevenue = dataPivot.reduce((accumulator, item) => accumulator + parseFloat(item.order_revenue), 0);


            dataBySourcePercentage.push([label, revenueByWeek])
            dataBySource.push([label, parseInt(countRevenue)]);
        })

        setRevenueBySource({
            ...revenueBySource,
            isLoading: false,
            totalRevenueBySource: dataBySource.sort((a,b) => b[1] - a[1]),
            revenueBySourcePercentage: [datesArray.map(timestamp => `${monthNames[new Date(timestamp).getMonth()]} ${new Date(timestamp).getDate()}`), dataBySourcePercentage.sort((a,b) =>  a[1].reduce((pSum, i) => pSum + i) - b[1].reduce((pSum, i) => pSum + i))]
        })        
    }

    const orderByCountriesRevenue = (countries) => {
        let dataByCountry = [];
        
        const totalRevenue = data.reduce((accumulator, item) => accumulator + parseFloat(item.order_revenue), 0);
        
        countries.map((country) => {
            const dataPivot = data.filter( row => country === row.order_country);
            const countRevenue = dataPivot.reduce((accumulator, item) => accumulator + parseFloat(item.order_revenue), 0);

            dataByCountry.push([country, parseInt((countRevenue/totalRevenue)*100), countRevenue]);
        })

        // for (let i = 0; i < countries.length; i++) {
        //     let countRevenue = 0.0;
        //     const country = countries[i];

        //     for (let j = 0; j < data.length; j++) {
        //         if (checkedItems.includes(j)) continue;

        //         const value = data[j];
        //         if (country === value.order_country) {
        //             countRevenue+= parseFloat(value.order_revenue);
        //             checkedItems.push(j);
        //         }
        //     }
            
        //     dataByCountry.push([country, parseInt(countRevenue)]);
        // }
        

        // dataByCountry = dataByCountry.map( row => [row[0], parseInt((row[1]/totalRevenue)*100), row[1]])

        setRevenueByCountry({
            ...revenueBySource,
            isLoading: false,
            totalRevenueByCountry: dataByCountry,
        })
    }

    const states = {
        isLoading,
        totalRevenue,
        generalTotalOrders,
        newCustomers,
        percentageNewCustomersRevenue,
        variationTotalRevenue,
        variationGeneralTotalOrders,
        variationNewCustomers,
        variationNewCustomersRevenue,
        avgRevenueDay,
        avgOrdersDay,
        avgItemsPerOrder,
        avgOrderValue,
        avgNewCustomersPerDay,
        variationAvgRevenueDay,
        variationAvgOrdersDay,
        variationAvgItemsPerOrder,
        variationAvgOrderValue,
        variationAvgNewCustomersPerDay,
        existingCustomerRevenue,
        newCustomerRevenue,
        totalOrders,
        newCustomerOrders,
        totalRevenueBySource,
        revenueBySourcePercentage,
        totalRevenueByCountry
    }

    return {
        states
    }
}