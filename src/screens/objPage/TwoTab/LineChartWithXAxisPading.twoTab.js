import React, {PureComponent} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


class LineChartWithXAxisPading extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/g03265a4/';
    constructor(props) {
        super(props);
        this.state = {widthWin: window.innerWidth < 500 ? (window.innerWidth - 20) : (window.innerWidth - 150)};
    }

    render() {
        const {graphicValue} = this.props;
        const { widthWin } = this.state;
        // console.log('rerender LineChartWithXAxisPading');

        return (
            <div id='graphics' style={{position: 'relative', overflow: 'hidden'}}>
                <BarChart
                    width={widthWin}
                    height={300}
                    data={graphicValue}
                    margin={{
                        top: 20,
                        right: 30,
                        left: window.innerWidth < 500 ? -20 : 20,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey='Users' name='Пользователей' stackId="a" fill="#8884d8"/>
                    <Bar dataKey="Events" name='Созданные события' stackId="a" fill="#82ca9d"/>
                    <Bar dataKey="Closed" name='Выполнено соб-ий' stackId="a" fill="#FFc000"/>
                    <Bar dataKey="deny" name='Отклоненые соб-я' stackId="a" fill="rgb(198 76 164)"/>
                    <Bar dataKey="activeChat" name='Активность чата' stackId="a" fill="#FF0C00"/>
                </BarChart>


            </div>
        );
    }
}

export default LineChartWithXAxisPading;
 