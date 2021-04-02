'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const obj ={

    find: async (ctx)=>{
        const {date, rest_id} = ctx.query;
        let slots = [];
        const restaurant = await  strapi.services.restaurant.findOne({id:rest_id});
        //console.log(parseInt(restaurant.closeTime));
        for(let i = parseInt(restaurant.openTime) ; i <= parseInt(restaurant.closeTime); i++){
            slots.push(i);
        }
        const tables = await strapi.query('table').find({restaurant: rest_id});
        
        let customTables = [];
        for (let table of tables){
            let slots1 = [...slots]
            const bookings = await strapi.services.booking.find({table_booked: table.id, booking_date: date})         
            for(let booking of bookings){
            
            if(booking){

                     slots1 = slots1.filter(time =>time !== parseInt(booking.start_time))
                }
                for(let i = parseInt(restaurant.openTime) ; i <= parseInt(restaurant.closeTime); i++){
                    slots.push(i);
                }
            }
 

            customTables.push({...table, slots: slots1});

        }
        return customTables;
    },


    available: async (ctx)=>{
        let {query: {date, time, rest_id}} = ctx;
        time = time<10 ? `0${time}:00:00.000` : `${time}:00:00.000`;
        console.log(time)
        const bookings = await strapi.services.booking.find({booking_date: date, start_time: time});
        const tables = await obj.find(ctx);
        const custom_tables = [];

        for (let table of tables){

            const found = bookings.find(booking=> booking.table_booked.id===table.id)
            if(!found){
                custom_tables.push(table);
            }

        }

        
        return custom_tables;
    }







};
module.exports = obj
