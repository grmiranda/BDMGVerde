
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLSjMfsmgoc5tyfLPM567wSQTQh4P9jfo",
    authDomain: "bdmg-7d844.firebaseapp.com",
    databaseURL: "https://bdmg-7d844.firebaseio.com",
    projectId: "bdmg-7d844",
    storageBucket: "bdmg-7d844.appspot.com",
    messagingSenderId: "420226145552"
};
firebase.initializeApp(config);
var db = firebase.database();

function addIntegrador(integrador) {

    // Get a key for a new Post.
    var newPostKey = db.ref().child('integrador').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/integrador/' + newPostKey] = integrador;

    return db.ref().update(updates);
}

function addcliente(cliente) {

    // Get a key for a new Post.
    var newPostKey = db.ref().child('cliente').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/cliente/' + newPostKey] = cliente;
    db.ref().update(updates);

    return newPostKey;
}

function updateCliente(key, cliente) {

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/cliente/' + key] = cliente;
    db.ref().update(updates);

}

function addRelacionamento(relacionamento) {

    // Get a key for a new Post.
    var newPostKey = db.ref().child('relacionamento').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/relacionamento/' + newPostKey] = relacionamento;

    return db.ref().update(updates);
}

function getIntegrador(callback) {
    db.ref('/integrador/').once('value').then(function (snapshot) {
        let aux = [];
        for (atual in snapshot.val()) {
            aux2 = snapshot.val()[atual];
            aux2.key = atual;
            aux.push(aux2);
        }
        callback(aux);
    });
}

function getcliente(callback) {
    db.ref('/cliente/').once('value').then(function (snapshot) {
        let aux = [];
        for (atual in snapshot.val()) {
            aux2 = snapshot.val()[atual];
            aux2.key = atual;
            aux.push(aux2);
        }
        callback(aux);
    });
}

function getclienteKey(key, callback) {
    db.ref('/cliente/' + key).once('value').then(function (snapshot) {
        aux2 = snapshot.val();
        aux2.key = key;
        callback(aux2);
    });
}

function getIntegradorKey(key, callback) {
    db.ref('/integrador/' + key).once('value').then(function (snapshot) {
        aux2 = snapshot.val();
        aux2.key = key;
        callback(aux2);
    });
}

function getClienteByIntegrador(key, callback) {
    db.ref('relacionamento').orderByChild('integrador').equalTo(key).once('value').then(function (snapshot) {
        let aux = [];
        let aux3 = [];
        for (atual in snapshot.val()) {
            aux2 = snapshot.val()[atual];
            aux2.key = atual;
            aux.push(aux2);
        }
        aux.map(relacionamento => {
            db.ref('/cliente/' + relacionamento.cliente).once('value').then(function (snapshot2) {
                aux2 = snapshot2.val();
                aux2.key = relacionamento.cliente;
                relacionamento.cnpj = aux2.cnpj;
                relacionamento.nome = aux2.nome;
                relacionamento.telefone = aux2.telefone;
                relacionamento.mensal = aux2.mensal;
                relacionamento.key = aux2.key;
                aux3.push(relacionamento);
            });
        });
        callback(aux3);
    });
}

function getIntegradorByCliente(key, callback) {

    db.ref('relacionamento').orderByChild('cliente').equalTo(key).once('value').then(function (snapshot) {
        let aux = [];
        let aux3 = [];
        for (atual in snapshot.val()) {
            aux2 = snapshot.val()[atual];
            aux2.key = atual;
            aux.push(aux2);
        }
        aux.map(relacionamento => {
            db.ref('/integrador/' + relacionamento.integrador).once('value').then(function (snapshot2) {
                aux2 = snapshot2.val();
                aux2.key = relacionamento.integrador;
                relacionamento.nome = aux2.nome;
                relacionamento.integradores = aux2;
                aux3.push(aux2);
            });
        });
        callback(aux3);
    });
}