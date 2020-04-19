import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import { connect } from 'react-redux'
import { averageRanking } from '../../actions/doctor/profile'
import Loader from '../layout/Loader'
import { PieChart, Pie, Sector } from 'recharts';


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} users`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
const DoctorDashboard = ({ averageRanking, drprofile: { ranking, loading }, auth: { user } }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        user && averageRanking(user._id)
    }, [user, averageRanking])
    const [rank,setRank]= useState({
        fiveStars:400,
        fourStars:300,
        threeStars:300,
        twoStars:200,
        oneStars:200
    })
    useEffect(()=> {
        ranking && setRank({
            fiveStars: ranking.fiveStars,
            fourStars: ranking.fourStars,
            threeStars: ranking.threeStars,
            twoStars: ranking.twoStars,
            oneStars: ranking.oneStars
        })
    },[ranking])
    const onPieEnter = (data, index) => {
        setActiveIndex(index)

    }
    const data = [
        { name: '5 Star', value: rank.fiveStars },
        { name: '4 Star', value: rank.fourStars },
        { name: '3 Star', value: rank.threeStars },
        { name: '2 Star', value: rank.twoStars },
        { name: '1 Star', value: rank.oneStars },
    ];
    return (
        <Layout>
            {loading && ranking === null ? <Loader /> : <Fragment>
            <h2 style={{paddingLeft:210}}>User Rating</h2>
                            <PieChart width={600} height={600}>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx={275}
                                    cy={250}
                                    innerRadius={50}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart>
            </Fragment>}
        </Layout>
    )
}

DoctorDashboard.propTypes = {
    averageRanking: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    drprofile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    drprofile: state.drprofile
})

export default connect(mapStateToProps, { averageRanking })(DoctorDashboard)
