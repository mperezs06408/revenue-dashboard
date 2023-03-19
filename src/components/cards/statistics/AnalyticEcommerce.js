import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Typography } from '@mui/material';

// assets
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, symbol, percentage, isLoss }) => (
        <>
            <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid item xs={!!percentage ? 6 : 12} textAlign={!!percentage ? 'right': 'center'}>
                    <Typography variant="h5">
                        {symbol && symbol === 'CURRENCY' && '$'
                        }{count}{
                            symbol && symbol === 'PERCENTAGE' && '%'
                        }
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item xs={6} textAlign={'left'}>
                        <Chip
                            variant="combined"
                            color={color}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#00B89E',
                                fontSize: '0.75rem'
                            }}
                            icon={
                                <>
                                    {!isLoss && <CaretUpOutlined style={{ fontSize: '0.5rem', color: 'inherit' }} />}
                                    {isLoss && <CaretDownOutlined style={{ fontSize: '0.5rem', color: 'inherit' }} />}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 0.5, pl: 0.5 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
                <Typography variant="h6" color="textSecondary" style={{fontSize: '0.75rem'}}>
                    {title}
                </Typography>
            </Grid>
        </>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;
