let endDate = new Date();
endDate = endDate.toISOString();
let lastDate = endDate.split('T')[0].split('-');

export default lastDate
