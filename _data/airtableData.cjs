//require('dotenv').config();
//const Airtable = require('airtable');
//let base = new Airtable({ apiKey: process.env.KEY }).base('appLSzfHPs2dL7XjY/tblRh8fReGbOb8om7/viwBPoPl3Xa6JoOmj');
//
//module.exports = () => {
//  return new Promise((resolve, reject) => {
//    let videos = []; // change 'allDatasets' to something more relevant to your project
 //     base('YouTube') // change 'New' to your base name
  //      .select({ view: 'Data' }) // change 'All' to your view name
   //     .eachPage(
    //      function page(records, fetchNextPage) {
     //       records.forEach((record) => {
      //        allDatasets.push({
       //         "id" : record._rawJson.id,
        //        ...record._rawJson.fields
         //     });
          //  });
           // fetchNextPage();
//          },
//          function done(err) {
 //           if (err) {
  //            reject(err)
   //         } else {
    //          resolve(allDatasets);
     //       }
      //    }
//        );
 //     });
//    };

require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-cache-assets");
const Airtable = require("airtable");

// You configure here…
const airtableBaseId = "{{ appLSzfHPs2dL7XjY/tblRh8fReGbOb8om7/viwBPoPl3Xa6JoOmj }}";
const airtableTable = "{{ MAKC Videos }}";
const airtableTableView = "{{ Data }}";
const assetCacheId = "airtableCMS";

var base = new Airtable({ apiKey: process.env.KEY }).base(
  airtableBaseId
);

module.exports = () => {
  let asset = new AssetCache(assetCacheId);
  
  // Cache the data in 11ty for one day
  if (asset.isCacheValid("1d")) {
    console.log("Serving airtable data from the cache…");
    return asset.getCachedValue();
  }

  // The 11ty cache is cold… so we need to talk to Airtable
  return new Promise((resolve, reject) => {
    let allDatasets = [];

    base(airtableTable)
      .select({
        view: airtableTableView,
        // optional sorting params
        sort: [{ field: "date", direction: "asc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allDatasets.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            // Put the data into the 11ty cache
            asset.save(allDatasets, "json");
            resolve(allDatasets);
          }
        },
      );
  });
};
