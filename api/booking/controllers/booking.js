'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    check: async (ctx)=>{
        const {query: {table_booked, booking_date, start_time}} = ctx;

        const isBooked = await strapi.services.booking.findOne({table_booked, booking_date, start_time});
        
        if(isBooked){

            return {booked: true, msg: 'Sorry Some Already Booked Table.'};
        }

        return {booked: false}
    }
};
