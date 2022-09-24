export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const WEEKS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
];
export const getChartData = (weekData) => {
    const categories = [];
    const values = [];
    if (weekData.length === 7) {
        weekData.forEach((week) => {
            categories.unshift(week.DAY);
            values.unshift(Number(week.CALORIES.toFixed(2)));
        });
    } else {
        const idx =
            weekData.length === 0
                ? 0
                : WEEKS.findIndex(
                      (week) => week === weekData[weekData.length - 1].DAY
                  );
        let count = 0;
        for (let i = idx; ; ) {
            if (count === 7) {
                break;
            }
            const foundWeek = weekData.find((wd) => wd.DAY === WEEKS[i]);
            if (!foundWeek) {
                categories.unshift(WEEKS[i]);
                values.unshift(0);
            } else {
                categories.unshift(WEEKS[i]);
                values.unshift(Number(foundWeek.CALORIES.toFixed(2)));
            }
            i = i - 1;
            if (i < 0) {
                i = 6;
            }
            count += 1;
        }
    }

    return [categories, values];
};
