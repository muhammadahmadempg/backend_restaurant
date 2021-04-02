'use strict';
//const strapi = require('strapi')
/*
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    popular: async (ctx)=>{
        
     const result = await strapi.query('restaurant').find({  isPopular: true });
        return result;
    },

    findOne: async(ctx)=>{
        const restaurant = await strapi.query('restaurant').findOne({ id: ctx.params.id });
        const bookings = await  strapi.services.booking.find();
        //const tables = await strapi.services.table.find()
        return {restaurant, bookings};
    }

};
