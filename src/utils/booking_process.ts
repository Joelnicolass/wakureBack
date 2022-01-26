import { DaysName } from "../helpers/days_enum";
import { IWakure } from "../interfaces/wakure_interface";

class BookingUtils {
  public static getWakureIdWithFilterDays(
    wakuresAvailablesObjects: IWakure[],
    daysBooking: DaysName[]
  ) {
    let wakuresUnavailableIds: string[] = [];
    let daysUnavailable: Array<number> | null;

    for (let i = 0; i < wakuresAvailablesObjects.length; i++) {
      const wakure = wakuresAvailablesObjects[i];

      for (let j = 0; j < daysBooking.length; j++) {
        const day = daysBooking[j];

        daysUnavailable = wakure.availablesDays.includes(day) ? [day] : null;

        if (daysUnavailable === null) {
          console.log("falta");
          wakuresUnavailableIds.push(wakure.id);
        }
      }
    }
    return wakuresUnavailableIds;
  }
}

export default BookingUtils;
