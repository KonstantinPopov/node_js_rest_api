
module.exports = function(app, db) {

    app.get('/notes', (req, res) => {
        res.send('Got a GET request');
    });

    app.post('/notes', (req, res) => {
        res.send('Got a POST request create new Note');
    });

    app.put('/notes', (req, res) => {
        res.send('Got a PUT request edit note');
    });

    app.delete('/notes', (req, res) => {
        res.send('delete note');
    });
};
