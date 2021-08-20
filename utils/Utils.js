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
    }
}