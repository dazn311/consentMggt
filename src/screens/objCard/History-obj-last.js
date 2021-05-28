import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, answer) {
  return { id, date, name, shipTo, paymentMethod, answer };
}

const rows = [
  createData(0, '06 Янв, 2021', 'Ленинский, д.3', 'УК Калужский', 'создано', 'посмотрели'),
  createData(1, '16 Янв, 2021', 'Профсоюзная, д.8 - тротуар', 'УК Свет', 'создано', 'ответили'),
  createData(2, '12 Янв, 2021', 'Бегавая, д.2 отель', 'ГБУ МУ', 'отклонено', 'нет просмотров'),
  createData(3, '17 Янв, 2021', 'Трубная, д.18', 'ГБУ "АД"', 'удалено', 'ответили'),
  createData(4, '28 Янв, 2021', 'Валисьевский пр.,7', 'ГБУ "АД"', 'согласовано', 'посмотрели'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function HistoryObjLast() {
  const classes = useStyles();

  // console.log(window.innerWidth);
  const winWidth = window.innerWidth;
  return (
    <React.Fragment>
      <Title>История последних изменений по объектам</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            {winWidth > 375 ? <TableCell>Объект, на котором создано событие</TableCell>:
            <TableCell>Объект</TableCell>}
            {winWidth > 375 && <TableCell>Инициировал</TableCell>}
            {winWidth > 375 && <TableCell>Статус</TableCell>}
            {winWidth > 770 && <TableCell align="right">Ответчик</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow style={{cursor:'pointer'}} key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              {winWidth > 375 && <TableCell>{row.shipTo}</TableCell>}
              {winWidth > 375 && <TableCell>{row.paymentMethod}</TableCell>}
              {winWidth > 770 && <TableCell align="right">{row.answer}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Смотреть весь список
        </Link>
      </div>
    </React.Fragment>
  );
}
