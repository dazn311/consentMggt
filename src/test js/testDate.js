
  console.log(new Date(2013, 2, 13, 10, 10));
  console.log(new Date(Date.UTC(2013, 2, 13, 10, 10)));
  console.log(Date(2013, 2, 13, 10, 10));
  console.log(Date(Date.UTC(2013, 2, 13, 10, 10)));
  // 2013-03-13T06:10:00.000Z
  // 2013-03-13T10:10:00.000Z
  // Fri Feb 12 2021 23:43:51 GMT+0300 (Moscow Standard Time)
  // Fri Feb 12 2021 23:43:51 GMT+0300 (Moscow Standard Time)
  console.log(new Date('2013-03-13T06:10:00.000Z'));
  console.log(Date('2013-03-13T06:10:00.000+03:00'));
  console.log(new Date('2013-03-13T06:10:00.000Z'));
  console.log(Date('2013-03-13T06:10:00.000+03:00'));

  console.log(Date('2013-03-13T06:10:00.000Z'));
  console.log(Date('2013-03-13T06:10:00.000-03:00'));
  // Fri Feb 12 2021 23:53:08 GMT+0300 (Moscow Standard Time)
  // Fri Feb 12 2021 23:53:08 GMT+0300 (Moscow Standard Time)

  console.log(new Date('2013-03-13T06:10:00.000Z'));
  console.log(new Date('2013-03-13T06:10:00.000-03:00'));
  console.log(new Date('2013-03-13T06:10:00.000+03:00'));
  // 2013-03-13T06:10:00.000Z
  // 2013-03-13T09:10:00.000Z
  // 2013-03-13T03:10:00.000Z

  console.log(new Date(Date.UTC(2013, 1, 13, 10, 10)));
  console.log(new Date(Date.UTC(2013, 1, 13)));
  // 2013-02-13T10:10:00.000Z
  // 2013-02-13T00:00:00.000Z

  console.log(new Date().getDate());
  console.log(new Date().getMonth());
  console.log(new Date().getFullYear());
  // 13
  // 1
  // 2021

  // начало сегодняшнего дня!
  console.log(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())));
  //2021-02-13T00:00:00.000Z


  console.log(new Date().toLocaleDateString('Ru'));
  //13.02.2021
  console.log(new Date().toLocaleString('Ru'));
  //13.02.2021, 03:08:49  
  
  console.log(new Date('2021-02-13T00:00:00.000Z').toLocaleString('Ru'));
  //13.02.2021, 03:00:00