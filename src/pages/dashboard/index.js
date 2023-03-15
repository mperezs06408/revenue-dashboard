// material-ui
import {
    Grid,
    Typography
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
    revenueBySourceOptions 
} from 'assets/dashboardConfig';

//Hooks
import { useDashboardData } from 'hooks/useDashboardData';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const {
        states
    } = useDashboardData();

    const {
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


    return (
        <Grid container rowSpacing={4.5} columnSpacing={1}>
            <Grid item xs={12} sx={{ mb: 2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            {/* row 1 */}
            <Grid container xs={12} md={12} lg={12} justifyContent={'space-around'}>
                <MainCard>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticEcommerce title="Total Revenue" count={totalRevenue} symbol='CURRENCY' percentage={31} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticEcommerce title="Total Orders" count={generalTotalOrders} percentage={28} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticEcommerce title="New Customers" count={newCustomers} percentage={27} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticEcommerce title="% New Customers Revenue" count={percentageNewCustomersRevenue} symbol='PERCENTAGE' percentage={3} />
                        </Grid>
                    </Grid>
                </MainCard>
                <MainCard>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs={12} sm={6} md={6} lg={12/5}>
                            <AnalyticEcommerce title="Avg Revenue/Day" count={avgRevenueDay} symbol='CURRENCY' percentage={31} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={12/5}>
                            <AnalyticEcommerce title="Avg Orders/Day" count={avgOrdersDay} percentage={28} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={12/5}>
                            <AnalyticEcommerce title="Avg Items/Order" count={avgItemsPerOrder} percentage={8} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={12/5}>
                            <AnalyticEcommerce title="Avg Order Value" count={avgOrderValue} symbol='CURRENCY' percentage={3} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={12/5}>
                            <AnalyticEcommerce title="Avg New Customers/Day" count={avgNewCustomersPerDay} percentage={27} />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={12} lg={12}>
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={revenueByDate}
                />
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={6} lg={6}>
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={revenueBySourcePercentageGeneral}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={revenueBySource}
                />
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
