import * as moment from 'moment';

class Dates {
    timestampToDate(timestamp: number) {
        return new Date(timestamp * 1000);
    }

    // https://momentjs.com/docs/#/parsing/string-format/
    formatDate(date: Date, format: string) {
        return moment(date).format(format);
    }

    getCurrentDate() {
        return moment().format('dddd Do YYYY, h:mm a');
    }
}

export default new Dates();