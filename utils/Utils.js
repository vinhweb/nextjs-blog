module.exports = {
    cleanText:function(text) {
        // clean it and return
    },

    // clear object
    onClearProperties: function(data) {
        for (const property in data) {
            if (data.hasOwnProperty(property)) {
                data[property] = '';
            }
        }
        return data;
    },

    numberWithCommas: function(x=0) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}