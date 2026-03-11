let myPromise = new Promise(function(resolve, reject) {

    setTimeout(function() {
        resolve("Data fetched successfully");
    }, 2000);

});

myPromise
.then(function(message) {
    console.log(message);
})
.catch(function(error) {
    console.log(error);
});