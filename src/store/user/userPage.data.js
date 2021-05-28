const USER_DATA = {
   
  Organisations: 
    [
      {
        org_id: 0,
        org_name: 'АДО ВВ',
        org_address: 'Сретенский бул., д.3',
        org_contacts: '+7 495 666-77-66',
        org_district: 1,
        org_type: 1,
      },{
        org_id: 1,
        org_name: 'КТО ПА',
        org_address: 'Неглинная, д.4',
        org_contacts: '+7 495 888-77-66',
        org_district: 1,
        org_type: 1,
      },
    ],
  currentUser: 
    { 
      user_id: 0,
      user_fio: 'Петров Владимир Михайлович',
      login: '',
      password: '',
      user_status: 1,
      user_active: 1,
      user_role: 2,
      user_reg_date: 152458484848,
      user_end_date: 165454545455,
      user_parent: 0,
      user_child: 2,
      user_perms: 1,
      user_locked: false,
      user_org_id: 0,
      user_fio_lit: 'Петров В.М.',
      user_last_seen: 0,
    },
  curUserShort: // for User Card Page 050521
    { 
      // user_id: 0,
      // user_name: 'Петров Владимир Михайлович',
      // user_shortname: 'Петров Владимир Михайлович',
      // user_org_id: 29,
      // org_name: 'ГБУ Жил Кузьминки',
    },
    curUser:{
      user_id: 0,
      user_name: 'Петров Владимир Михайлович',
    },
    Users:[],
    allUsersOfDB:[], //290421 Users page Tab1
  // Users:  
  //   [{
  //     user_id: 0,
  //     user_fio: 'Васильев Олег Михайлович',
  //     login: '',
  //     password: '',
  //     user_status: 1,
  //     user_active: 1,
  //     user_role: 2,
  //     user_reg_date: 152458484848,
  //     user_end_date: 165454545455,
  //     user_parent: 0,
  //     user_child: 2,
  //     user_perms: 1,
  //     user_locked: false,
  //     user_org_id: 0,
  //     user_fio_lit: 'Васильев В.М.',
  //     user_last_seen: 0,
  //   },],
  countUsers: 
    {
      dataTime: '2021-02-08T20:48:33.296Z',
      data:  {
        online: 100,
        operators: 20,
        users: 80,
      }
    },
      
    statusEnumEventPoint:  {
      new_rec:'создание нового события',
      deny_rec:'отклонение события (оператором)',
      done_rec:'выполнение/завершение события',
      del_rec:'удаление события',
      new_msg:'новое сообщение в событии',
      new_user:'добавление нового пользователя',
      del_user:'удаление пользователя',
      block_user:'локировка пользователя администратором',
      end_user:'завершение действия аккаунта пользователя',
      new_org:'добавление организации',
      del_org:'удаление организации',
      change_org:'изменение в организации (состав пользователей организации, изменение данных по организации',
      block_org:'блокировка организации администратором',
      login:'авторизация в системе была произведена',
      logout:'выход из системы был произведен',
      open_obj:'объект',
      save_obj:'сохранение/пересохранение объекта',
      new_obj:'новый объект добавлен в систему',
      del_obj:'объект был удален из системы',
      change_obj:'изменение описания объекта/характеристик',
      move_obj:'перенос объекта в другую организацию и/или к другому пользователю',
      rel_add_obj:'добавление смежника к объекту',
      bnd_add_obj:'добавление границы к объекту',
      bnd_change_obj:'изменение в границе объекта',
    
    },
    statusEnumEventPointColor:  {
      new_rec:'red',
      deny_rec:'orange',
      done_rec:'green',
      del_rec:'orange',
      new_msg:'orange',
      new_user:'red',
      del_user:'orange',
      block_user:'grey',
      end_user:'orange',
      new_org:'red',
      del_org:'orange',
      change_org:'grey',
      block_org:'orange',
      login:'grey',
      logout:'grey',
      open_obj:'grey',
      save_obj:'grey',
      new_obj:'red',
      del_obj:'orange',
      change_obj:'grey',
      move_obj:'orange',
      rel_add_obj:'red',
      bnd_add_obj:'red',
      bnd_change_obj:'grey',
    
    },
      
    amountUsers: 0, 
    filterTextUserForUsersPage: '', //290421 Users page
    filterTextOrgNameForUsersPage: '', //290421 Users page

  };

  

  export default USER_DATA;