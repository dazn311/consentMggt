let endDate = new Date();
endDate = endDate.toISOString();
let lastDate = endDate.split('T')[0].split('-');

// 23/07/2021
export let formatDate = `${lastDate[2]}/${lastDate[1]}/${lastDate[0]}`

export default lastDate
