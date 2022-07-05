import moment from "moment";

class ConvertDateTimeToMoment {
  public static convertToMoment(
    dateFrom: String,
    dateTo: String,
    timeFrom: String,
    timeTo: String
  ): {
    dateFromMoment: moment.Moment;
    dateToMoment: moment.Moment;
  } {
    // convert dateFrom and timeFrom to datetime moment
    const dateFromMoment = moment(
      dateFrom + " " + timeFrom,
      "YYYY-MM-DD HH:mm"
    );

    // convert dateTo and timeTo to datetime moment
    const dateToMoment = moment(dateTo + " " + timeTo, "YYYY-MM-DD HH:mm");

    return { dateFromMoment, dateToMoment };
  }
}

export default ConvertDateTimeToMoment;
