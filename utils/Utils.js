module.exports = {
    cleanText:function(text) {
        // clean it and return
    },

    // clear object
    clearProperties: function(data) {
        for (const property in data) {
            if (data.hasOwnProperty(property)) {
                data[property] = '';
            }
        }
        return data;
    },

    getNumberWithCommas: function(x=0) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}