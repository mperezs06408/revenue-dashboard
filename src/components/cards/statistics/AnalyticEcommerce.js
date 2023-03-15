import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Typography } from '@mui/material';

// assets
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, symbol, percentage, isLoss }) => (
        <>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        {symbol && symbol === 'CURRENCY' && '$'
                        }{count}{
                            symbol && symbol === 'PERCENTAGE' && '%'
                        }
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#000',
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
            <Typography variant="h6" color="textSecondary" style={{fontSize: '0.75rem'}}>
                {title}
            </Typography>
        </>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;
