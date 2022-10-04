import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tooltip: {
        // backgroundColor: theme.myTheme.trecia,
        padding: '.2em 1em',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5px',
        '& p': {
            fontSize: '1rem'
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            '& p': {
                fontSize: '1.35rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            '& p': {
                fontSize: '2rem'
            },
        },
    },
}));

const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
  
    return <span style={{ color }}>{value === 'totalDiscountedPrice' ? 'Apyvarta' : 'Sanaudos'}</span>;
};

const CustomTooltip = ({ active, payload, label }) => {

    const classes = useStyles();

    if (active && payload && payload.length) {
        return (
            <div className={classes.tooltip}>
                <p>Data: <b>{label}</b></p>
                <p>Užsakymai: <b>{payload[0].payload.totalOrders}</b></p>
                <p>Apyvarta: <b>{(payload[0].payload.totalDiscountedPrice).toFixed(2)}€</b></p>
                <p>Sanaudos: <b>{(payload[0].payload.totalSanaudos).toFixed(2)}€</b></p>
                <p>Pelnas: <b>{(payload[0].payload.totalDiscountedPrice - payload[0].payload.totalSanaudos).toFixed(2)}€</b></p>
            </div>
      );
    }
  
    return null;
};

export default class SalesChart extends PureComponent {

  render() {
    const { stats } = this.props;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                // width={500}
                // height={300}
                data={stats}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="date" stroke='#000000' padding={{ left: 30, right: 30 }} interval='preserveStartEnd'/>
                <YAxis stroke="#000000" />
                <Tooltip content={<CustomTooltip />}/>
                <br/>
                <Legend margin={{ top: 0, left: 0, right: 0, bottom: 100 }} iconType='circle' formatter={renderColorfulLegendText} verticalAlign='top'/>
                <Line type="monotone" dataKey="totalDiscountedPrice" stroke="#82ca9d" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="totalSanaudos" stroke="#E63946" />
            </LineChart>
        </ResponsiveContainer>
    );
  }
}
