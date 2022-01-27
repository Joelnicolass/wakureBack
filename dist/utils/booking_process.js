"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookingUtils {
    static getWakureIdWithFilterDays(wakuresAvailablesObjects, daysBooking) {
        let wakuresUnavailableIds = [];
        let daysUnavailable;
        for (let i = 0; i < wakuresAvailablesObjects.length; i++) {
            const wakure = wakuresAvailablesObjects[i];
            for (let j = 0; j < daysBooking.length; j++) {
                const day = daysBooking[j];
                daysUnavailable = wakure.availablesDays.includes(day) ? [day] : null;
                if (daysUnavailable === null) {
                    wakuresUnavailableIds.push(wakure.id);
                }
            }
        }
        return wakuresUnavailableIds;
    }
}
exports.default = BookingUtils;
//# sourceMappingURL=booking_process.js.map