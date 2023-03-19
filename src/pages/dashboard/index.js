// material-ui
import {
    Grid,
    Typography,
    CircularProgress
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

//HighCharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//HighiCharts Config Modules
import { 
    revenueByDateOptions,
    revenueBySourcePercentageOptions,
    revenueBySourceOptions,
    revenueByCountryOptions
} from 'assets/dashboardConfig';

//Hooks
import { useDashboardData } from 'hooks/useDashboardData';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const {
        states
    } = useDashboardData();

    const {
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
    } = states;

    const revenueByDate = revenueByDateOptions({
        existingCustomerRevenue,
        newCustomerRevenue,
        totalOrders,
        newCustomerOrders
    });

    const revenueBySourcePercentageGeneral = revenueBySourcePercentageOptions({
        revenueBySourcePercentage
    })

    const revenueBySource = revenueBySourceOptions({
        totalRevenueBySource
    })

    const revenueByCountry = revenueByCountryOptions({
        totalRevenueByCountry
    })


    return (
        <section>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 2.25 }}>
                    <Typography variant="h5">Dashboard</Typography>
                </Grid>
            </Grid>
            {
                isLoading ?
                <Grid item xs={12} sx={{margin: 'auto'}}>
                    <MainCard>
                        <Grid container justifyContent={"center"}>
                            <CircularProgress />
                        </Grid>
                    </MainCard>
                </Grid>
                :
                <>
                    <Grid container rowSpacing={1} columnSpacing={1} sx={{mb: 1}} alignItems="stretch">
                        <Grid item xs={12} sm={6} md={6}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:4}}>General Metrics</Typography>
                                <Grid container justifyContent={'space-between'}>
                                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                                        "@media screen and (min-width: 600px)": {
                                            justifyContent: 'center'
                                        }
                                    }}>
                                        <AnalyticEcommerce title="Total Revenue" count={totalRevenue} symbol='CURRENCY' isLoss={variationTotalRevenue < 0} percentage={variationTotalRevenue} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <AnalyticEcommerce title="Total Orders" count={generalTotalOrders} isLoss={variationGeneralTotalOrders < 0} percentage={variationGeneralTotalOrders}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <AnalyticEcommerce title="New Customers" count={newCustomers} isLoss={variationNewCustomers < 0} percentage={variationNewCustomers} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <AnalyticEcommerce title="% New Customers Revenue" count={percentageNewCustomersRevenue} symbol='PERCENTAGE' isLoss={variationNewCustomersRevenue < 0} percentage={variationNewCustomersRevenue} />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:4}}>Average Performance</Typography>
                                <Grid container justifyContent={'space-between'}>
                                    <Grid item xs={12} sm={6} md={6} lg={12/5}>
                                        <AnalyticEcommerce title="Avg Revenue/Day" count={avgRevenueDay} symbol='CURRENCY' isLoss={variationAvgRevenueDay < 0} percentage={variationAvgRevenueDay} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={12/5}>
                                        <AnalyticEcommerce title="Avg Orders/Day" count={avgOrdersDay} isLoss={variationAvgOrdersDay < 0} percentage={variationAvgOrdersDay}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={12/5}>
                                        <AnalyticEcommerce title="Avg Items/Order" count={avgItemsPerOrder} isLoss={variationAvgItemsPerOrder < 0} percentage={variationAvgItemsPerOrder}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={12/5}>
                                        <AnalyticEcommerce title="Avg Order Value" count={avgOrderValue} symbol='CURRENCY' isLoss={variationAvgOrderValue < 0} percentage={variationAvgOrderValue}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={12/5}>
                                        <AnalyticEcommerce title="Avg New Customers/Day" count={avgNewCustomersPerDay} isLoss={variationAvgNewCustomersPerDay < 0} percentage={variationAvgNewCustomersPerDay} />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={1} sx={{mb: 1}}>
                        <Grid item xs={12} justifyContent={'center'}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:1}}>Revenue by Date</Typography>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={revenueByDate}
                                />
                            </MainCard>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={1} sx={{mb: 1}}>
                        <Grid item xs={12} sm={6}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:1}}>Revenue by Source</Typography>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={revenueBySourcePercentageGeneral}
                                />
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:1}}>Revenue by Source</Typography>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={revenueBySource}
                                />
                            </MainCard>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={12}>
                            <MainCard>
                                <Typography variant="h4" sx={{mb:1}}>Revenue by Country</Typography>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={revenueByCountry}
                                />
                            </MainCard>
                        </Grid>
                    </Grid>
                </>
            }
        </section>
    );
};

export default DashboardDefault;
