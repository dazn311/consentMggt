const formatDate = (data) => {
    return new Intl.DateTimeFormat('ru-Ru').format(new Date(data || '2021-01-01T07:07:28.296Z'))
}

export const formatDateISO = (data) => {
    //2022-03-03T07:04:28.296Z
    let newDate = data || '2021-01-01T07:07:28.296Z';
    newDate = newDate.split('T');
    const dateArr = newDate[0].split('-');
    const timeArr = newDate[1].slice(0,5);

    return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0] + ' (' + timeArr + ')'
}

export default formatDate();